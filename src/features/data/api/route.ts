import "server-only";
import { getAllUsers, getUserData } from "@/features/api/actions";
// import { sessionMiddleware } from "@/features/auth/api/route";
import { Hono } from "hono";
import { sessionMiddleware } from "@/features/auth/api/session-middleware";
import { CreatedUser } from "@/models/user-model";
import { connectToDatabase } from "@/lib/mongoose-client";
import { PipelineStage } from "mongoose";
import { ObjectId } from "mongodb";
const app = new Hono()
  .get("/get-all", sessionMiddleware, async (c) => {
    const alldata = (await getAllUsers()).data;
    return c.json(alldata);
  })
  .get("/get-recommendations", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    let parsed_limit = parseInt(c.req.query("limit") ?? "");
    parsed_limit = isNaN(parsed_limit) ? 10 : parsed_limit;
    const query_string = c.req.query("q") ?? "";
    const mutuals_only = (c.req.query("mutuals_only") ?? "") === "true";
    const search_only = (c.req.query("search_only") ?? "") === "true";
    await connectToDatabase();

    // const recommendations = await CreatedUser.aggregate([
    //   // Step 1: Match the current user to get their friends
    //   { $match: { _id: user_id } },
    //   // Step 2: Lookup users who are friends with the current user's friends
    //   {
    //     $lookup: {
    //       from: "createdUser", // The collection where users are stored
    //       localField: "friends", // The current user's friends
    //       foreignField: "_id", // Match friends by their IDs
    //       as: "friendsOfFriends",
    //     },
    //   },

    //   // Step 3: Unwind friendsOfFriends to process each friend of friend individually
    //   { $unwind: "$friendsOfFriends" },

    //   // Step 4: Collect the friends of the friends
    //   {
    //     $group: {
    //       _id: "$_id",
    //       friends: { $first: "$friends" }, // Retain the current user's friends
    //       friendsOfFriends: { $addToSet: "$friendsOfFriends.friends" }, // Collect friends of friends
    //     },
    //   },

    //   // Step 5: Flatten the friendsOfFriends array
    //   { $unwind: "$friendsOfFriends" },

    //   // Step 6: Exclude current user's friends and the user themselves
    //   {
    //     $match: {
    //       $expr: {
    //         $and: [
    //           {
    //             $ne: ["$friendsOfFriends", user_id],
    //           }, // Exclude current user
    //           { $not: { $in: ["$friendsOfFriends", "$friends"] } }, // Exclude current user's friends
    //         ],
    //       },
    //     },
    //   },

    //   // Step 7: Lookup the details of the recommended users
    //   {
    //     $lookup: {
    //       from: "users", // The user collection
    //       localField: "friendsOfFriends", // IDs of friends of friends
    //       foreignField: "_id", // Match by ID
    //       as: "recommendedUser",
    //     },
    //   },

    //   // Step 8: Flatten the recommendedUser array
    //   { $unwind: "$recommendedUser" },

    //   // Step 9: Project relevant fields of the recommended users
    //   {
    //     $project: {
    //       _id: "$recommendedUser._id",
    //       name: "$recommendedUser.name",
    //       email: "$recommendedUser.email",
    //       image: "$recommendedUser.image",
    //     },
    //   },
    // ]);
    console.log("query",c.req.query());

    const user_data = (await getUserData(user_id)).data;
    if (!user_data || (search_only && query_string.length === 0)) {
      return c.json([]);
    }

    const user_friends = user_data.friends;

    const friendsOfFriends = await CreatedUser.find({
      _id: { $in: user_friends }, // Only look at the current user's friends
    })
      .select("friends")
      .then((friends: { friends: ObjectId[] }[]) => {
        // Collect all friends of friends
        return friends.reduce((acc: ObjectId[], friend) => {
          acc.push(...friend.friends);
          return acc;
        }, []);
      });

    const recommendation_pipeline: PipelineStage[] = [
      {
        $match: {
          _id: {
            $in: friendsOfFriends, // Must be in friends-of-friends list
            $nin: [...user_friends, ObjectId.createFromHexString(user_id)], // Exclude current friends and the user themselves
          },
        },
      },
      {
        $limit: parsed_limit,
      },
      {
        $project: {
          name: 1,
          email: 1,
          image: 1,
        },
      },
    ];

    const search_query = [
      {
        $search: {
          index: "fuzzy-search-index",
          text: {
            query: query_string,
            path: ["name", "email"],
            fuzzy: {},
          },
        },
      },
    ];

    const recommendation_with_search_pipeline: PipelineStage[] =
      query_string.length
        ? [...search_query, ...recommendation_pipeline]
        : recommendation_pipeline;

    const recommendations = (await CreatedUser.aggregate(
      recommendation_with_search_pipeline
    )) as {
      _id: string;
      name: string;
      email: string;
      image?: string;
    }[];

    const mutual_length = recommendations.length;

    const remaining_length = parsed_limit - mutual_length;

    if (remaining_length > 0 && !mutuals_only) {
      const recommended_ids = recommendations.map((item) => item._id);

      console.log(recommended_ids);

      const remaining_pipeline: PipelineStage[] = [
        {
          $match: {
            _id: {
              $nin: [
                ...recommended_ids,
                ...user_friends,
                ObjectId.createFromHexString(user_id),
              ],
            },
          },
        },
        {
          $limit: remaining_length,
        },
        {
          $project: {
            name: 1,
            email: 1,
            image: 1,
          },
        },
      ];

      const remaining_search_pipeline: PipelineStage[] = query_string.length
        ? [...search_query, ...remaining_pipeline]
        : remaining_pipeline;

      const remaining = (await CreatedUser.aggregate(
        remaining_search_pipeline
      )) as {
        _id: string;
        name: string;
        email: string;
        image?: string;
      }[];

      recommendations.push(...remaining);
    }

    return c.json(recommendations);
  });

export default app;

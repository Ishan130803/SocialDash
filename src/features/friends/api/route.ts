import {
  acceptFriendRequest,
  bulkGetDataWithProjection,
  cancelFriendRequest,
  getUserDataWithProjections,
  send_friend_request,
  unfriend,
} from "@/features/api/actions";
import { sessionMiddleware } from "@/features/auth/api/session-middleware";
import { Hono } from "hono";

const app = new Hono()
  .post("/accept-friend-request", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.query("friend_id");
    if (!friend_id) {
      return c.text("friend_id parameter not defined", 404);
    }

    const result = await acceptFriendRequest(user_id, friend_id);
    if (result.status !== 200) {
      return c.text(result.message, 500);
    }
    return c.text(result.message, 200);
  })
  .post("/send-friend-request", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.query("friend_id");
    if (!friend_id) {
      return c.text("friend_id parameter not defined", 404);
    }

    const result = await send_friend_request(user_id, friend_id);

    if (result.status !== 200) {
      return c.text(result.message, 500);
    }
    return c.text(result.message, 200);
  })
  .post("/cancel-friend-request", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.query("friend_id");
    if (!friend_id) {
      return c.text("friend_id parameter not defined", 404);
    }

    try {
      await cancelFriendRequest(user_id, friend_id);
    } catch (error) {
      return c.text((error as any).message, 500);
    }
    return c.text("Successfully Cancelled friend Request", 200);
  })
  .post("/un-friend-request", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_id = c.req.query("friend_id");
    if (!friend_id) {
      return c.text("friend_id parameter not defined", 404);
    }

    try {
      await unfriend(user_id, friend_id);
    } catch (error) {
      return c.text((error as any).message, 500);
    }
    return c.text("Unfriended Successfully", 200);
  })
  .get("/get-friends", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const friend_ids = (await getUserDataWithProjections(user_id, {
      friends: 1,
    })) as { _id: string; friends: string[] };
    const friends_data = (await bulkGetDataWithProjection(friend_ids.friends, {
      _id: 1,
      name: 1,
      email: 1,
      image: 1,
    })) as {
      _id: string;
      name: string;
      email: string;
      image: string;
    }[];
    return c.json(friends_data);
  })
  .get("/get-pending", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const pending_request_ids = (await getUserDataWithProjections(user_id, {
      pending_requests: 1,
    })) as { _id: string; pending_requests: string[] };
    const pending_requests_data = (await bulkGetDataWithProjection(
      pending_request_ids.pending_requests,
      {
        _id: 1,
        name: 1,
        email: 1,
        image: 1,
      }
    )) as {
      _id: string;
      name: string;
      email: string;
      image: string;
    }[];
    return c.json(pending_requests_data);
  })
  .get("/get-sent", sessionMiddleware, async (c) => {
    const user_id = c.get("user_id");
    const sent_request_ids = (await getUserDataWithProjections(user_id, {
      sent_requests: 1,
    })) as { _id: string; sent_requests: string[] };
    const sent_requests_data = (await bulkGetDataWithProjection(
      sent_request_ids.sent_requests,
      {
        _id: 1,
        name: 1,
        email: 1,
        image: 1,
      }
    )) as {
      _id: string;
      name: string;
      email: string;
      image: string;
    }[];
    return c.json(sent_requests_data);
  });

export default app;

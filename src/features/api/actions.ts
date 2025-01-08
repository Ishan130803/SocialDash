import { connectToDatabase } from "@/lib/mongoose-client";
import { CreatedUser } from "@/models/user-model";
import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

export async function acceptFriendRequest(userId: string, friendId: string) {
  try {
    const mongoose = await connectToDatabase();
    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const tr1 = await CreatedUser.findByIdAndUpdate(
        userId, // The user's ID
        { $pull: { pending_requests: friendId } } // Remove friendId from friends array
      ).session(session);
      const tr2 = await CreatedUser.findByIdAndUpdate(
        friendId, // The user's ID
        { $pull: { sent_requests: userId } } // Remove friendId from friends array
      ).session(session);
      const tr5 = await CreatedUser.findByIdAndUpdate(
        userId, // The user's ID
        { $pull: { sent_requests: friendId } } // Remove friendId from friends array
      ).session(session);
      const tr6 = await CreatedUser.findByIdAndUpdate(
        friendId, // The user's ID
        { $pull: { pending_requests: userId } } // Remove friendId from friends array,
      ).session(session);
      const tr3 = await CreatedUser.findByIdAndUpdate(userId, {
        $addToSet: { friends: friendId },
      }).session(session);
      const tr4 = await CreatedUser.findByIdAndUpdate(friendId, {
        $addToSet: { friends: userId },
      }).session(session);
      await tr1.save();
      await tr2.save();
      await tr3.save();
      await tr4.save();
      await tr5.save();
      await tr6.save();
      await session.commitTransaction();

      return {
        message: "Friend Request accepted transaction completed",
        status: 200,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  } catch (error) {
    return {
      message: `Error adding friend: ${(error as Error).message}`,
      status: 500,
    };
  }
}

export async function send_friend_request(userId: string, friendId: string) {
  try {
    const mongoose = await connectToDatabase();

    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const tr1 = await CreatedUser.findByIdAndUpdate(userId, {
        $addToSet: { sent_requests: friendId },
      }).session(session);
      const tr2 = await CreatedUser.findByIdAndUpdate(friendId, {
        $addToSet: { pending_requests: userId },
      }).session(session);
      await tr1.save();
      await tr2.save();
      await session.commitTransaction();

      return {
        message: "Friend Request sent transaction completed",
        status: 200,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  } catch (error) {
    return {
      message: `Error adding friend to pending: ${(error as Error).message}`,
      status: 500,
    };
  }
}

export async function unfriend(userId: string, friendId: string) {
  try {
    const mongoose = await connectToDatabase();

    const session = await mongoose.startSession();
    try {
      session.startTransaction();

      const tr1 = await CreatedUser.findByIdAndUpdate(
        userId, // The user's ID
        { $pull: { friends: friendId } } // Remove friendId from friends array
      ).session(session);
      const tr2 = await CreatedUser.findByIdAndUpdate(
        friendId, // The user's ID
        { $pull: { friends: userId } } // Remove friendId from friends array
      ).session(session);
      await tr1.save();
      await tr2.save();
      await session.commitTransaction();

      return {
        message: "Unfriend Request sent transaction completed",
        status: 200,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    }
  } catch (error) {
    return {
      message: `Error while unfriending : ${(error as Error).message}`,
      status: 500,
    };
  }
}

export async function getUserData(userId: string) {
  try {
    await connectToDatabase();

    const data = (await CreatedUser.findById(userId)) as createdUser;
    return {
      message: "Found User",
      data: {
        name: data.name,
        _id: data._id,
        email: data.email,
        pending_requests: data.pending_requests,
        sent_requests: data.sent_requests,
        friends: data.friends,
        image: data.image,
      },
      status: 201,
    };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}

type bulkGetBasicUserDataRetType = {
  _id: string;
  name: string;
  email: string;
  image: string;
};

export async function bulkGetBasicUserData(userIds: string[]) {
  try {
    await connectToDatabase();

    const data = (await CreatedUser.find(
      { _id: { $in: userIds } },
      { _id: 1, name: 1, email: 1, image: 1 }
    )) as bulkGetBasicUserDataRetType[];
    return { message: "Found users", data: data, status: 201 };
  } catch (error) {
    return { message: (error as Error).message, data: [], status: 500 };
  }
}

export const insertUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  try {
    await connectToDatabase();
    (await CreatedUser.create(userData)) as createdUser;
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if ((error as any).code === 11000) {
      // Duplicate key error code
      console.error("Email already exists:", userData.email);
      throw new Error("Email already exists.");
    }
    console.error("Error inserting user:", (error as Error).message);
    throw new Error("Failed to Register");
  }
};

export async function verifyUserDataFromCredentials({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await connectToDatabase();
    const user = (await CreatedUser.findOne({
      email,
      password,
    })) as createdUser;
    if (!user) {
      return null;
    }
    const isPassValid = password === user.password;
    if (!isPassValid) {
      return null;
    }
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllUsers() {
  try {
    await connectToDatabase();

    const data = await CreatedUser.find(
      {},
      { _id: 1, name: 1, email: 1, image: 1 }
    );
    return { message: "Found users", data: data, status: 201 };
  } catch (error) {
    return { message: (error as Error).message, status: 500 };
  }
}

export async function cancelFriendRequest(user_id: string, friend_id: string) {
  await connectToDatabase();
  const result = await CreatedUser.bulkWrite([
    {
      updateOne: {
        filter: {
          _id: user_id,
        },
        update: {
          $pull: { sent_requests: friend_id },
        },
      },
    },
    {
      updateOne: {
        filter: {
          _id: friend_id,
        },
        update: {
          $pull: { pending_requests: user_id },
        },
      },
    },
  ]);

  return result;
}

export async function getFriendIds(user_id: string) {
  const user_id_object =
    typeof user_id === "string"
      ? mongoose.Types.ObjectId.createFromHexString(user_id)
      : user_id;
  const result = await CreatedUser.findOne(
    {
      _id: user_id_object,
    },
    {
      friends: 1,
    }
  );

  return result.friends;
}

export async function bulkGetDataWithProjection(
  user_ids: string[],
  projection: Record<string, number>
) {
  const sanitized_user_ids = user_ids.map((item) => {
    if (typeof item === "string") {
      return ObjectId.createFromHexString(item);
    } else {
      return item;
    }
  });
  const data = await CreatedUser.find(
    { _id: { $in: sanitized_user_ids } },
    projection
  );
  return data;
}

export async function getUserDataWithProjections(
  user_id: string,
  projection: Record<string, number> = {}
) {
  const user_id_object = ObjectId.createFromHexString(user_id);
  const user_data = await CreatedUser.findById(user_id_object, projection);
  return user_data;
}

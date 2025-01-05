import { CreatedUser } from "@/models/user-model";
import mongoose from "mongoose";

export async function addFriend(userId: string, friendId: string) {
  try {
    mongoose.connect(process.env.MONGODB_DATABASE_URI!);

    // Update the user's friends list
    const result = await CreatedUser.findByIdAndUpdate(userId, {
      $addToSet: { friends: friendId },
    });

    if (result) {
      return { message: "Friend added successfully:", status: 200 };
    } else {
      return { message: "User not found.", status: 404 };
    }
  } catch (error: any) {
    return { message: `Error adding friend: ${error.message}`, status: 500 };
  }
}

export async function addToPending(userId: string, friendId: string) {
  try {
    mongoose.connect(process.env.MONGODB_DATABASE_URI!);

    // Update the user's friends list
    const result = await CreatedUser.findByIdAndUpdate(userId, {
      $addToSet: { pending_requests: friendId },
    });

    if (result) {
      return { message: "Friend added successfully:", status: 200 };
    } else {
      return { message: "User not found.", status: 404 };
    }
  } catch (error: any) {
    return {
      message: `Error adding friend to pending: ${error.message}`,
      status: 500,
    };
  }
}

export async function addToSent(userId: string, friendId: string) {
  try {
    mongoose.connect(process.env.MONGODB_DATABASE_URI!);

    // Update the user's friends list
    const result = await CreatedUser.findByIdAndUpdate(userId, {
      $addToSet: { sent_requests: friendId },
    });

    if (result) {
      return { message: "Friend added successfully:", status: 200 };
    } else {
      return { message: "User not found.", status: 404 };
    }
  } catch (error: any) {
    return {
      message: `Error sending request to  friend: ${error.message}`,
      status: 500,
    };
  }
}

export async function unfriend(userId1: string, userId2: string) {
  try {
    mongoose.connect(process.env.MONGODB_DATABASE_URI!);

    // Update the user's friends list
    await CreatedUser.findByIdAndUpdate(
      userId1, // The user's ID
      { $pull: { friends: userId2 } } // Remove friendId from friends array
    );
    await CreatedUser.findByIdAndUpdate(
      userId2, // The user's ID
      { $pull: { friends: userId1 } } // Remove friendId from friends array
    );

    return { message: "Unfriended", status: 301 };
  } catch (error: any) {
    return {
      message: `Error while unfriending : ${error.message}`,
      status: 500,
    };
  }
}

export async function getUserData(userId: string) {
  try {
    mongoose.connect(process.env.MONGODB_DATABASE_URI!);
    const data = (await CreatedUser.findById(userId)) as createdUser;
    console.log(data);
    return { message: "Found User", data: data, status: 201 };
  } catch (error: any) {
    return { message: error.message, status: 500 };
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
    mongoose.connect(process.env.MONGODB_DATABASE_URI!);
    const data = (await CreatedUser.find(
      { _id: { $in: userIds } },
      { _id: 1, name: 1, email: 1, image: 1 }
    )) as bulkGetBasicUserDataRetType[];
    return { message: "Found users", data: data, status: 201 };
  } catch (error: any) {
    return { message: error.message, status: 500 };
  }
}

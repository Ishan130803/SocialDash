import mongoose from "mongoose";

const createdUserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    },
    password: {
      type: String,
      required: false,
      trim: true,
    },
    friends: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    pending_requests: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    sent_requests: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
    collection: "createdUsers",
  }
);

createdUserSchema.searchIndex({
  name: "fuzzy-search-index",
  definition: {
    mappings: {
      dynamic: false,
      fields: {
        name: {
          type: "string",
        },
        email: {
          type: "string",
        },
      },
    },
  },
});

// Create the model
export const CreatedUser =
  mongoose.models?.CreatedUser ||
  mongoose.model("CreatedUser", createdUserSchema);


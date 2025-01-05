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
      type: [String],
      default: [],
    },
    pending_requests: {
      type: [String],
      default: [],
    },
    sent_requests: {
      type: [String],
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

// Create the model
export const CreatedUser = mongoose.models?.CreatedUser || mongoose.model('CreatedUser', createdUserSchema);

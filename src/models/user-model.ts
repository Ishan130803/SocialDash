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
    image: {
      type: String,
      required: true,
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
  },
  {
    timestamps: true,
    collection: "createdUsers",
  }
);

// Create the model
export const CreatedUser = mongoose.models.CreatedUser || mongoose.model('CreatedUser', createdUserSchema);

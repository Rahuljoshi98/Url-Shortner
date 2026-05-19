import mongoose from "mongoose";
import User from "./user.js";

const urlSchema = new mongoose.Schema(
  {
    originalUrl: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    clicks: {
      type: Number,
      default: 0,
    },
    expiresAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Url = mongoose.model("Url", urlSchema);

export default Url;

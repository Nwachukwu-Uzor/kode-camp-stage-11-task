import mongoose from "mongoose";

const { Schema, model } = mongoose;

const refreshTokenSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  CreatedAt: {
    type: Date,
    default: Date.now,
    expires: 86400,
  },
});

export default model("refreshTokens", refreshTokenSchema);

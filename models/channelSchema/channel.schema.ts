import { Schema, model } from "mongoose";

const channelSchema = new Schema<any>({
  channelId: {
    type: String,
    required: [true, "Channel Id is required"],
    trim: true,
  },

  isActiveChannel: {
    type: Boolean,
    default: true,
  },

  maxMembers: {
    type: Number,
    
  }
});

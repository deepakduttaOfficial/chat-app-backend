import { Schema, model } from "mongoose";
import { ChannelDocument, ChannelInterface } from "./type.channelSchema";

const channelSchema = new Schema<ChannelInterface>(
  {
    isActiveChannel: {
      type: Boolean,
      default: true,
    },

    maxMembers: {
      type: Number,
      default: 2,
    },

    isSuspended: {
      type: Boolean,
      default: false,
    },

    lastMessage: {
      type: Schema.Types.ObjectId,
      ref: "Message",
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<ChannelDocument>("Channel", channelSchema);
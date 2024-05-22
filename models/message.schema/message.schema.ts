import { Schema, model } from "mongoose";
import { CustomType } from "../../helper/messageCustomType";
import { MessageDocument, MessageInterface } from "./type.messageSchema";

const messageSchema = new Schema<MessageInterface>(
  {
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "Channel",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    customType: {
      type: String,
      enum: Object.values(CustomType),
    },
    file: {
      photo_id: {
        type: String,
      },
      photo_url: {
        type: String,
      },
      photo_data: {
        type: String,
      },
    },
    reactionEmoji: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default model<MessageDocument>("Message", messageSchema);

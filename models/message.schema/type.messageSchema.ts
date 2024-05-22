export interface MessageInterface {
  message: string;
  sender?: string;
  channel?: string;
  isRead?: boolean;
  isDeleted?: boolean;
  customType?: string;
  file?: {
    photo_id?: string;
    photo_url?: string;
    photo_data?: string;
  };
  reactionEmoji?: string[];
}

export interface MessageDocument extends MessageInterface, Document {
  createdAt: Date;
  updatedAt: Date;
}

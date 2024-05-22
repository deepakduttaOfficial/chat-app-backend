export interface ChannelInterface {
    isActiveChannel: boolean;
    maxMembers: number;
    isSuspended: boolean;
    lastMessage?: string;
    members: string[];
}

export interface ChannelDocument extends ChannelInterface, Document {
    createdAt: Date;
    updatedAt: Date;
  }
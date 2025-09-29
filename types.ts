export interface User {
  id: string;
  name:string;
  avatarUrl?: string;
  online?: boolean;
  isBot?: boolean;
}

export enum MessageType {
  INCOMING,
  OUTGOING,
  SYSTEM
}

export interface Message {
  id: string;
  user: User;
  text: string;
  timestamp: string;
  type: MessageType;
  read?: boolean;
}
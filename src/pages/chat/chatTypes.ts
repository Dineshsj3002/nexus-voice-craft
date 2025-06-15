
export interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: Date;
  status: "sending" | "sent" | "delivered" | "read";
}

export interface Contact {
  id: string;
  name: string;
  status: "online" | "offline" | "away";
  avatar: string;
  unread: number;
  lastMessage: string;
  typing?: boolean;
}

export interface Group {
  id: string;
  name: string;
  members: number;
  lastActivity: string;
}

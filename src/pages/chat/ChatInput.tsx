
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  onMessageChange: (val: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  message,
  onMessageChange,
  onSendMessage,
  onKeyPress,
}) => (
  <div className="p-4 border-t border-gray-200 animate-fade-in">
    <div className="flex">
      <Button variant="ghost" size="icon" className="mr-1 hover:scale-110 transition-transform duration-200">
        <Plus className="h-5 w-5" />
      </Button>
      <Input
        placeholder="Type a message..."
        value={message}
        onChange={(e) => onMessageChange(e.target.value)}
        onKeyDown={onKeyPress}
        className="flex-1 mr-2 transition-all duration-200 focus:ring-2 focus:ring-nexus-primary/20"
      />
      <Button
        onClick={onSendMessage}
        className="bg-nexus-primary hover:bg-nexus-primary/90 text-white transition-all duration-200 hover:scale-105"
        disabled={!message.trim()}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  </div>
);

export default ChatInput;

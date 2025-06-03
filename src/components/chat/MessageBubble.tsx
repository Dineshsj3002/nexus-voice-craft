
import React from 'react';
import { Clock, Check, CheckCheck, MoreVertical, Reply, Forward, Star, Copy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface MessageBubbleProps {
  message: {
    id: string;
    text: string;
    sender: 'user' | 'other';
    timestamp: Date;
    status: 'sending' | 'sent' | 'delivered' | 'read';
    type?: 'text' | 'image' | 'document' | 'voice';
    replyTo?: {
      text: string;
      sender: string;
    };
    reactions?: Array<{
      emoji: string;
      count: number;
      users: string[];
    }>;
    isEdited?: boolean;
  };
  onReply?: (messageId: string) => void;
  onReact?: (messageId: string, emoji: string) => void;
  onForward?: (messageId: string) => void;
  onDelete?: (messageId: string) => void;
  onEdit?: (messageId: string) => void;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  message, 
  onReply, 
  onReact, 
  onForward, 
  onDelete, 
  onEdit 
}) => {
  const isUser = message.sender === 'user';
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getStatusIcon = () => {
    if (!isUser) return null;
    
    switch (message.status) {
      case 'sending':
        return <Clock className="h-3 w-3 text-whatsapp-textSecondary" />;
      case 'sent':
        return <Check className="h-3 w-3 text-whatsapp-textSecondary" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-whatsapp-textSecondary" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-whatsapp-teal" />;
      default:
        return null;
    }
  };

  const popularEmojis = ['👍', '❤️', '😂', '😮', '😢', '🙏'];

  return (
    <div className={`flex mb-1 ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`relative max-w-[65%] ${isUser ? 'order-2' : 'order-1'}`}>
        {/* Reply indicator */}
        {message.replyTo && (
          <div className={`mb-1 p-2 rounded-t-lg border-l-4 text-xs ${
            isUser 
              ? 'bg-whatsapp-light/50 border-whatsapp-dark' 
              : 'bg-gray-100 border-whatsapp-primary'
          }`}>
            <div className="font-medium text-whatsapp-primary">
              {message.replyTo.sender}
            </div>
            <div className="text-whatsapp-textSecondary truncate">
              {message.replyTo.text}
            </div>
          </div>
        )}

        {/* Message bubble */}
        <div 
          className={`relative px-3 py-2 rounded-lg font-whatsapp ${
            isUser
              ? 'bg-whatsapp-light text-whatsapp-text rounded-br-sm'
              : 'bg-whatsapp-incoming text-whatsapp-text rounded-bl-sm'
          } shadow-sm`}
        >
          {/* Message tail */}
          <div 
            className={`absolute bottom-0 w-0 h-0 ${
              isUser
                ? 'right-0 translate-x-[2px] border-l-[8px] border-l-whatsapp-light border-b-[8px] border-b-transparent'
                : 'left-0 -translate-x-[2px] border-r-[8px] border-r-whatsapp-incoming border-b-[8px] border-b-transparent'
            }`}
          />

          {/* Message content */}
          <div className="pr-12">
            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
              {message.text}
            </p>
            {message.isEdited && (
              <span className="text-xs text-whatsapp-textSecondary italic">edited</span>
            )}
          </div>

          {/* Timestamp and status */}
          <div className={`flex items-center justify-end gap-1 mt-1 absolute bottom-1 right-2`}>
            <span className="text-xs text-whatsapp-textSecondary">
              {formatTime(message.timestamp)}
            </span>
            {getStatusIcon()}
          </div>

          {/* Message options dropdown */}
          <div className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity ${
            isUser ? '-left-8' : '-right-8'
          }`}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0 bg-white/80 hover:bg-white">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={isUser ? 'end' : 'start'}>
                <DropdownMenuItem onClick={() => onReply?.(message.id)}>
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onForward?.(message.id)}>
                  <Forward className="h-4 w-4 mr-2" />
                  Forward
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Star className="h-4 w-4 mr-2" />
                  Star
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </DropdownMenuItem>
                {isUser && (
                  <DropdownMenuItem onClick={() => onEdit?.(message.id)}>
                    Edit
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem 
                  onClick={() => onDelete?.(message.id)}
                  className="text-red-600"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Reactions */}
        {message.reactions && message.reactions.length > 0 && (
          <div className="flex gap-1 mt-1">
            {message.reactions.map((reaction, index) => (
              <div 
                key={index}
                className="flex items-center bg-white rounded-full px-2 py-1 text-xs border shadow-sm cursor-pointer hover:bg-gray-50"
                onClick={() => onReact?.(message.id, reaction.emoji)}
              >
                <span className="mr-1">{reaction.emoji}</span>
                <span className="text-whatsapp-textSecondary">{reaction.count}</span>
              </div>
            ))}
          </div>
        )}

        {/* Quick reaction bar */}
        <div className={`absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full shadow-lg p-1 flex gap-1 ${
          isUser ? '-left-44' : '-right-44'
        }`}>
          {popularEmojis.map((emoji) => (
            <button
              key={emoji}
              className="hover:bg-gray-100 rounded-full p-1 text-sm"
              onClick={() => onReact?.(message.id, emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessageBubble;

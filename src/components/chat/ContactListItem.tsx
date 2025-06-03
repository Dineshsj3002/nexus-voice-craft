
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface ContactListItemProps {
  contact: {
    id: string;
    name: string;
    status: 'online' | 'offline' | 'away';
    avatar?: string;
    unread: number;
    lastMessage: string;
    lastMessageTime: Date;
    typing?: boolean;
    isGroup?: boolean;
    groupMembers?: number;
    isPinned?: boolean;
    isMuted?: boolean;
  };
  isActive: boolean;
  onClick: () => void;
}

const ContactListItem: React.FC<ContactListItemProps> = ({ contact, isActive, onClick }) => {
  const formatLastMessageTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = diff / (1000 * 60 * 60);
    const days = hours / 24;

    if (hours < 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days < 1) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (days < 7) {
      return date.toLocaleDateString([], { weekday: 'short' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <div 
      className={`flex items-center p-3 cursor-pointer transition-colors border-b border-whatsapp-border/30 ${
        isActive ? 'bg-whatsapp-panel' : 'hover:bg-gray-50'
      }`}
      onClick={onClick}
    >
      {/* Avatar */}
      <div className="relative mr-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src={contact.avatar} />
          <AvatarFallback className="bg-whatsapp-primary text-white font-medium">
            {contact.isGroup ? '👥' : getInitials(contact.name)}
          </AvatarFallback>
        </Avatar>
        
        {/* Online status indicator */}
        {!contact.isGroup && contact.status === 'online' && (
          <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 bg-whatsapp-online rounded-full border-2 border-white" />
        )}

        {/* Pinned indicator */}
        {contact.isPinned && (
          <div className="absolute -top-1 -right-1 h-4 w-4 bg-whatsapp-dark rounded-full flex items-center justify-center">
            <span className="text-xs text-white">📌</span>
          </div>
        )}
      </div>

      {/* Contact info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-medium text-whatsapp-text truncate flex items-center gap-2">
            {contact.name}
            {contact.isMuted && (
              <span className="text-whatsapp-textSecondary">🔇</span>
            )}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-whatsapp-textSecondary">
              {formatLastMessageTime(contact.lastMessageTime)}
            </span>
            {contact.unread > 0 && (
              <Badge className="bg-whatsapp-primary hover:bg-whatsapp-primary text-white text-xs h-5 min-w-5 flex items-center justify-center px-1.5">
                {contact.unread > 99 ? '99+' : contact.unread}
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            {contact.typing ? (
              <div className="flex items-center text-whatsapp-primary text-sm font-medium">
                <span>typing</span>
                <div className="flex ml-1 gap-0.5">
                  <div className="w-1 h-1 bg-whatsapp-primary rounded-full animate-typing" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-whatsapp-primary rounded-full animate-typing" style={{ animationDelay: '200ms' }} />
                  <div className="w-1 h-1 bg-whatsapp-primary rounded-full animate-typing" style={{ animationDelay: '400ms' }} />
                </div>
              </div>
            ) : (
              <p className="text-sm text-whatsapp-textSecondary truncate">
                {contact.isGroup && contact.groupMembers && (
                  <span className="mr-1">👥 {contact.groupMembers} members •</span>
                )}
                {contact.lastMessage}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactListItem;

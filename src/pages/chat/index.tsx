
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MoreVertical, Plus, LogOut, Settings, MessageCircle } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import ContactListItem from '@/components/chat/ContactListItem';
import MessageBubble from '@/components/chat/MessageBubble';
import ChatInput from '@/components/chat/ChatInput';
import { useAuth } from '@/hooks/useAuth';
import { useConversations } from '@/hooks/useConversations';
import { useMessages } from '@/hooks/useMessages';

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [replyingTo, setReplyingTo] = useState<any>(null);
  const [inputValue, setInputValue] = useState('');
  
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const { conversations, loading: conversationsLoading } = useConversations();
  const { messages, loading: messagesLoading, sendMessage, uploadFile } = useMessages(selectedConversation);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    await sendMessage(inputValue);
    setInputValue('');
    setReplyingTo(null);
  };

  const handleFileAttach = async (files: FileList) => {
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileData = await uploadFile(file);
      if (fileData) {
        const messageType = file.type.startsWith('image/') ? 'image' : 
                          file.type.startsWith('video/') ? 'video' : 'file';
        await sendMessage('', messageType, fileData);
      }
    }
  };

  const handleVoiceMessage = async (audioBlob: Blob) => {
    const file = new File([audioBlob], 'voice-message.wav', { type: 'audio/wav' });
    const fileData = await uploadFile(file);
    if (fileData) {
      await sendMessage('', 'voice', fileData);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getConversationName = (conversation: any) => {
    if (conversation.is_group) {
      return conversation.name || 'Group Chat';
    }
    
    const otherParticipant = conversation.participants.find((p: any) => p.id !== user?.id);
    return otherParticipant?.full_name || otherParticipant?.username || 'Unknown User';
  };

  const getConversationAvatar = (conversation: any) => {
    if (conversation.is_group) {
      return conversation.avatar_url;
    }
    
    const otherParticipant = conversation.participants.find((p: any) => p.id !== user?.id);
    return otherParticipant?.avatar_url;
  };

  const selectedConversationData = conversations.find(c => c.id === selectedConversation);

  const filteredConversations = conversations.filter(conversation =>
    getConversationName(conversation).toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-whatsapp-panel">
      {/* Sidebar */}
      <div className="w-1/3 bg-white border-r border-whatsapp-border flex flex-col">
        {/* Header */}
        <div className="bg-whatsapp-panel p-4 border-b border-whatsapp-border">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback className="bg-whatsapp-primary text-white">
                  {user.user_metadata?.full_name?.[0] || user.email?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-medium text-whatsapp-text">
                  {user.user_metadata?.full_name || 'User'}
                </h2>
                <p className="text-sm text-whatsapp-textSecondary">Online</p>
              </div>
            </div>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-whatsapp-textSecondary h-4 w-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white border-whatsapp-border focus:ring-whatsapp-primary"
            />
          </div>
        </div>
        
        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversationsLoading ? (
            <div className="p-4 text-center text-whatsapp-textSecondary">
              Loading conversations...
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="p-4 text-center text-whatsapp-textSecondary">
              No conversations yet
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <ContactListItem
                key={conversation.id}
                contact={{
                  id: conversation.id,
                  name: getConversationName(conversation),
                  status: 'online',
                  avatar: getConversationAvatar(conversation),
                  unread: conversation.unread_count,
                  lastMessage: conversation.last_message?.content || 'No messages yet',
                  lastMessageTime: conversation.last_message 
                    ? new Date(conversation.last_message.created_at)
                    : new Date(conversation.created_at),
                  isGroup: conversation.is_group,
                  groupMembers: conversation.participants.length
                }}
                isActive={selectedConversation === conversation.id}
                onClick={() => setSelectedConversation(conversation.id)}
              />
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="bg-whatsapp-panel p-4 border-b border-whatsapp-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={getConversationAvatar(selectedConversationData)} />
                    <AvatarFallback className="bg-whatsapp-primary text-white">
                      {getConversationName(selectedConversationData)?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-medium text-whatsapp-text">
                      {getConversationName(selectedConversationData)}
                    </h3>
                    <p className="text-sm text-whatsapp-textSecondary">
                      {selectedConversationData?.is_group 
                        ? `${selectedConversationData.participants.length} members`
                        : 'Online'
                      }
                    </p>
                  </div>
                </div>
                
                <Button variant="ghost" size="icon">
                  <MoreVertical className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-whatsapp-bg">
              {messagesLoading ? (
                <div className="text-center text-whatsapp-textSecondary">
                  Loading messages...
                </div>
              ) : messages.length === 0 ? (
                <div className="text-center text-whatsapp-textSecondary">
                  No messages yet. Start the conversation!
                </div>
              ) : (
                messages.map((message) => (
                  <MessageBubble
                    key={message.id}
                    message={{
                      id: message.id,
                      text: message.content || `[${message.message_type}]`,
                      sender: message.sender_id === user.id ? 'user' : 'other',
                      timestamp: new Date(message.created_at),
                      status: message.status || 'sent',
                      type: message.message_type as any,
                      replyTo: message.reply_to ? {
                        text: message.reply_to.content || '',
                        sender: message.reply_to.sender.full_name || message.reply_to.sender.username || 'Unknown'
                      } : undefined,
                      isEdited: message.is_edited
                    }}
                    onReply={(messageId) => {
                      setReplyingTo({
                        id: messageId,
                        text: message.content || '',
                        sender: message.sender.full_name || message.sender.username || 'Unknown'
                      });
                    }}
                  />
                ))
              )}
            </div>

            {/* Chat Input */}
            <ChatInput
              value={inputValue}
              onChange={setInputValue}
              onSend={handleSendMessage}
              onVoiceMessage={handleVoiceMessage}
              onFileAttach={handleFileAttach}
              onImageAttach={handleFileAttach}
              replyingTo={replyingTo}
              onCancelReply={() => setReplyingTo(null)}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-whatsapp-bg">
            <div className="text-center text-whatsapp-textSecondary">
              <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-medium mb-2">Welcome to Chat</h3>
              <p>Select a conversation to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;

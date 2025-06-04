import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Message {
  id: string;
  conversation_id: string;
  sender_id: string;
  content?: string;
  message_type: 'text' | 'image' | 'voice' | 'file' | 'video';
  file_url?: string;
  file_name?: string;
  file_size?: number;
  reply_to_id?: string;
  is_edited: boolean;
  is_deleted: boolean;
  created_at: string;
  updated_at: string;
  sender: {
    full_name?: string;
    username?: string;
    avatar_url?: string;
  };
  reply_to?: {
    content?: string;
    sender: {
      full_name?: string;
      username?: string;
    };
  };
  status?: 'sending' | 'sent' | 'delivered' | 'read';
}

export const useMessages = (conversationId: string | null) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchMessages = async () => {
    if (!conversationId || !user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:profiles!messages_sender_id_fkey (
            full_name,
            username,
            avatar_url
          ),
          reply_to:messages!messages_reply_to_id_fkey (
            content,
            sender:profiles!messages_sender_id_fkey (
              full_name,
              username
            )
          )
        `)
        .eq('conversation_id', conversationId)
        .eq('is_deleted', false)
        .order('created_at', { ascending: true });

      if (error) throw error;

      setMessages(data || []);
      
      // Mark messages as read
      if (data && data.length > 0) {
        await markMessagesAsRead(data.map(m => m.id));
      }
    } catch (error: any) {
      toast({
        title: 'Error loading messages',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (content: string, messageType: string = 'text', fileData?: any) => {
    if (!conversationId || !user || (!content.trim() && !fileData)) return;

    try {
      const messageData: any = {
        conversation_id: conversationId,
        sender_id: user.id,
        message_type: messageType
      };

      if (messageType === 'text') {
        messageData.content = content;
      } else if (fileData) {
        messageData.file_url = fileData.url;
        messageData.file_name = fileData.name;
        messageData.file_size = fileData.size;
        messageData.content = fileData.name;
      }

      const { error } = await supabase
        .from('messages')
        .insert(messageData);

      if (error) throw error;

    } catch (error: any) {
      toast({
        title: 'Error sending message',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const markMessagesAsRead = async (messageIds: string[]) => {
    if (!user || messageIds.length === 0) return;

    try {
      // Insert or update message status for each message
      const statusUpdates = messageIds.map(messageId => ({
        message_id: messageId,
        user_id: user.id,
        status: 'read'
      }));

      await supabase
        .from('message_status')
        .upsert(statusUpdates, { onConflict: 'message_id,user_id' });
    } catch (error: any) {
      console.error('Error marking messages as read:', error);
    }
  };

  const uploadFile = async (file: File): Promise<{ url: string; name: string; size: number } | null> => {
    if (!user) return null;

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${user.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('chat-files')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('chat-files')
        .getPublicUrl(fileName);

      return {
        url: publicUrl,
        name: file.name,
        size: file.size
      };
    } catch (error: any) {
      toast({
        title: 'Error uploading file',
        description: error.message,
        variant: 'destructive'
      });
      return null;
    }
  };

  useEffect(() => {
    if (conversationId && user) {
      fetchMessages();

      // Set up real-time subscription for messages
      const subscription = supabase
        .channel(`messages:${conversationId}`)
        .on('postgres_changes', {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        }, () => {
          fetchMessages();
        })
        .on('postgres_changes', {
          event: 'UPDATE',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`
        }, () => {
          fetchMessages();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [conversationId, user]);

  return {
    messages,
    loading,
    sendMessage,
    uploadFile,
    refetch: fetchMessages
  };
};

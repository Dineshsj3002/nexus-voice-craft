
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

export interface Conversation {
  id: string;
  name?: string;
  is_group: boolean;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
  participants: Array<{
    id: string;
    full_name?: string;
    username?: string;
    avatar_url?: string;
    is_online: boolean;
    last_seen?: string;
  }>;
  last_message?: {
    content: string;
    created_at: string;
    sender_id: string;
    message_type: string;
  };
  unread_count: number;
}

export const useConversations = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchConversations = async () => {
    if (!user) return;

    try {
      // Get user's conversations with participants and last message
      const { data: conversationData, error } = await supabase
        .from('conversation_participants')
        .select(`
          conversation_id,
          conversations!inner (
            id,
            name,
            is_group,
            avatar_url,
            created_at,
            updated_at
          )
        `)
        .eq('user_id', user.id);

      if (error) throw error;

      const conversationsWithDetails = await Promise.all(
        conversationData.map(async (item) => {
          const conversation = item.conversations;
          
          // Get all participants for this conversation
          const { data: participantsData } = await supabase
            .from('conversation_participants')
            .select(`
              profiles!inner (
                id,
                full_name,
                username,
                avatar_url,
                is_online,
                last_seen
              )
            `)
            .eq('conversation_id', conversation.id);

          // Get last message
          const { data: lastMessageData } = await supabase
            .from('messages')
            .select('content, created_at, sender_id, message_type')
            .eq('conversation_id', conversation.id)
            .eq('is_deleted', false)
            .order('created_at', { ascending: false })
            .limit(1);

          // Get unread count (messages not read by current user)
          const { data: unreadData } = await supabase
            .from('messages')
            .select('id')
            .eq('conversation_id', conversation.id)
            .neq('sender_id', user.id)
            .not('id', 'in', `(
              SELECT message_id FROM message_status 
              WHERE user_id = '${user.id}' AND status = 'read'
            )`);

          return {
            ...conversation,
            participants: participantsData?.map(p => p.profiles) || [],
            last_message: lastMessageData?.[0],
            unread_count: unreadData?.length || 0
          };
        })
      );

      setConversations(conversationsWithDetails);
    } catch (error: any) {
      toast({
        title: 'Error loading conversations',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const createConversation = async (participantIds: string[], isGroup = false, name?: string) => {
    if (!user) return null;

    try {
      // Create conversation
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .insert({
          name,
          is_group: isGroup,
          created_by: user.id
        })
        .select()
        .single();

      if (conversationError) throw conversationError;

      // Add participants (including creator)
      const allParticipants = [user.id, ...participantIds];
      const { error: participantsError } = await supabase
        .from('conversation_participants')
        .insert(
          allParticipants.map(userId => ({
            conversation_id: conversationData.id,
            user_id: userId,
            role: userId === user.id ? 'admin' : 'member'
          }))
        );

      if (participantsError) throw participantsError;

      await fetchConversations();
      return conversationData.id;
    } catch (error: any) {
      toast({
        title: 'Error creating conversation',
        description: error.message,
        variant: 'destructive'
      });
      return null;
    }
  };

  useEffect(() => {
    if (user) {
      fetchConversations();

      // Set up real-time subscription for conversations
      const subscription = supabase
        .channel('conversations')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'conversations'
        }, () => {
          fetchConversations();
        })
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'messages'
        }, () => {
          fetchConversations();
        })
        .subscribe();

      return () => {
        supabase.removeChannel(subscription);
      };
    }
  }, [user]);

  return {
    conversations,
    loading,
    createConversation,
    refetch: fetchConversations
  };
};

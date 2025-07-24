export type FetchCommunityPayload = {
  page: number;
  limit: number;
};

export type Community = {
  community_id: number;
  community_username: string;
  community_name: string;
  description: string;
  avatar: string;
  banner: string;
};

export type ChatMessage = {
  id: string;
  community_id: string;
  content: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  sender_id: string;
  sender_name: string;
  sender_avatar: string;
  receiver_id: string;
  receiver_name: string;
  receiver_avatar: string;
  is_admin_chat: boolean;
  is_deleted_all: boolean;
  is_deleted_self: boolean;
  is_forwarded: boolean;
  is_pinned: boolean;
  is_read: boolean;
  is_receiver_verified: boolean;
  is_sender_verified: boolean;
  reply_to_id: string;
  media_url: string;
  additional_fields:string;
  tags: string;
};

export type FetchChatPayload = {
  community_id: number;
  user_id: number ;
  content?:""
};

export type CommunityState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  data: Community[];
  loading: boolean;
  error: string | null;
  page: number;
  limit: number;
  totalCount: number;
};
export type ChatState = {
  status: 'idle' | 'loading' | 'success' | 'error';
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  community_id: number;
  user_id: number;
};

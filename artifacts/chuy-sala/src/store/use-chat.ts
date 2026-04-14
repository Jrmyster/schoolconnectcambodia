import { create } from "zustand";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  reviewerMode?: boolean;
}

interface ChatState {
  isOpen: boolean;
  reviewerMode: boolean;
  conversationId: number | null;
  messages: ChatMessage[];
  pendingPrompt: string | null;
  openChat: (opts?: { reviewerMode?: boolean; prompt?: string }) => void;
  closeChat: () => void;
  setConversationId: (id: number) => void;
  addMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
  clearPendingPrompt: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  isOpen: false,
  reviewerMode: false,
  conversationId: null,
  messages: [],
  pendingPrompt: null,
  openChat: (opts) =>
    set({
      isOpen: true,
      reviewerMode: opts?.reviewerMode ?? false,
      pendingPrompt: opts?.prompt ?? null,
    }),
  closeChat: () => set({ isOpen: false }),
  setConversationId: (id) => set({ conversationId: id }),
  addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
  clearMessages: () => set({ messages: [], conversationId: null }),
  clearPendingPrompt: () => set({ pendingPrompt: null }),
}));

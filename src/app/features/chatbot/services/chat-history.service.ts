import { inject, PLATFORM_ID, Service, signal } from '@angular/core';
import { ChatConversation } from '../models/chat-conversation.model';
import { isPlatformBrowser } from '@angular/common';

@Service()
export class ChatHistoryService {
  private readonly platformId = inject(PLATFORM_ID);

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  private readonly storageKey = 'smart-coach-conversations';

  private readonly _conversations = signal<ChatConversation[]>(this.loadConversations());
  readonly conversations = this._conversations.asReadonly();

  private isValidConversation(value: unknown): value is ChatConversation {
    if (!value || typeof value !== 'object') return false;

    const item = value as Record<string, unknown>;

    return (
      typeof item['id'] === 'string' &&
      typeof item['title'] === 'string' &&
      typeof item['createdAt'] === 'string' &&
      typeof item['updatedAt'] === 'string' &&
      Array.isArray(item['messages']) &&
      item['messages'].every((message) => {
        if (!message || typeof message !== 'object') return false;

        const msg = message as Record<string, unknown>;

        return (
          typeof msg['id'] === 'string' &&
          (msg['role'] === 'user' || msg['role'] === 'model') &&
          typeof msg['content'] === 'string' &&
          typeof msg['createdAt'] === 'string'
        );
      })
    );
  }

  private loadConversations(): ChatConversation[] {
    if (!this.isBrowser) return [];

    try {
      const stored = localStorage.getItem(this.storageKey);

      if (!stored) return [];

      const parsed: unknown = JSON.parse(stored);

      if (!Array.isArray(parsed)) return [];

      return parsed.filter((item): item is ChatConversation => this.isValidConversation(item));
    } catch {
      return [];
    }
  }

  private persist(conversations: ChatConversation[]): void {
    if (!this.isBrowser) {
      this._conversations.set(conversations);
      return;
    }

    try {
      localStorage.setItem(this.storageKey, JSON.stringify(conversations));
      this._conversations.set(conversations);
    } catch (error) {
      console.error('Failed to save chat history:', error);
      throw error;
    }
  }

  saveConversation(conversation: ChatConversation): void {
    const conversations = this._conversations();
    const exists = conversations.some((item) => item.id === conversation.id);

    const updated = exists
      ? conversations.map((item) => (item.id === conversation.id ? conversation : item))
      : [conversation, ...conversations];

    this.persist(updated);
  }

  deleteConversation(id: string): void {
    this.persist(this._conversations().filter((item) => item.id !== id));
  }
}

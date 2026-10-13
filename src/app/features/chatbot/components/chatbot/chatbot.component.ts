import {
  Component,
  inject,
  signal,
  afterNextRender,
  ElementRef,
  Injector,
  viewChild,
} from '@angular/core';
import {
  LucideArrowUp,
  LucideLoaderCircle,
  LucidePencilLine,
  LucidePenLine,
  LucideTrash,
} from '@lucide/angular';
import { ChatMessage } from '../../models/chat-message.model';
import { ChatHistoryService } from '../../services/chat-history.service';
import { ChatConversation } from '../../models/chat-conversation.model';
import { ToggleChatbotComponent } from '../toggle-chatbot/toggle-chatbot.component';
import { FormsModule } from '@angular/forms';
import { ChatMarkdownService } from '../../services/chat-markdown.service';
import { ChatbotService } from '../../services/chatbot.service';
import { ChatbotContent } from '../../models/chatbot-content.model';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  imports: [
    LucidePencilLine,
    LucideArrowUp,
    LucideTrash,
    LucidePenLine,
    LucideLoaderCircle,
    ToggleChatbotComponent,
    FormsModule,
    TranslatePipe
  ],
  selector: 'app-chatbot',
  styleUrl: './chatbot.component.scss',
  templateUrl: './chatbot.component.html',
})
export class ChatbotComponent {
  private readonly chatbot = inject(ChatbotService);
  protected readonly chatHistory = inject(ChatHistoryService);
  private readonly chatMarkdown = inject(ChatMarkdownService);
  private readonly injector = inject(Injector);

  protected readonly messagesContainer = viewChild<ElementRef<HTMLDivElement>>('messagesContainer');

  readonly isOpen = signal(false);
  readonly isPrevChatsopen = signal(false);

  inputValue = signal<string>('');

  readonly messages = signal<ChatMessage[]>([]);
  readonly isLoading = signal(false);
  readonly error = signal<string | null>(null);
  readonly failedQuestion = signal<string | null>(null);

  private readonly activeConversation = signal<ChatConversation | null>(null);

  openPrevChats = () => this.isPrevChatsopen.set(true);
  closePrevChats = () => this.isPrevChatsopen.set(false);
  togglePrevChats = () => (this.isPrevChatsopen() ? this.closePrevChats() : this.openPrevChats());

  private scrollToBottom(): void {
    afterNextRender(
      () => {
        const container = this.messagesContainer()?.nativeElement;

        container?.scrollTo({
          top: container.scrollHeight,
          behavior: 'smooth',
        });
      },
      { injector: this.injector },
    );
  }

  openChatbot(): void {
    if (this.isOpen()) return;

    this.chatbot.startNewChat();
    this.activeConversation.set(null);
    this.messages.set([]);
    this.error.set(null);
    this.isOpen.set(true);
  }
  closeChatbot(): void {
    if (this.isLoading()) return;

    this.saveActiveConversation();

    this.chatbot.startNewChat();
    this.activeConversation.set(null);
    this.messages.set([]);
    this.error.set(null);
    this.isPrevChatsopen.set(false);
    this.isOpen.set(false);
  }
  toggleChatbot = () => (this.isOpen() ? this.closeChatbot() : this.openChatbot());

  startNewChat(): void {
    if (this.isLoading()) return;

    this.saveActiveConversation();

    this.chatbot.startNewChat();
    this.activeConversation.set(null);
    this.messages.set([]);
    this.error.set(null);
    this.isPrevChatsopen.set(false);
  }

  async sendMessage(question: string, isRetry: boolean = false): Promise<void> {
    const content = question.trim();
    if (!content || this.isLoading()) return;

    this.error.set(null);
    this.failedQuestion.set(null);

    if (!isRetry) {
      const now = new Date().toISOString();

      let conversation = this.activeConversation();

      if (!conversation) {
        conversation = {
          id: crypto.randomUUID(),
          title: content.slice(0, 50),
          messages: [],
          createdAt: now,
          updatedAt: now,
        };

        this.activeConversation.set(conversation);
      }

      const userMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'user',
        content,
        createdAt: now,
      };

      this.messages.update((messages) => [...messages, userMessage]);
      this.updateActiveConversation();
      this.scrollToBottom();
    }

    this.isLoading.set(true);
    this.scrollToBottom();

    try {
      const answer = await this.chatbot.ask(content);

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: 'model',
        content: answer,
        createdAt: new Date().toISOString(),
      };

      this.messages.update((messages) => [...messages, assistantMessage]);
      this.updateActiveConversation();
      this.scrollToBottom();
    } catch (error) {
      console.error('Gemini request failed:', error);

      this.failedQuestion.set(content);
      this.error.set('Emo couldn’t respond. Please try again.');
    } finally {
      this.isLoading.set(false);
      this.scrollToBottom();
    }
  }

  retryLastMessage(): void {
    const question = this.failedQuestion();

    if (!question || this.isLoading()) return;

    this.sendMessage(question, true);
  }

  selectConversation(conversation: ChatConversation): void {
    if (this.isLoading()) return;

    this.saveActiveConversation();

    this.activeConversation.set(conversation);
    this.messages.set([...conversation.messages]);

    const history = this.toGeminiHistory(conversation.messages);

    this.chatbot.restoreChat(history);

    this.error.set(null);
    this.isPrevChatsopen.set(false);
    this.isOpen.set(true);
  }

  deleteConversation(id: string): void {
    if (this.activeConversation()?.id === id) {
      this.activeConversation.set(null);
      this.messages.set([]);
      this.chatbot.startNewChat();
    }

    this.chatHistory.deleteConversation(id);
  }

  private updateActiveConversation(): void {
    const active = this.activeConversation();

    if (!active) return;

    const updated: ChatConversation = {
      ...active,
      messages: [...this.messages()],
      updatedAt: new Date().toISOString(),
    };

    this.activeConversation.set(updated);

    try {
      this.chatHistory.saveConversation(updated);
    } catch {
      this.error.set('Your conversation could not be saved locally.');
    }
  }

  private saveActiveConversation(): void {
    const active = this.activeConversation();

    if (!active || !this.messages().length) return;

    this.updateActiveConversation();
  }

  private toGeminiHistory(messages: ChatMessage[]): ChatbotContent[] {
    const history: ChatbotContent[] = [];

    for (let i = 0; i < messages.length - 1; i++) {
      const userMessage = messages[i];
      const modelMessage = messages[i + 1];

      // Restore only completed user/model exchanges.
      if (userMessage.role === 'user' && modelMessage.role === 'model') {
        history.push(
          {
            role: 'user',
            parts: [{ text: userMessage.content }],
          },
          {
            role: 'model',
            parts: [{ text: modelMessage.content }],
          },
        );

        i++;
      }
    }

    return history;
  }

  protected formatMessage(content: string): string {
    return this.chatMarkdown.format(content);
  }
}

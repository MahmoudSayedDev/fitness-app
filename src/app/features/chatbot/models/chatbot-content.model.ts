export interface ChatbotPart {
  text: string;
}

export interface ChatbotContent {
  role: 'user' | 'model';
  parts: ChatbotPart[];
}

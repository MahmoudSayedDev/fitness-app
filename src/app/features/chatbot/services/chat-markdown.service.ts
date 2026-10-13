import { Service } from '@angular/core';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

@Service()
export class ChatMarkdownService {
  format(content: string): string {
    const html = marked.parse(content, { async: false });

    return DOMPurify.sanitize(html);
  }
}

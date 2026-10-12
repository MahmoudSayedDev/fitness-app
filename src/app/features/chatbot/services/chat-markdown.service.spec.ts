import { TestBed } from '@angular/core/testing';
import { ChatMarkdownService } from './chat-markdown.service';

describe('ChatMarkdownService', () => {
  let service: ChatMarkdownService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatMarkdownService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

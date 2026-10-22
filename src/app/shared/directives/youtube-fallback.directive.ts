import { Directive, ElementRef, HostListener, inject, input } from '@angular/core';
import { extractYouTubeId } from '../utils/youtube-thumbnail.util';

@Directive({
  selector: 'img[youtubeFallback]',
})
export class YoutubeFallbackDirective {
  private readonly imgRef = inject<ElementRef<HTMLImageElement>>(ElementRef);

  readonly youtubeFallback = input.required<string | null | undefined>();

  @HostListener('error')
  onError(): void {
    const videoId = extractYouTubeId(this.youtubeFallback());
    if (!videoId) return;

    const fallbackUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    if (this.imgRef.nativeElement.src !== fallbackUrl) {
      this.imgRef.nativeElement.src = fallbackUrl;
    }
  }
}

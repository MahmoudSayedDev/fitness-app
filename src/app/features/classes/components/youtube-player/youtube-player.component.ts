import { Component, computed, effect, inject, input, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { YoutubeThumbnailPipe } from '../../../../shared/pipes/youtube-thumbnail.pipe';
import { YoutubeFallbackDirective } from '../../../../shared/directives/youtube-fallback.directive';
import { extractYouTubeId } from '../../../../shared/utils/youtube-thumbnail.util';
import { Exercise } from '../../models/exercises.model';

@Component({
  selector: 'app-youtube-player',
  standalone: true,
  imports: [YoutubeThumbnailPipe, YoutubeFallbackDirective],
  templateUrl: './youtube-player.component.html',
  styleUrl: './youtube-player.component.scss',
})
export class YoutubePlayerComponent {
  private readonly sanitizer = inject(DomSanitizer);

  exercise = input.required<Exercise>();
  readonly isPlaying = signal<boolean>(false);

  constructor() {
    effect(() => {
      const exercise = this.exercise();

      this.isPlaying.set(false);
    });
  }

  readonly embedUrl = computed<SafeResourceUrl | null>(() => {
    const videoId = extractYouTubeId(this.exercise().short_youtube_demonstration_link);
    if (!videoId) return null;

    const rawUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
  });

  playVideo(): void {
    this.isPlaying.set(true);
  }
}

import { Pipe, PipeTransform } from '@angular/core';
import { getYouTubeThumbnail, YouTubeQuality } from '../utils/youtube-thumbnail.util';

@Pipe({
  name: 'youtubeThumbnail',
})
export class YoutubeThumbnailPipe implements PipeTransform {
  transform(value: string | null | undefined, quality: YouTubeQuality = 'maxresdefault'): string {
    return getYouTubeThumbnail(value, quality);
  }
}

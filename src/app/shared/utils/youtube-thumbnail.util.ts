export type YouTubeQuality = 'maxresdefault' | 'sddefault' | 'hqdefault' | 'mqdefault' | 'default';

export function extractYouTubeId(urlOrId: string | null | undefined): string | null {
  if (!urlOrId) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = urlOrId.match(regExp);
  return match && match[2].length === 11 ? match[2] : urlOrId.length === 11 ? urlOrId : null;
}

export function getYouTubeThumbnail(
  urlOrId: string | null | undefined,
  quality: YouTubeQuality = 'maxresdefault',
): string {
  const videoId = extractYouTubeId(urlOrId);
  return videoId ? `https://img.youtube.com/vi/${videoId}/${quality}.jpg` : '';
}

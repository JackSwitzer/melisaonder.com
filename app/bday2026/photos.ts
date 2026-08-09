// Photos for /bday2026.
//
// TO USE THE REAL "2032" ALBUM:
//   1. Export the album into public/bday2026/ (jpg/jpeg/png/webp)
//   2. Run: python3 scripts/gen-bday2026-manifest.py
//      -> that rewrites the PHOTOS array below from the folder contents
//   3. Edit the captions to taste.
//
// Until then the page runs on stand-in photos already in the repo so the
// layout can be previewed locally.

export type Photo = {
  src: string;
  alt: string;
  /** Little line shown under the photo. Leave undefined for no caption. */
  caption?: string;
};

export const USING_PLACEHOLDERS = true;

export const PHOTOS: Photo[] = [
  {
    src: '/gfday1.5/hi-1.jpg',
    alt: 'Us',
    caption: 'my favourite person, every single day',
  },
  {
    src: '/vday2026/couple.jpg',
    alt: 'Us',
    caption: 'you make everything softer',
  },
  {
    src: '/gfday1.5/beautiful-1.jpg',
    alt: 'Us',
    caption: 'beautiful without even trying',
  },
  {
    src: '/gfday1.5/love-2.jpg',
    alt: 'Us',
    caption: 'and so, so funny',
  },
  {
    src: '/gfday1.5/sleepy-1.jpg',
    alt: 'Us',
    caption: 'best napping partner in the world',
  },
  {
    src: '/gfday1.5/love-4.jpg',
    alt: 'Us',
    caption: 'here is to another year of this',
  },
];

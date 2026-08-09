Assets for /bday2026.

## Photos

Drop the "2032" album photos in here (jpg/jpeg/png/webp), then run:

    python3 scripts/gen-bday2026-manifest.py

That regenerates app/bday2026/photos.ts from this folder.

## Music

The page plays a song on loop once you tap "let the sun in", with a
mute toggle in the bottom-right corner. It expects:

    public/bday2026/sunday-morning.mp3

If that file is missing the page still works — playback just fails
silently and the toggle does nothing.

Assets for /bday2026.

## Photos

The "2032" album lives here as `01-…` through `10-…`. The numeric prefixes set
the order they appear on the page, since the manifest is sorted by filename.

After adding, removing, or renaming a photo, run:

    python3 scripts/gen-bday2026-manifest.py

That rewrites app/bday2026/photos.ts from this folder. Alt text and captions
you have already written are preserved by filename, and photos that are wider
than they are tall are flagged `landscape: true` so the page frames them 4:3
instead of 3:4.

Originals are full-resolution phone shots; these are downscaled to 1800px on
the long edge to keep the repo reasonable.

## Music

The page plays `sunday-morning.mp3` on loop once you tap "let the sun in",
with a mute toggle in the bottom-right corner. If that file is missing the
page still works — playback just fails silently and the toggle does nothing.

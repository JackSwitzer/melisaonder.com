"""
Generate analyst prompt for a batch of looks.

Usage: uv run python scripts/gen-analyst-prompt.py <start_look> <end_look>
Example: uv run python scripts/gen-analyst-prompt.py 13 22

Outputs the prompt to stdout for piping into agent commands.
"""

import json
import os
import sys

BASE = os.path.join(os.path.dirname(__file__), "..")
MANIFEST_PATH = os.path.join(BASE, "public", "outfits", "extracted", "manifest-raw.json")

# Known recurring items for quick reference
KNOWN_HASHES = {
    "1818b67b0f5b": "CHALKBOARD BACKGROUND - always decorative",
    "5e1cd7a5e8f8": "FILM STRIP FRAME - always decorative",
    "4c5dd7d41f25": "KNOWN: large thin gold hoop earrings",
    "3faf30a0dcf1": "KNOWN: Bering square-face gold watch",
    "bf1da173417e": "KNOWN: Timex oval-face gold watch",
}


def main():
    start = int(sys.argv[1])
    end = int(sys.argv[2])

    with open(MANIFEST_PATH) as f:
        manifest = json.load(f)

    # Build hash->first occurrence map across all looks for dup detection
    hash_first_occurrence = {}
    for look in manifest["looks"]:
        for item in look["items"]:
            h = item["imageHash"]
            key = f"{look['id']}/{item['file']}"
            if h not in hash_first_occurrence:
                hash_first_occurrence[h] = key

    looks = []
    for look in manifest["looks"]:
        num = int(look["id"].split("-")[1])
        if start <= num <= end:
            looks.append(look)

    if not looks:
        print(f"No looks found in range {start}-{end}", file=sys.stderr)
        sys.exit(1)

    # Generate prompt
    lines = []
    lines.append(f"### Assignment: looks {start} through {end} ({len(looks)} looks)\n")

    for look in looks:
        look_id = look["id"]
        n_items = len(look["items"])
        slide_img = look.get("slideImage", "none")
        category = look.get("category", "unknown")

        lines.append(f"\n### {look_id} ({n_items} items)")
        lines.append(f"- Slide image: /Users/jackswitzer/Desktop/melisaonder.com/public/outfits/slides/{os.path.basename(slide_img) if slide_img else 'none'}")
        lines.append(f"- Items dir: /Users/jackswitzer/Desktop/melisaonder.com/public/outfits/extracted/{look_id}/")
        lines.append(f"- Category: {category}")
        lines.append(f"- Manifest data:")

        # Track hashes within this look for intra-look dup detection
        look_hashes = {}

        for item in look["items"]:
            fname = item["file"]
            w = item["width"]
            h = item["height"]
            rot = item["rotation"]
            ihash = item["imageHash"]
            fsize = item["fileSize"]
            ctype = item["contentType"]

            notes = []

            # Known hash?
            if ihash in KNOWN_HASHES:
                notes.append(KNOWN_HASHES[ihash])

            # Rotation 180 = mirrored
            if abs(rot - 180.0) < 1:
                notes.append("ROTATION 180 - mirrored copy")

            # Intra-look duplicate?
            if ihash in look_hashes:
                notes.append(f"DUPLICATE of {look_hashes[ihash]}")
            else:
                look_hashes[ihash] = fname

            # Tiny artifact?
            if fsize < 5000 and w < 70 and h < 70:
                notes.append("TINY ARTIFACT - likely decorative")

            note_str = f" ({'; '.join(notes)})" if notes else ""
            lines.append(f"  {fname}: {w}x{h}, rot={rot}, hash={ihash}, size={fsize}{note_str}")

    lines.append(f"\n## Output")
    lines.append(f"\nFor EACH look, write the analysis JSON using the Write tool to:")
    for look in looks:
        lines.append(f"- /Users/jackswitzer/Desktop/melisaonder.com/public/outfits/extracted/analysis/{look['id']}.json")

    print("\n".join(lines))


if __name__ == "__main__":
    main()

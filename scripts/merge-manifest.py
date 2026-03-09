"""
Merge raw extraction manifest with per-look analysis JSONs.

Combines:
  - public/outfits/extracted/manifest-raw.json (positions, sizes, hashes)
  - public/outfits/extracted/analysis/look-{id}.json (types, descriptions, titles)

Output:
  - public/outfits/extracted/manifest.json (final enriched manifest)
"""

import json
import os
import sys

BASE = os.path.join(os.path.dirname(__file__), "..", "public", "outfits", "extracted")
RAW_PATH = os.path.join(BASE, "manifest-raw.json")
ANALYSIS_DIR = os.path.join(BASE, "analysis")
OUT_PATH = os.path.join(BASE, "manifest.json")


def main():
    with open(RAW_PATH) as f:
        raw = json.load(f)

    enriched_looks = []
    analyzed = 0
    unenriched = 0

    for look in raw["looks"]:
        look_id = look["id"]
        analysis_path = os.path.join(ANALYSIS_DIR, f"{look_id}.json")

        if os.path.exists(analysis_path):
            with open(analysis_path) as f:
                analysis = json.load(f)

            # Build enriched look merging position data + analysis
            enriched = {
                "id": look_id,
                "slideIndex": look["slideIndex"],
                "slideImage": look.get("slideImage"),
                "category": analysis.get("category", look.get("category")),
                "title": analysis.get("title", ""),
                "description": analysis.get("description", ""),
                "occasion": analysis.get("occasion", ""),
                "colorPalette": analysis.get("colorPalette", []),
                "panelColors": look.get("panelColors", []),
                "items": [],
            }

            # Create lookup from analysis items by file
            analysis_items = {item["file"]: item for item in analysis.get("items", [])}

            for raw_item in look["items"]:
                fname = raw_item["file"]
                a_item = analysis_items.get(fname, {})

                enriched_item = {
                    # Position data from raw
                    "file": fname,
                    "left": raw_item["left"],
                    "top": raw_item["top"],
                    "width": raw_item["width"],
                    "height": raw_item["height"],
                    "rotation": raw_item["rotation"],
                    "zIndex": raw_item["zIndex"],
                    "imageHash": raw_item["imageHash"],
                    "fileSize": raw_item["fileSize"],
                    "contentType": raw_item["contentType"],
                    # Analysis data
                    "type": a_item.get("type", "unknown"),
                    "description": a_item.get("description", ""),
                    "confidence": a_item.get("confidence", 0),
                }

                if "actualWidth" in raw_item:
                    enriched_item["actualWidth"] = raw_item["actualWidth"]
                if "actualHeight" in raw_item:
                    enriched_item["actualHeight"] = raw_item["actualHeight"]

                enriched["items"].append(enriched_item)

            analyzed += 1
        else:
            # No analysis yet — pass through raw data with placeholder fields
            enriched = {
                "id": look_id,
                "slideIndex": look["slideIndex"],
                "slideImage": look.get("slideImage"),
                "category": look.get("category"),
                "title": "",
                "description": "",
                "occasion": "",
                "colorPalette": [],
                "panelColors": look.get("panelColors", []),
                "items": [
                    {
                        **item,
                        "type": "unknown",
                        "description": "",
                        "confidence": 0,
                    }
                    for item in look["items"]
                ],
            }
            unenriched += 1

        enriched_looks.append(enriched)

    manifest = {
        "slideWidth": raw["slideWidth"],
        "slideHeight": raw["slideHeight"],
        "totalSlides": raw["totalSlides"],
        "analyzedLooks": analyzed,
        "totalLooks": len(enriched_looks),
        "sharedImages": raw.get("sharedImages", {}),
        "looks": enriched_looks,
    }

    with open(OUT_PATH, "w") as f:
        json.dump(manifest, f, indent=2)

    print(f"Merged manifest written to: {OUT_PATH}")
    print(f"  Analyzed: {analyzed} looks")
    print(f"  Unenriched: {unenriched} looks")
    print(f"  Total: {len(enriched_looks)} looks")


if __name__ == "__main__":
    main()

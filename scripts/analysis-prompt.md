# Outfit Look Analyst — Instructions

You are analyzing outfit collage slides from a capsule wardrobe lookbook. Each "look" is a Canva-designed collage containing individual clothing items, accessories, and reference photos arranged into a styled outfit composition.

## Your Task

For each look assigned to you:

1. **Read the full slide image** (the pre-rendered JPG) to see the complete composition
2. **Read each extracted item image** to identify individual pieces
3. **Classify each item** using the schema below
4. **Describe each item** concisely (color, material, style)
5. **Name the overall look** — a short, evocative title (2-4 words)
6. **Describe the outfit context** — how items combine, the vibe/occasion, why pieces work together
7. **Identify the color palette** — 3-5 dominant hex colors

## Classification Schema

| Type | Description | Identification Clues |
|------|-------------|---------------------|
| `reference_photo` | Real-life outfit photo / street style inspiration | Has a real background (street, interior, outdoor). Shows a person wearing clothes. Usually the largest item or positioned in a prominent spot. |
| `top` | Shirt, blouse, sweater, turtleneck, tank | Upper body garment. Usually on transparent/white background. |
| `bottom` | Pants, trousers, skirt, shorts, jeans | Lower body garment. |
| `outerwear` | Coat, jacket, blazer, cape, poncho | Outer layer piece. Often the hero/statement piece of the outfit. |
| `dress` | Full dress, jumpsuit, romper | Single piece covering full body or most of it. |
| `shoes` | Boots, heels, sneakers, flats, loafers | Footwear of any kind. |
| `bag` | Handbag, clutch, tote, crossbody, backpack | Bags and purses. |
| `accessory` | Scarf, gloves, mittens, hat, belt, sunglasses | Non-jewelry accessories. |
| `jewelry` | Earrings, necklace, bracelet, ring, watch | Small precious/fashion jewelry items. |
| `decorative` | Hanger icon, price tag, small UI element | Very tiny items (< 80px in both dimensions). Not actual clothing. |

## Output Format

For each look, write a JSON file to `public/outfits/extracted/analysis/look-{id}.json`:

```json
{
  "id": "look-3",
  "title": "Fur & Leather",
  "description": "Rich winter ensemble pairing faux fur with chocolate brown knits and leather boots — perfect for a weekend city walk",
  "category": "casual",
  "occasion": "weekend brunch, city walk, shopping",
  "colorPalette": ["#5C3A1E", "#E8C4C4", "#F5E6D3", "#1A1A1A", "#8B6914"],
  "items": [
    {
      "file": "item-0.png",
      "type": "outerwear",
      "description": "Cream faux-fur cropped jacket",
      "confidence": 0.95
    },
    {
      "file": "item-1.jpg",
      "type": "reference_photo",
      "description": "Street style — model in fur coat over brown tones with leather boots",
      "confidence": 1.0
    }
  ]
}
```

## Important Notes

- **Confidence**: Use 0.0-1.0. If you're unsure about a classification, lower the confidence and the grader will review.
- **Item order**: Match items by filename (`item-0`, `item-1`, etc.) to the manifest-raw.json entries.
- **Every item must be classified** — don't skip any. Even tiny items get classified as `decorative`.
- **Reference photos are key** — these are the real-world inspiration shots. They're usually larger, have real backgrounds, and show people. Getting these right is critical.
- **Color palette**: Extract from the overall composition, not just one item. Use hex codes.
- **Title**: Be creative but concise. Think fashion editorial (e.g., "Moto Luxe", "Golden Hour", "Off-Duty Cool").
- **Description**: One sentence describing how the pieces work together, the styling intent, and when you'd wear it.

## Critical Rules (from Batch 1 Grading)

These rules were discovered during calibration and MUST be followed:

### 1. Background Panel Rule
Any `.jpg` item (not `.png`) with `rotation: 90` and fileSize around 900KB is the chalkboard background panel. Always classify as `type: "decorative"` with description "Chalkboard texture background panel (slide backdrop)". Known hash: `1818b67b0f5b`.

### 2. Film Strip Frame Rule
The film strip / analog photo frame overlay (white bordered rectangle with negative margin marks) is always `type: "decorative"`. Known hash: `5e1cd7a5e8f8`.

### 3. Tiny Artifact Rule
Any item with fileSize under 5KB and rendered dimensions under 70x70px is a layout artifact. Always `type: "decorative"` with description "Layout artifact (empty/near-blank element)".

### 4. Product Photo vs Reference Photo (CRITICAL)
This is the most common error. Read carefully:
- **`reference_photo`**: A lifestyle, editorial, or street-style photo where the PRIMARY content is a person in a complete scene/context (outdoors, seated in environment, fashion shoot with background). The clothes may not be individually shoppable; the image is there for styling inspiration.
- **Garment type (`top`/`bottom`/`dress`/`outerwear`/etc.)**: Even when a garment is shown ON a model, if the image is a clean product shot (white or neutral background, model posed to display the specific item, no scene context), classify by the GARMENT TYPE, not as `reference_photo`. The model is just part of the product presentation.
- **Rule of thumb**: If you could plausibly find this image on a product page of an online shop, it is NOT a `reference_photo` — classify by garment type.

### 5. Duplicate Detection
When two items share the same imageHash (visible in manifest-raw.json), flag the second occurrence in its description as "(duplicate of item-N, used as a second collage placement)". Both get the same type classification.

### 6. Shoe Heel Terminology
Be precise: kitten heel = ≤5cm, typically 3-4cm and very slender. Block heel, flared heel, sculptural heel, and curved heel are distinct shapes. Do not use "kitten" unless the heel is demonstrably short and thin.

### 7. Rotation 180 Items
Items with `rotation: 180` are mirrored/flipped copies of garments used for collage symmetry. Still classify by garment type, but note the rotation in the description (e.g., "shown flipped/mirrored in the collage layout").

### 8. Multi-Outfit Awareness
Each slide typically contains TWO distinct outfit directions (a Canva collage convention). Your description should acknowledge both outfit directions and how they relate to each other.

### 9. Recurring Accessories
These accessories appear across many looks — identify them consistently:
- Bering square-face gold watch (hash `3faf30a0dcf1`)
- Timex oval-face gold watch (hash `bf1da173417e`)
- Large thin gold hoop earrings (hash `4c5dd7d41f25`)

## Full Learnings History

See `scripts/learnings.md` for the complete grading history and pattern discoveries.

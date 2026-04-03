# Analysis Learnings

_This document accumulates patterns discovered during outfit analysis. It is updated after each batch by the grader agent. All analysts should read this before processing their batch._

## Batch 1 — Calibration (looks 3, 4, 5)

### Grades

| Look | Title | Item Count | Grade | Notes |
|------|-------|------------|-------|-------|
| look-3 | Fur & Chocolate | 24/24 | PASS | 1 misclassification: item-5 should be `top`, not `reference_photo` |
| look-4 | Cream & Cognac Days | 20/20 | NEEDS_REVISION | item-12 misclassified as `reference_photo` — it is a dress |
| look-5 | Noir & Cream Duality | 18/18 | PASS | Minor description error on item-13 heel type; otherwise strong |

---

### Patterns Discovered (consistent across all 3 looks)

1. **The chalkboard background is always item-0 or has imageHash `1818b67b0f5b`.**
   The 908KB JPEG dark chalkboard texture (imageHash `1818b67b0f5b`) appears in every look, always with `rotation: 90` and `contentType: image/jpeg`. It is the right-side background panel of the Canva slide. All three analyses correctly identified it as `decorative`. Rule: any `.jpg` item with `rotation: 90` and fileSize ~908KB is the chalkboard background panel — always `decorative`.

2. **The film strip frame is always the same asset (imageHash `5e1cd7a5e8f8`).**
   It appears in look-3 (item-21), look-4 (item-10), look-5 (item-9) — always tagged `decorative`. Rule: imageHash `5e1cd7a5e8f8` = film strip decorative frame overlay, always `decorative`.

3. **The Bering square-face watch (imageHash `3faf30a0dcf1`) and the Timex oval watch (imageHash `bf1da173417e`) are recurring across slides.**
   These are part of Melisa's core accessories and appear across many looks. Both were correctly identified in all three looks.

4. **The large thin gold hoop earrings (imageHash `4c5dd7d41f25`) recur frequently.**
   Appears in look-3 (item-9), look-4 (item-15), look-5 (item-7 and item-16). In look-5 they appear twice (item-7 and item-16 share the same hash), which the analyst correctly noted as a duplicate.

5. **Duplicate items placed twice in the collage have the same imageHash.**
   The analyst consistently and correctly identified duplicates (same hash = same asset). These should always be tagged as duplicates in the description. All three looks had at least one duplicate pair.

6. **The tiny blank/near-blank image (item-11 in look-4, 44×47px, 4568 bytes) is a layout artifact.**
   It has no visible content when rendered. The analyst correctly tagged it as `decorative` (layout artifact). Rule: any item with fileSize under ~5KB and dimensions under 70×70px is a layout artifact, always `decorative`.

7. **Titles are evocative and accurate.**
   "Fur & Chocolate", "Cream & Cognac Days", and "Noir & Cream Duality" all correctly capture the palette and mood of their respective looks. No revisions needed.

8. **Descriptions are multi-outfit aware.**
   Each look contains two distinct outfit directions (a Canva collage convention). The analyst correctly described both outfit directions in the summary description for look-4 and look-5. Look-3's description is slightly less explicit about two distinct looks but still accurate.

9. **Color palettes are accurate.**
   All three color palettes correctly represent the dominant tones of their respective looks.

10. **The `reference_photo` type is used for both street-style editorial shots AND product model shots on clean backgrounds.**
    This created inconsistency (see issues below). Need a clear definition.

---

### Common Issues Found

**Issue 1: Product-model shots misclassified as `reference_photo`.**
- look-3/item-5 (imageHash `2ce0393c6fe0`): A clean product shot of a model wearing a fitted chocolate brown boat-neck long-sleeve top on a white background. The analyst tagged it `reference_photo` with confidence 0.88. It should be `top`. The garment IS the product. The white background, product framing, and lack of scene context confirm this is a shoppable product photo, not an editorial/style reference.
- look-4/item-12 (imageHash `a0bb3177e0fc`): A model wearing a white strapless ruffled tiered mini dress on a white background. The analyst tagged it `reference_photo` with confidence 0.95. It should be `dress`. Same logic — clean product shot of an actual garment.
- Contrast with correct `reference_photo` usage: look-3/item-3 (woman in brown fur coat outdoors with flowers, real scene), look-3/item-4 (street style shot with shaggy fur coat), look-4/item-4 (blonde woman seated in editorial setting), look-5/item-1 (woman in fur pom-pom beanie in an outdoor context). These are genuine editorial/lifestyle/street references, not products.

**Issue 2: Minor description inaccuracy on look-5/item-13.**
- Described as "white leather open-toe kitten-heel mule sandals." The image clearly shows a flared curved heel that is approximately 6–7cm — definitively not a kitten heel (which is ≤5cm, typically 3–4cm). Should be described as "white leather square-toe open-toe mule with a curved flared mid-height heel."

**Issue 3: Inconsistent handling of model-on-white-background product shots.**
- look-4/item-5 (white boat-neck top shown on model, clean background) was correctly tagged `top`. But look-3/item-5 (same pattern — model on white bg wearing a garment) was tagged `reference_photo`. The rule needs to be made explicit.

---

### Specific Rules to Add to the Analyst Prompt

1. **Background panel rule:** Any `.jpg` item (not `.png`) with `rotation: 90` and fileSize around 900KB is the chalkboard background panel. Always classify as `type: "decorative"` with description "Chalkboard texture background panel (slide backdrop)".

2. **Film strip rule:** Any item matching the film strip frame appearance (white bordered rectangle with negative margin marks, no fashion content) is always `type: "decorative"`. imageHash `5e1cd7a5e8f8` is a confirmed film strip frame.

3. **Tiny artifact rule:** Any item with fileSize under 5KB and rendered dimensions under 70×70px is a layout artifact with no meaningful content. Always `type: "decorative"` with description "Layout artifact (empty/near-blank element)".

4. **Product photo vs reference photo distinction:**
   - `reference_photo`: A lifestyle, editorial, or street-style photo where the PRIMARY content is a person in a complete scene/context (outdoors, seated in environment, fashion shoot with background). The clothes may not be individually shoppable; the image is there for styling inspiration.
   - `top` / `bottom` / `dress` / `outerwear` / etc.: Even when a garment is shown ON a model, if the image is a clean product shot (white or neutral background, model posed to display the specific item, no scene context), classify the image by the GARMENT TYPE, not as `reference_photo`. The model is just part of the product presentation.
   - When in doubt: if you could plausibly find this image on a product page of an online shop, it is NOT a `reference_photo` — classify by garment type.

5. **Duplicate detection:** When two items share the same imageHash, always flag the second occurrence in its description as "(duplicate of item-N, used as a second collage placement)". The first occurrence gets the primary classification; the duplicate gets the same type.

6. **Shoe heel terminology:** Be precise about heel height. Kitten heel = ≤5cm, typically 3–4cm and very slender. Block heel, flared heel, and sculptural heel are distinct shapes. Do not use "kitten" unless the heel is demonstrably short and thin.

7. **`rotation: 180` items** are mirrored/flipped copies of garments used for collage symmetry. Still classify by garment type, but note the rotation in the description (e.g., "shown flipped/mirrored in the collage layout").

---

### Items Needing Correction

| Look | Item | Current Type | Correct Type | Correct Description |
|------|------|-------------|-------------|---------------------|
| look-3 | item-5 | reference_photo | top | Fitted chocolate brown long-sleeve boat-neck top, product shot on white background |
| look-4 | item-12 | reference_photo | dress | White strapless ruffled tiered mini dress, product shot on white background |
| look-5 | item-13 | shoes (description error) | shoes | White leather square-toe open-toe mule with a curved flared mid-height heel (~6cm) |

---

---

## Batch 2 — Grading (looks 6, 7, 8, 9, 10, 11, 12)

### Grades

| Look | Title | Item Count | Grade | Notes |
|------|-------|------------|-------|-------|
| look-6 | Chocolate & Cream Layers | 24/24 | PASS | Clean. All Batch 1 rules followed correctly. Duplicates flagged, recurring accessories named, chalkboard/film strip correctly tagged. |
| look-7 | Equestrian Daydream | 17/17 | PASS | Strong. Mirror selfie correctly reference_photo. Film strip correctly decorative. All product shots correctly classified by garment type. |
| look-8 | Soft White & Black Edge | 21/21 | NEEDS_REVISION | Items 16-18 have wrong type classifications due to a file-to-description mapping shift. item-16 is white ruffle shorts (not a bag), item-17 is a tote bag (not a reference_photo mirror selfie), item-18 is the actual mirror selfie (not sunglasses). Also item-2 (model in scarf on white bg) classified as reference_photo — borderline, but defensible as it appears inside the film strip frame context. |
| look-9 | Denim & Camel Afternoon | 21/21 | NEEDS_REVISION | item-20 (leopard print luggage tag product) classified as decorative with an inaccurate description ("swatch/tag"). The image is a product luggage tag, not a pattern swatch — should be `accessory`. item-0 (woman in blue shirt/white skirt cut-out, white background, confidence 0.88) classified as reference_photo — this is borderline; the cut-out poses as a complete styled look reference which is acceptable. |
| look-10 | Autumn Layers, Two Ways | 18/18 | PASS | Both reference_photo items confirmed correct (cut-out of styled person and mirror selfie). Recurring accessories correctly identified. All Batch 1 rules followed. |
| look-11 | Moto & Mini | 20/20 | PASS | Excellent. White strapless ruffled mini dress correctly classified as `dress` (not reference_photo — this was the Batch 1 correction that was applied correctly here). Street style shot correctly reference_photo. All rules followed. |
| look-12 | Blush & Burgundy | 23/23 | PASS | Both fashion illustration references correctly classified as reference_photo. Duplicate hoops and watch correctly flagged. Low-confidence item-14 (nude micro skirt, 0.82) correctly classified as `bottom`. |

---

### Patterns Discovered (Batch 2)

1. **Item mapping shift error.** look-8 items 16-18 are misaligned — the analyst described the wrong image for each file. The actual images and the JSON descriptions are offset by 2 positions. This is a systematic write error, not a classification error per se. Likely caused by reading items out of order or writing to the wrong index during analysis. Rule: always verify that the file listed in the `"file"` field actually matches the described content before writing the JSON.

2. **Luggage tag as accessory, not decorative.** look-9 item-20 is a branded leopard-print luggage tag product shot (leather tag with buckle strap, full product on white background). It is not a decorative pattern swatch. Physical product objects with straps and hardware should be classified as `accessory`, not `decorative`. Rule: `decorative` applies to UI elements, layout artifacts, and overlay frames — not to physical product objects that happen to be small or patterned.

3. **The Batch 1 product-photo-vs-reference-photo rule was applied correctly in all other looks.** Specifically: look-11 correctly classified the white strapless ruffled tiered mini dress (imageHash that recurred from look-4/item-12) as `dress`, not `reference_photo`. This confirms the correction from Batch 1 was absorbed.

4. **Model-on-white-background editorial cut-outs (full body, styled look, white background, no scene) remain borderline.** look-9 item-0 (brunette woman in blue shirt/white skirt, clean white background, full body pose) was given confidence 0.88 for reference_photo. The Batch 1 rule says "if you could plausibly find this image on a product page, classify by garment type." However, this image is a full styled look (shirt + skirt + accessories as a unit), not a single-garment product shot, so reference_photo is defensible. The rule should add: if the cut-out shows a complete multi-garment outfit as a single image (not isolating one piece), reference_photo is appropriate.

5. **Fashion illustrations used as reference photos are correctly classified as reference_photo.** look-12 items 4 and 15 are fashion illustration artworks showing styled outfits — correctly tagged reference_photo. look-9 item-11 (fashion illustration of a girl with a coffee cup) is also correctly classified as reference_photo. Illustrations of styled people count as reference_photo regardless of medium.

6. **Recurring asset cross-look tracking is strong.** The analyst correctly noted cross-look recurrences (e.g., look-8 item-11 noting it also appears in look-6 and look-7, look-10 item-17 noting it's the same asset as look-9 item-6). This cross-look awareness is good practice and should be continued.

---

### Items Needing Correction

| Look | Item | Current Type | Correct Type | Correct Description |
|------|------|-------------|-------------|---------------------|
| look-8 | item-16 | bag | bottom | White cotton ruffle-hem mini shorts with elasticated frill waistband and button-front placket, product shot on white background |
| look-8 | item-17 | reference_photo | bag | Camel/tan suede-look drawstring tote bag with twin shoulder straps and center cinch tie, product shot on white background |
| look-8 | item-18 | accessory | reference_photo | Personal mirror selfie — person wearing white sheer baby-doll cami over white ruffle shorts with tan/cognac studded ankle boots, styled reference |
| look-9 | item-20 | decorative | accessory | Leopard print leather luggage tag with buckle strap closure, product shot on white background — references the Miu Miu bag's interior print |

---

### Batch 1 Rules: Compliance Review

| Rule | Compliance |
|------|-----------|
| Background panel (chalkboard, rotation 90) | FOLLOWED — all looks correctly tag item-0.jpg or item-1.jpg as decorative |
| Film strip frame (hash 5e1cd7a5e8f8) | FOLLOWED — all looks correctly tag film strip as decorative |
| Tiny artifact rule (<5KB, <70px) | N/A — no tiny artifacts found in batch 2 |
| Product photo vs reference photo | MOSTLY FOLLOWED — look-11 correctly fixed Batch 1 error; look-8 item-2 borderline but defensible; look-8 items 16-18 have a mapping error (not a classification rule error) |
| Duplicate detection | FOLLOWED — all duplicates correctly flagged with "duplicate of item-N" language |
| Shoe heel terminology | FOLLOWED — no kitten heel misuse detected |
| Rotation 180 items | FOLLOWED — look-6 items 7 and 15 correctly noted as flipped/mirrored |
| Multi-outfit awareness | FOLLOWED — all descriptions explicitly describe two outfit directions |
| Recurring accessories | FOLLOWED — Bering watch, Timex watch, and large thin gold hoops all correctly identified with hashes |

---

## Batch 0 — Pre-Analysis (from extraction data)

- Slide dimensions: 1920x1080 (16:9 landscape)
- Items with `rotation: 90` are typically the reference photo panel on the right side of the slide
- Items with `rotation: 180` are mirrored copies of garments (Canva design technique)
- Items smaller than 60x60px are almost certainly decorative icons (hangers, tags)
- The same 908KB JPEG (background photo) appears across many slides
- Panel colors extracted from GROUP shapes: typically #EAC4B1, #CBA078, #FFF1E5
- Items with negative left/top values bleed off the slide edge intentionally
- Canva uses FREEFORM shapes with blip fills (not standard picture shapes)

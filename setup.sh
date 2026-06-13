#!/bin/bash
# ─────────────────────────────────────────────────────────────
# The Tom Effect — image setup script
# Run this once from the the-tom-effect folder:
#   chmod +x setup.sh && ./setup.sh
#
# What it does:
#   1. Creates the images/portfolio folder
#   2. Copies the logo and favicon into images/
#   3. Copies and renames all 20 portfolio photos to 01.jpg–20.jpg
# ─────────────────────────────────────────────────────────────

SRC=~/Documents/toms\ images\ for\ webby
DEST=images/portfolio

echo "Creating folders..."
mkdir -p "$DEST"

echo "Copying logo and favicon..."
cp "$SRC/tte-logo.PNG"  images/tte-logo.PNG
cp "$SRC/favicon.PNG"   images/favicon.PNG

echo "Copying and renaming portfolio images..."
cp "$SRC/24HNBR2026-10.jpg"                  "$DEST/01.jpg"
cp "$SRC/24HNBR2026-7.jpg"                   "$DEST/02.jpg"
cp "$SRC/both-cars-landscape.JPEG"           "$DEST/03.jpg"
cp "$SRC/EVOXSTI-2.jpg"                      "$DEST/04.jpg"
cp "$SRC/EVOXSTIUNI-4.jpg"                   "$DEST/05.jpg"
cp "$SRC/green-porsche-portrait.JPEG"        "$DEST/06.jpg"
cp "$SRC/moulin-rouge-porsche-portrait.JPEG" "$DEST/07.jpg"
cp "$SRC/grey-merc-portrait.JPEG"            "$DEST/08.jpg"
cp "$SRC/purple-porsche-landscape.JPG"       "$DEST/09.jpg"
cp "$SRC/rwb-landscape.JPEG"                 "$DEST/10.jpg"
cp "$SRC/sakura-suburu-landscape.JPG"        "$DEST/11.jpg"
cp "$SRC/skye-mountain-landscape.JPG"        "$DEST/12.jpg"
cp "$SRC/TEDOANDAS-1.jpg"                    "$DEST/13.jpg"
cp "$SRC/WEBSITE -1.jpg"                     "$DEST/14.jpg"
cp "$SRC/WEBSITE -1-2.jpg"                   "$DEST/15.jpg"
cp "$SRC/WEBSITE -1-3.jpg"                   "$DEST/16.jpg"
cp "$SRC/WEBSITE -1-4.jpg"                   "$DEST/17.jpg"
cp "$SRC/WHIPSNADE-2-2.jpg"                  "$DEST/18.jpg"
cp "$SRC/white-porsche-landscape.JPG"        "$DEST/19.jpg"
cp "$SRC/zoom-porsche-landscape.JPG"         "$DEST/20.jpg"

echo ""
echo "✓ Done. Your images/portfolio folder now has 01.jpg through 20.jpg."
echo "  Open index.html in a browser to check everything looks right."

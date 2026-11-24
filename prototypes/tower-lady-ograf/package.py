#!/usr/bin/env python3
"""Package an OGraf logo or complete intro with its local resources and soundtrack."""

import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


source = Path(__file__).resolve().parent
repository = source.parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument("--variant", choices=["logo", "intro"], default="logo")
parser.add_argument(
    "--output",
    type=Path,
    help="Output ZIP path (defaults to the selected variant in the ignored preview downloads folder).",
)
arguments = parser.parse_args()
intro = arguments.variant == "intro"
archive_name = "tower-lady-intro-ograf.zip" if intro else "tower-lady-animated-logo-ograf.zip"
output = arguments.output or repository / "prototypes/tower-lady/astro/downloads" / archive_name
files = [
    "tower-lady-intro.ograf.json" if intro else "tower-lady.ograf.json",
    "graphic.mjs",
    "wind.mjs",
    "assets/brand-artwork.webp",
    "audio/tower-queen.wav",
    "README.md",
]
if intro:
    files.extend(["intro.mjs", "assets/inter.woff2", "assets/inter-ofl.txt"])
output.parent.mkdir(parents=True, exist_ok=True)
folder = "Tower-Lady-Complete-Intro" if intro else "Tower-Lady-Animated-Logo"
with ZipFile(output, "w", ZIP_DEFLATED) as archive:
    for name in files:
        archive.write(source / name, f"{folder}/{name}")
print(output.resolve())

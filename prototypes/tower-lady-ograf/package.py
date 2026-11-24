#!/usr/bin/env python3
"""Package the OGraf logo and soundtrack using only the Python standard library."""

import argparse
from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


source = Path(__file__).resolve().parent
repository = source.parents[1]
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument(
    "--output",
    type=Path,
    default=repository / "prototypes/tower-lady/astro/downloads/tower-lady-animated-logo-ograf.zip",
    help="Output ZIP path (defaults to the ignored Tailscale preview downloads folder).",
)
arguments = parser.parse_args()
files = [
    "tower-lady.ograf.json",
    "graphic.mjs",
    "wind.mjs",
    "assets/brand-artwork.webp",
    "audio/tower-queen.wav",
    "README.md",
]
arguments.output.parent.mkdir(parents=True, exist_ok=True)
with ZipFile(arguments.output, "w", ZIP_DEFLATED) as archive:
    for name in files:
        archive.write(source / name, f"Tower-Lady-Animated-Logo/{name}")
print(arguments.output.resolve())

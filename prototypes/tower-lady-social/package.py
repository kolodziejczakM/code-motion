#!/usr/bin/env python3
"""Bundle the four Facebook/YouTube PNGs for each social branding proposal."""

from pathlib import Path
from zipfile import ZIP_DEFLATED, ZipFile


source = Path(__file__).resolve().parent
exports = source / "exports"
for variant in ("A", "B", "C"):
    files = {
        "facebook-avatar.png": exports / "common/facebook-avatar.png",
        "youtube-avatar.png": exports / "common/youtube-avatar.png",
        "facebook-cover.png": exports / variant / "facebook-cover.png",
        "youtube-banner.png": exports / variant / "youtube-banner.png",
        "README.md": source / "README.md",
    }
    destination = exports / f"tower-lady-social-{variant}.zip"
    with ZipFile(destination, "w", ZIP_DEFLATED) as archive:
        for name, path in files.items():
            archive.write(path, f"Tower-Lady-Social-{variant}/{name}")
    print(destination)

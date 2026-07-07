#!/usr/bin/env python3
"""Upload large image assets to Cloudflare R2.

Usage:
    python scripts/upload-to-r2.py gallery        # dist-gallery-thumbnails/images/gallery-thumbnails
    python scripts/upload-to-r2.py members        # src/image
    python scripts/upload-to-r2.py all            # both
"""
import sys
import mimetypes
from pathlib import Path

import boto3
from botocore.config import Config

R2_ENDPOINT = "https://033b31d195ca339dcd4709b1a54b1bbf.r2.cloudflarestorage.com"
R2_ACCESS_KEY_ID = "e5b80825dfa4596a4f22f828a87cf05c"
R2_SECRET_ACCESS_KEY = "1db559fb193864fbf667761a155a394b03425762ef89476faff51b9c35002ca5"
R2_BUCKET = "docs"

IMAGE_EXTS = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp"}

s3 = boto3.client(
    "s3",
    endpoint_url=R2_ENDPOINT,
    aws_access_key_id=R2_ACCESS_KEY_ID,
    aws_secret_access_key=R2_SECRET_ACCESS_KEY,
    region_name="auto",
    config=Config(signature_version="s3v4"),
)


def collect_files(local_dir: Path):
    for p in local_dir.rglob("*"):
        if p.is_file() and p.suffix.lower() in IMAGE_EXTS:
            yield p


def list_existing(prefix: str):
    keys = set()
    resp = s3.list_objects_v2(Bucket=R2_BUCKET, Prefix=prefix)
    keys.update(obj["Key"] for obj in resp.get("Contents", []))
    while resp.get("IsTruncated"):
        resp = s3.list_objects_v2(
            Bucket=R2_BUCKET,
            Prefix=prefix,
            ContinuationToken=resp["NextContinuationToken"],
        )
        keys.update(obj["Key"] for obj in resp.get("Contents", []))
    return keys


def upload(local_dir: Path, r2_prefix: str):
    existing = list_existing(r2_prefix)
    uploaded = 0
    skipped = 0
    total_bytes = 0

    for p in collect_files(local_dir):
        rel = p.relative_to(local_dir).as_posix()
        key = f"{r2_prefix}{rel}"

        if key in existing:
            print(f"[skip] {key}")
            skipped += 1
            continue

        content_type, _ = mimetypes.guess_type(str(p))
        if not content_type:
            content_type = "application/octet-stream"

        size_mb = p.stat().st_size / 1024 / 1024
        print(f"[upload] {key} ({size_mb:.2f} MB)")
        s3.upload_file(str(p), R2_BUCKET, key, ExtraArgs={"ContentType": content_type})
        uploaded += 1
        total_bytes += p.stat().st_size

    print(
        f"\nDone: uploaded {uploaded}, skipped {skipped}, "
        f"total {(total_bytes / 1024 / 1024):.2f} MB"
    )


def main():
    target = sys.argv[1] if len(sys.argv) > 1 else "all"
    root = Path(__file__).resolve().parent.parent

    if target in ("gallery", "all"):
        gallery_dir = root / "dist-gallery-thumbnails" / "images" / "gallery-thumbnails"
        print("Uploading gallery thumbnails...")
        upload(gallery_dir, "images/gallery-thumbnails/")

    if target in ("members", "all"):
        members_dir = root / "src" / "image"
        print("\nUploading member photos...")
        upload(members_dir, "images/src/image/")


if __name__ == "__main__":
    main()

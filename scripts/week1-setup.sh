#!/bin/bash
# Week 1 setup: Copies src/ into student home
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC_DIR="$REPO_ROOT/full-stack-ecommerce/src"
TARGET_DIR="$HOME/jataka-week1"

mkdir -p "$TARGET_DIR"
cp -R "$SRC_DIR" "$TARGET_DIR/"

echo "Week 1 setup complete: src copied to $TARGET_DIR/src"

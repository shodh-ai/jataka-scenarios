#!/bin/bash
# Main orchestrator script for Jataka scenarios
set -e

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

case "$1" in
  week1)
    bash "$REPO_ROOT/scripts/week1-setup.sh"
    ;;
  week2)
    bash "$REPO_ROOT/scripts/week2-git-conflict.sh"
    ;;
  *)
    echo "Usage: $0 {week1|week2}"
    exit 1
    ;;
 esac

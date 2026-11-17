#!/bin/zsh
# Rebuilds Cobalt2.terminal from the upstream iTerm2 color scheme by Wes Bos.
set -euo pipefail

cd "${0:A:h}"
UPSTREAM="https://raw.githubusercontent.com/wesbos/Cobalt2-iterm/master/cobalt2.itermcolors"
FONT="${FONT:-InconsolataForPowerline-dz}"
SIZE="${SIZE:-14}"

tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

curl -fsSL "$UPSTREAM" -o "$tmp/cobalt2.itermcolors"
osascript -l JavaScript scripts/itermcolors2terminal.js \
  "$tmp/cobalt2.itermcolors" "$PWD/Cobalt2.terminal" Cobalt2 "$FONT" "$SIZE"
plutil -lint Cobalt2.terminal

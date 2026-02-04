#!/bin/sh
set -e

# Write a small runtime config JS that the app can read. This avoids sed escaping issues.
OUT=/usr/share/nginx/html/env-config.js
V="${VITE_IMAGE_DEFACE_ENDPOINT:-}"

cat > "$OUT" <<EOF
window.__env = {
  VITE_IMAGE_DEFACE_ENDPOINT: "$V"
}
EOF

exec nginx -g 'daemon off;'

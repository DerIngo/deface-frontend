#!/bin/sh
set -e

# Replace placeholder in env-config.js with actual environment variable values (if present)
if [ -f /usr/share/nginx/html/env-config.js ]; then
  V="${VITE_IMAGE_DEFACE_ENDPOINT:-}"
  # Use | as sed delimiter to avoid escaping slashes in URLs
  sed -i "s|%%VITE_IMAGE_DEFACE_ENDPOINT%%|${V}|g" /usr/share/nginx/html/env-config.js
fi

exec nginx -g 'daemon off;'

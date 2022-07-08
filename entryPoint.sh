#!/bin/bash
set -xe
: "${VITE_BACKEND_API?Need an backend API}"

set -xe
: "${VITE_AUTH_URL?Need an auth URL}"

set -xe
: "${VITE_AUTH_BASE_URL?Need an auth base URL}"

set -xe
: "${VITE_COOKIE_DOMAIN?Need an cookie domain}"

set -xe
: "${VITE_CDN_URL?Need an cdn url}"

for file in /usr/share/nginx/html/assets/*;
do
  sed -i "s|VITE_BACKEND_API_REPLACE|$VITE_BACKEND_API|g" $file
  sed -i "s|VITE_AUTH_URL_REPLACE|$VITE_AUTH_URL|g" $file
  sed -i "s|VITE_AUTH_BASE_URL_REPLACE|$VITE_AUTH_BASE_URL|g" $file
  sed -i "s|VITE_COOKIE_DOMAIN_REPLACE|$VITE_COOKIE_DOMAIN|g" $file
  sed -i "s|VITE_CDN_URL_REPLACE|$VITE_CDN_URL|g" $file
done

exec "$@"

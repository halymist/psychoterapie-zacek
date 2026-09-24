#!/usr/bin/env bash
set -euo pipefail

project_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
output_dir="$project_root/dist"

rm -rf "$output_dir"
mkdir -p "$output_dir"

cp "$project_root/index.html" "$output_dir/"
cp "$project_root/style.css" "$output_dir/"
cp "$project_root/motion.js" "$output_dir/"
cp "$project_root/navigation.js" "$output_dir/"
cp "$project_root/approaches.js" "$output_dir/"
cp "$project_root/scrollbar.js" "$output_dir/"
cp "$project_root/sitemap.xml" "$output_dir/"
cp "$project_root/site.webmanifest" "$output_dir/"
cp "$project_root/apple-touch-icon.png" "$output_dir/"
cp "$project_root/favicon-96x96.png" "$output_dir/"
cp "$project_root/favicon.ico" "$output_dir/"
cp "$project_root/favicon.png" "$output_dir/"
cp "$project_root/favicon.svg" "$output_dir/"
cp "$project_root/web-app-manifest-192x192.png" "$output_dir/"
cp "$project_root/web-app-manifest-512x512.png" "$output_dir/"
cp -R "$project_root/assets" "$output_dir/assets"

stylesheet_version="$(sha256sum "$output_dir/style.css" | cut -c1-12)"
sed -i "s|href=\"style.css\"|href=\"style.css?v=$stylesheet_version\"|" "$output_dir/index.html"

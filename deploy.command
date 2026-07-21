#!/bin/bash
cd "$(dirname "$0")"
echo "Building and deploying brand book..."
npm run deploy
echo ""
echo "Done! Refresh your GitHub Pages site in about 60 seconds."
read -p "Press Enter to close..."

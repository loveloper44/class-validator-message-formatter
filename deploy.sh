#!/usr/bin/env bash

NEW_VERSION=$1 

if [ -z "$NEW_VERSION" ]; then
    echo "new version is required [major, minor, patch, ...]"
    exit 1
fi

npm run build

npm version $NEW_VERSION

npm run deploy
#!/usr/bin/env bash

set -e

env=${NODE_ENV:-production}

if [ "$env" == "production" ]; then
    echo "Building for production..."
    npm run build --debug
    npm run start
else
    npm run dev
fi


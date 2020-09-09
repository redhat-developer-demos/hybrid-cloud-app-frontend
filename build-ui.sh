#!/bin/bash

set -e

rm -rf src/main/resources/META-INF/resources/*

cd ui
npm run build
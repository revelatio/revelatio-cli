#!/bin/bash

echo "=> Transpiling 'src' into ES5 ..."
echo ""
rm -rf ./dist
NODE_ENV=production ./node_modules/.bin/babel --plugins "transform-runtime" ./src --out-dir ./dist
echo ""
echo "=> Transpiling completed."

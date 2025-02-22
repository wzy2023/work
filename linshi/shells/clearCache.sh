#!/bin/sh

# 清理 npm 缓存
echo "清理 npm 缓存..."
npm cache clean --force

# 清理 yarn 缓存
echo "清理 yarn 缓存..."
yarn cache clean

# 清理 pnpm 缓存
echo "清理 pnpm 缓存..."
pnpm store prune

# 清理 Docker 缓存
echo "清理 Docker 缓存..."
docker system prune -af --volumes

# 清理 Homebrew 缓存
echo "清理 Homebrew 缓存..."
brew cleanup -s
rm -rf "$(brew --cache)"

# 清理 .cache 目录
#echo "清理 .cache 目录..."
rm -rf ~/.cache/*

echo "缓存清理完成！"

#!/bin/bash

# 停止并删除现有的 lobe-chat 容器
echo "停止 lobe-chat 容器..."
docker stop lobe-chat 2>/dev/null

echo "删除 lobe-chat 容器..."
docker rm lobe-chat 2>/dev/null

# 拉取最新的 lobe-chat 镜像
echo "拉取最新的 lobe-chat 镜像..."
docker pull lobehub/lobe-chat

# 启动新的 lobe-chat 容器
echo "启动新的 lobe-chat 容器..."
docker run -d --name lobe-chat \
              -p 3210:3210 \
              lobehub/lobe-chat

echo "lobe-chat 容器已成功更新并启动！"

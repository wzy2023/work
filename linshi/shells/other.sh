#!/bin/bash

# 启动 OpenWebui 容器
docker run -d --name open-webui \
              -p 3000:8080 \
              -v open-webui:/app/backend/data \
              --restart always \
              ghcr.io/open-webui/open-webui:main


# 创建网络
docker network create --driver bridge mysql-network


# 启动 MySQL 容器
docker run -d --name mysql \
           --network mysql-network \
           -p 3306:3306 \
           -e MYSQL_ROOT_PASSWORD=root \
           --restart always \
           mysql:latest


# 启动 phpMyAdmin 容器
docker run -d --name phpmyadmin \
           --network mysql-network \
           -p 8080:80 \
           -e PMA_HOST=mysql \
           -e MYSQL_ROOT_PASSWORD=root \
           --restart always \
           phpmyadmin:latest


# 启动 redis 容器
#docker run -d --name \
#              -p 6379:6379 redis \
#              redis

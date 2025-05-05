#!/bin/bash

echo "=== 备份开始: $(date) ==="

DOCKER_CMD="/usr/local/bin/docker"

MYSQL_CONTAINER="mysql"
DB_USER="root"
DB_PASSWORD="root"
DB_NAME="t3"

CONTAINER_BACKUP_PATH="/tmp/backup"
HOST_BACKUP_DIR="/Users/wangzhenyu/同步空间/5.其它/mysql_data"
KEEP_DAYS=7
TODAY=$(date +"%Y-%m-%d")
TIME=$(date +"%H-%M-%S")
ARCHIVE_NAME="${DB_NAME}_backup_${TODAY}_${TIME}.sql"

# ===== 执行备份 =====
mkdir -p "$HOST_BACKUP_DIR"
$DOCKER_CMD exec "$MYSQL_CONTAINER" mkdir -p "$CONTAINER_BACKUP_PATH"

# 使用绝对路径调用 mysqldump
$DOCKER_CMD exec "$MYSQL_CONTAINER" sh -c "/usr/bin/mysqldump -u $DB_USER -p$DB_PASSWORD $DB_NAME > $CONTAINER_BACKUP_PATH/$ARCHIVE_NAME"

# 复制备份文件到宿主机
$DOCKER_CMD cp "$MYSQL_CONTAINER:$CONTAINER_BACKUP_PATH/$ARCHIVE_NAME" "$HOST_BACKUP_DIR/$ARCHIVE_NAME"

# 清理容器内的临时文件
$DOCKER_CMD exec "$MYSQL_CONTAINER" rm -f "$CONTAINER_BACKUP_PATH/$ARCHIVE_NAME"

# 清理宿主机旧备份
find "$HOST_BACKUP_DIR" -type f -name "${DB_NAME}_backup_*.sql" -mtime +$KEEP_DAYS -exec rm -f {} \;

echo "=== 备份完成 '${DB_NAME}' ==="

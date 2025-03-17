#!/bin/sh

# 计算目录大小函数（返回KB数值）
calculate_size() {
    if [ -d "$1" ]; then
        du -sk "$1" 2>/dev/null | awk '{print $1}'
    else
        echo 0
    fi
}

# 单位转换函数
format_size() {
    # 确保输入有效（处理空值和非数字情况）
    size_kb=$(printf "%s" "$1" | tr -cd '0-9')  # 去除非数字字符
    size_kb=${size_kb:-0}  # 空值设为0

    # 添加调试信息（可选）
    # echo "[DEBUG] 输入值: $1 → 处理后: ${size_kb}KB" >&2

    if [ $size_kb -ge 1048576 ]; then
        printf "%.2f GB" $(echo "$size_kb / 1048576" | bc -l)
    elif [ $size_kb -ge 1024 ]; then
        printf "%.2f MB" $(echo "$size_kb / 1024" | bc -l)
    else
        printf "%d KB" $size_kb
    fi
}

# 初始化统计变量
total_before=0
total_after=0

echo "正在扫描系统缓存..."
echo "================================"

# 获取各缓存路径
npm_cache="$(npm config get cache 2>/dev/null)/_cacache"
yarn_cache=$(yarn cache dir 2>/dev/null)
pnpm_store=$(pnpm store path 2>/dev/null)
bun_cache=~/.bun/install/cache
homebrew_cache=$(brew --cache 2>/dev/null)
user_cache=~/.cache
docker_dir=/var/lib/docker

# 计算并显示各组件缓存大小
echo "[npm] 缓存路径: $npm_cache"
npm_before=$(calculate_size "$npm_cache")
echo "    ➤ 占用空间: $(format_size $npm_before)"
total_before=$((total_before + npm_before))

echo "[yarn] 缓存路径: $yarn_cache"
yarn_before=$(calculate_size "$yarn_cache")
echo "    ➤ 占用空间: $(format_size $yarn_before)"
total_before=$((total_before + yarn_before))

echo "[pnpm] 存储路径: $pnpm_store"
pnpm_before=$(calculate_size "$pnpm_store")
echo "    ➤ 占用空间: $(format_size $pnpm_before)"
total_before=$((total_before + pnpm_before))

echo "[bun] 缓存路径: $bun_cache"
bun_before=$(calculate_size "$bun_cache")
echo "    ➤ 占用空间: $(format_size $bun_before)"
total_before=$((total_before + bun_before))

echo "[Homebrew] 缓存路径: $homebrew_cache"
homebrew_before=$(calculate_size "$homebrew_cache")
echo "    ➤ 占用空间: $(format_size $homebrew_before)"
total_before=$((total_before + homebrew_before))

echo "[用户缓存] 路径: $user_cache"
user_cache_before=$(calculate_size "$user_cache")
echo "    ➤ 占用空间: $(format_size $user_cache_before)"
total_before=$((total_before + user_cache_before))

echo "[Docker] 数据路径: $docker_dir"
docker_before=$(sudo du -sk "$docker_dir" 2>/dev/null | awk '{print $1}')
docker_before=${docker_before:-0}
echo "    ➤ 占用空间: $(format_size $docker_before)"
total_before=$((total_before + docker_before))

echo "================================"
echo "即将清理以上缓存，总计占用: $(format_size $total_before)"
read -p "按 Enter 开始清理，或 Ctrl+C 取消..."

echo
echo "开始清理缓存..."
echo "--------------------------------"

# 清理 npm 缓存
echo "清理 npm 缓存..."
npm cache clean --force

# 清理 yarn 缓存
echo "清理 yarn 缓存..."
yarn cache clean

# 清理 pnpm 缓存
echo "清理 pnpm 缓存..."
pnpm store prune

# 清理 bun 缓存
echo "清理 bun 缓存..."
rm -rf ~/.bun/install/cache

# 清理 Docker 缓存
echo "清理 Docker 缓存..."
docker system prune -af --volumes
docker builder prune -af

# 清理 Homebrew 缓存
#echo "清理 Homebrew 缓存..."
#brew cleanup -s
#brew autoremove
#rm -rf "$(brew --cache)"

# 清理 .cache 目录
echo "清理 .cache 目录..."
rm -rf ~/.cache/*

# 清理系统日志
sudo journalctl --vacuum-time=1d
rm -rf /var/log/*.gz /var/log/*.old

echo "--------------------------------"
echo "缓存清理完成！"
echo "正在计算清理后的缓存大小..."

# 计算各组件清理后大小
npm_after=$(calculate_size "$npm_cache")
total_after=$((total_after + npm_after))

yarn_after=$(calculate_size "$yarn_cache")
total_after=$((total_after + yarn_after))

pnpm_after=$(calculate_size "$pnpm_store")
total_after=$((total_after + pnpm_after))

bun_after=$(calculate_size "$bun_cache")
total_after=$((total_after + bun_after))

homebrew_after=$(calculate_size "$homebrew_cache")
total_after=$((total_after + homebrew_after))

user_cache_after=$(calculate_size "$user_cache")
total_after=$((total_after + user_cache_after))

docker_after=$(sudo du -sk "$docker_dir" 2>/dev/null | awk '{print $1}')
docker_after=${docker_after:-0}
total_after=$((total_after + docker_after))

# 计算差值
total_cleaned=$((total_before - total_after))

echo "================================"
echo "清理报告："
echo "➤ 清理前占用: $(format_size $total_before)"
echo "➤ 清理后占用: $(format_size $total_after)"
echo "➤ 释放空间: $(format_size $total_cleaned)"
echo "================================"

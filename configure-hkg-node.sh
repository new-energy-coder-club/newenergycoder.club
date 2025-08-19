#!/bin/bash

# Energy Coder Club Website - 香港节点配置脚本
# 基于 CloudflareSpeedTest 测试结果配置最优IP

echo "=== Energy Coder Club Website 香港节点配置 ==="
echo

# 最优IP地址（基于测试结果）
OPTIMAL_IP="104.20.31.232"
DOMAIN="7d2196df.energy-coder-club-website.pages.dev"
PRODUCTION_DOMAIN="energy-coder-club-website.pages.dev"

echo "最优IP地址: $OPTIMAL_IP"
echo "部署域名: $DOMAIN"
echo "生产域名: $PRODUCTION_DOMAIN"
echo

# 检查是否需要sudo权限
if [ "$EUID" -ne 0 ]; then
    echo "注意: 修改 /etc/hosts 需要管理员权限"
    echo "请使用: sudo $0"
    echo
fi

echo "=== 当前网站访问测试 ==="
echo "测试部署域名访问速度..."
time curl -s -o /dev/null -w "HTTP状态: %{http_code}, 总时间: %{time_total}s, DNS解析: %{time_namelookup}s\n" "https://$DOMAIN"

echo
echo "测试生产域名访问速度..."
time curl -s -o /dev/null -w "HTTP状态: %{http_code}, 总时间: %{time_total}s, DNS解析: %{time_namelookup}s\n" "https://$PRODUCTION_DOMAIN"

echo
echo "=== 配置建议 ==="
echo "1. 手动配置 hosts 文件:"
echo "   echo '$OPTIMAL_IP $DOMAIN' | sudo tee -a /etc/hosts"
echo "   echo '$OPTIMAL_IP $PRODUCTION_DOMAIN' | sudo tee -a /etc/hosts"
echo
echo "2. 验证配置:"
echo "   ping -c 3 $DOMAIN"
echo "   curl -I https://$DOMAIN"
echo
echo "3. 恢复默认配置:"
echo "   sudo sed -i '' '/$DOMAIN/d' /etc/hosts"
echo "   sudo sed -i '' '/$PRODUCTION_DOMAIN/d' /etc/hosts"
echo

# 显示当前hosts文件中的相关配置
echo "=== 当前 hosts 配置 ==="
if grep -q "$DOMAIN\|$PRODUCTION_DOMAIN" /etc/hosts 2>/dev/null; then
    echo "发现现有配置:"
    grep "$DOMAIN\|$PRODUCTION_DOMAIN" /etc/hosts
else
    echo "未发现相关配置"
fi

echo
echo "=== CloudflareSpeedTest 结果摘要 ==="
echo "最优IP: $OPTIMAL_IP (香港节点)"
echo "下载速度: 3.98 MB/s"
echo "平均延迟: 较低"
echo "丢包率: 0.00%"
echo
echo "配置完成后，网站访问将通过香港节点，提升访问速度。"
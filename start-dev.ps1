# Energy Coder Club Website - 开发环境启动脚本
# 此脚本将检查环境并启动开发服务器

Write-Host "=== Energy Coder Club Website 开发环境启动 ===" -ForegroundColor Green
Write-Host ""

# 检查 Node.js
Write-Host "检查 Node.js 安装..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✓ Node.js 已安装: $nodeVersion" -ForegroundColor Green
    } else {
        throw "Node.js 未找到"
    }
} catch {
    Write-Host "✗ Node.js 未安装或未在 PATH 中" -ForegroundColor Red
    Write-Host "请按照 SETUP_GUIDE.md 中的说明安装 Node.js" -ForegroundColor Yellow
    Write-Host "推荐访问: https://nodejs.org/" -ForegroundColor Cyan
    Read-Host "按任意键退出"
    exit 1
}

# 检查 npm
Write-Host "检查 npm 安装..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✓ npm 已安装: $npmVersion" -ForegroundColor Green
    } else {
        throw "npm 未找到"
    }
} catch {
    Write-Host "✗ npm 未安装" -ForegroundColor Red
    Write-Host "npm 通常与 Node.js 一起安装，请重新安装 Node.js" -ForegroundColor Yellow
    Read-Host "按任意键退出"
    exit 1
}

# 检查 package.json
if (-not (Test-Path "package.json")) {
    Write-Host "✗ 未找到 package.json 文件" -ForegroundColor Red
    Write-Host "请确保在项目根目录中运行此脚本" -ForegroundColor Yellow
    Read-Host "按任意键退出"
    exit 1
}

Write-Host "✓ 项目配置文件存在" -ForegroundColor Green

# 检查 node_modules
if (-not (Test-Path "node_modules")) {
    Write-Host "" 
    Write-Host "未找到 node_modules 目录，正在安装依赖..." -ForegroundColor Yellow
    Write-Host "这可能需要几分钟时间..." -ForegroundColor Cyan
    
    try {
        npm install
        Write-Host "✓ 依赖安装完成" -ForegroundColor Green
    } catch {
        Write-Host "✗ 依赖安装失败" -ForegroundColor Red
        Write-Host "请手动运行: npm install" -ForegroundColor Yellow
        Read-Host "按任意键退出"
        exit 1
    }
} else {
    Write-Host "✓ 依赖已安装" -ForegroundColor Green
}

# 启动开发服务器
Write-Host ""
Write-Host "启动开发服务器..." -ForegroundColor Yellow
Write-Host "服务器将在 http://localhost:5173 启动" -ForegroundColor Cyan
Write-Host "按 Ctrl+C 停止服务器" -ForegroundColor Cyan
Write-Host ""

try {
    npm run dev
} catch {
    Write-Host "✗ 开发服务器启动失败" -ForegroundColor Red
    Write-Host "请检查错误信息并参考 SETUP_GUIDE.md" -ForegroundColor Yellow
    Read-Host "按任意键退出"
    exit 1
}
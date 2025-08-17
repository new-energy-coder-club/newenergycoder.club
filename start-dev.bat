@echo off
chcp 65001 >nul
echo === Energy Coder Club Website 开发环境启动 ===
echo.

echo 检查 Node.js 安装...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ Node.js 未安装或未在 PATH 中
    echo 请按照 SETUP_GUIDE.md 中的说明安装 Node.js
    echo 推荐访问: https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js 已安装: %NODE_VERSION%

echo 检查 npm 安装...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ✗ npm 未安装
    echo npm 通常与 Node.js 一起安装，请重新安装 Node.js
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm 已安装: %NPM_VERSION%

if not exist "package.json" (
    echo ✗ 未找到 package.json 文件
    echo 请确保在项目根目录中运行此脚本
    pause
    exit /b 1
)

echo ✓ 项目配置文件存在

if not exist "node_modules" (
    echo.
    echo 未找到 node_modules 目录，正在安装依赖...
    echo 这可能需要几分钟时间...
    npm install
    if %errorlevel% neq 0 (
        echo ✗ 依赖安装失败
        echo 请手动运行: npm install
        pause
        exit /b 1
    )
    echo ✓ 依赖安装完成
) else (
    echo ✓ 依赖已安装
)

echo.
echo 启动开发服务器...
echo 服务器将在 http://localhost:5173 启动
echo 按 Ctrl+C 停止服务器
echo.

npm run dev
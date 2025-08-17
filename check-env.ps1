# Energy Coder Club Website - 环境检查脚本
# 此脚本将检查开发环境的完整性

Write-Host "=== Energy Coder Club Website 环境检查 ===" -ForegroundColor Green
Write-Host ""

$allChecksPass = $true

# 检查 PowerShell 版本
Write-Host "检查 PowerShell 版本..." -ForegroundColor Yellow
$psVersion = $PSVersionTable.PSVersion
Write-Host "✓ PowerShell 版本: $psVersion" -ForegroundColor Green

# 检查操作系统
Write-Host "检查操作系统..." -ForegroundColor Yellow
$osInfo = Get-CimInstance -ClassName Win32_OperatingSystem
Write-Host "✓ 操作系统: $($osInfo.Caption) $($osInfo.Version)" -ForegroundColor Green

# 检查 Node.js
Write-Host "检查 Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version 2>$null
    if ($nodeVersion) {
        Write-Host "✓ Node.js 版本: $nodeVersion" -ForegroundColor Green
        
        # 检查 Node.js 版本是否满足要求
        $versionNumber = $nodeVersion -replace 'v', ''
        $majorVersion = [int]($versionNumber.Split('.')[0])
        if ($majorVersion -ge 18) {
            Write-Host "✓ Node.js 版本满足要求 (>= 18.x)" -ForegroundColor Green
        } else {
            Write-Host "⚠ Node.js 版本较低，推荐升级到 18.x 或更高版本" -ForegroundColor Yellow
        }
    } else {
        throw "Node.js 未找到"
    }
} catch {
    Write-Host "✗ Node.js 未安装或未在 PATH 中" -ForegroundColor Red
    $allChecksPass = $false
}

# 检查 npm
Write-Host "检查 npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version 2>$null
    if ($npmVersion) {
        Write-Host "✓ npm 版本: $npmVersion" -ForegroundColor Green
    } else {
        throw "npm 未找到"
    }
} catch {
    Write-Host "✗ npm 未安装" -ForegroundColor Red
    $allChecksPass = $false
}

# 检查项目文件
Write-Host "检查项目文件..." -ForegroundColor Yellow

if (Test-Path "package.json") {
    Write-Host "✓ package.json 存在" -ForegroundColor Green
    
    # 读取 package.json 信息
    try {
        $packageJson = Get-Content "package.json" | ConvertFrom-Json
        Write-Host "✓ 项目名称: $($packageJson.name)" -ForegroundColor Green
        Write-Host "✓ 项目版本: $($packageJson.version)" -ForegroundColor Green
    } catch {
        Write-Host "⚠ package.json 格式可能有问题" -ForegroundColor Yellow
    }
} else {
    Write-Host "✗ package.json 不存在" -ForegroundColor Red
    $allChecksPass = $false
}

if (Test-Path "vite.config.ts") {
    Write-Host "✓ vite.config.ts 存在" -ForegroundColor Green
} else {
    Write-Host "⚠ vite.config.ts 不存在" -ForegroundColor Yellow
}

if (Test-Path "tsconfig.json") {
    Write-Host "✓ tsconfig.json 存在" -ForegroundColor Green
} else {
    Write-Host "⚠ tsconfig.json 不存在" -ForegroundColor Yellow
}

if (Test-Path "tailwind.config.js") {
    Write-Host "✓ tailwind.config.js 存在" -ForegroundColor Green
} else {
    Write-Host "⚠ tailwind.config.js 不存在" -ForegroundColor Yellow
}

# 检查依赖
Write-Host "检查项目依赖..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "✓ node_modules 目录存在" -ForegroundColor Green
    
    # 检查关键依赖
    $keyDependencies = @("react", "vite", "typescript", "@vitejs/plugin-react")
    foreach ($dep in $keyDependencies) {
        if (Test-Path "node_modules\$dep") {
            Write-Host "✓ $dep 已安装" -ForegroundColor Green
        } else {
            Write-Host "✗ $dep 未安装" -ForegroundColor Red
            $allChecksPass = $false
        }
    }
} else {
    Write-Host "✗ node_modules 目录不存在，需要运行 npm install" -ForegroundColor Red
    $allChecksPass = $false
}

# 检查源代码目录
Write-Host "检查源代码结构..." -ForegroundColor Yellow
$srcDirs = @("src", "src\components", "src\pages", "src\lib")
foreach ($dir in $srcDirs) {
    if (Test-Path $dir) {
        Write-Host "✓ $dir 目录存在" -ForegroundColor Green
    } else {
        Write-Host "⚠ $dir 目录不存在" -ForegroundColor Yellow
    }
}

# 检查网络连接（可选）
Write-Host "检查网络连接..." -ForegroundColor Yellow
try {
    $response = Test-NetConnection -ComputerName "registry.npmjs.org" -Port 443 -InformationLevel Quiet
    if ($response) {
        Write-Host "✓ npm 注册表连接正常" -ForegroundColor Green
    } else {
        Write-Host "⚠ npm 注册表连接可能有问题" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠ 无法检查网络连接" -ForegroundColor Yellow
}

# 总结
Write-Host "" 
Write-Host "=== 检查结果 ===" -ForegroundColor Green
if ($allChecksPass) {
    Write-Host "✓ 所有必需组件检查通过！" -ForegroundColor Green
    Write-Host "您可以运行以下命令启动开发服务器：" -ForegroundColor Cyan
    Write-Host "  .\start-dev.ps1" -ForegroundColor White
    Write-Host "  或者：" -ForegroundColor Cyan
    Write-Host "  npm run dev" -ForegroundColor White
} else {
    Write-Host "✗ 发现一些问题需要解决" -ForegroundColor Red
    Write-Host "请参考 SETUP_GUIDE.md 进行配置" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "如需帮助，请查看：" -ForegroundColor Cyan
Write-Host "- SETUP_GUIDE.md (详细配置指南)" -ForegroundColor White
Write-Host "- https://nodejs.org/ (Node.js 官网)" -ForegroundColor White
Write-Host "- https://vitejs.dev/ (Vite 文档)" -ForegroundColor White

Read-Host "按任意键退出"
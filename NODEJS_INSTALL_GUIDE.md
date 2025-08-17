# Node.js 安装指南

## 检查结果

✗ **Node.js 未安装** - 这是运行项目的必需环境
✗ **npm 未安装** - Node.js 的包管理器
✗ **winget 网络连接问题** - 无法使用自动安装
✗ **Chocolatey 未安装** - 备用包管理器不可用

## 手动安装 Node.js

### 方法 1: 官网下载（推荐）

1. **访问 Node.js 官网**
   - 打开浏览器，访问：https://nodejs.org/
   - 选择 **LTS 版本**（长期支持版本，推荐）

2. **下载安装包**
   - 点击 "Download for Windows" 按钮
   - 选择 `.msi` 安装包（适用于 Windows）
   - 推荐下载 64-bit 版本

3. **安装 Node.js**
   - 双击下载的 `.msi` 文件
   - 按照安装向导进行安装
   - **重要**: 确保勾选 "Add to PATH" 选项
   - 安装完成后重启 PowerShell 或命令提示符

### 方法 2: 使用 Scoop（可选）

如果您熟悉命令行工具，可以安装 Scoop 包管理器：

```powershell
# 安装 Scoop
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
irm get.scoop.sh | iex

# 使用 Scoop 安装 Node.js
scoop install nodejs
```

## 验证安装

安装完成后，请重新打开 PowerShell 并运行以下命令验证：

```powershell
# 检查 Node.js 版本
node --version

# 检查 npm 版本
npm --version
```

如果显示版本号，说明安装成功！

## 安装完成后的下一步

1. **安装项目依赖**
   ```powershell
   npm install
   ```

2. **启动开发服务器**
   ```powershell
   npm run dev
   ```
   或者使用我们的启动脚本：
   ```powershell
   .\start-dev.ps1
   ```

## 常见问题

### Q: 安装后仍然提示 "node 不是内部或外部命令"
A: 请确保：
- 重启 PowerShell 或命令提示符
- 检查 Node.js 是否正确添加到系统 PATH
- 重启计算机（如果上述方法无效）

### Q: npm 安装依赖时速度很慢
A: 可以使用国内镜像源：
```powershell
npm config set registry https://registry.npmmirror.com
```

### Q: 权限问题
A: 以管理员身份运行 PowerShell

## 推荐的 Node.js 版本

- **最低要求**: Node.js 16.x
- **推荐版本**: Node.js 18.x 或 20.x LTS
- **npm 版本**: 8.x 或更高

## 联系支持

如果遇到安装问题，请：
1. 查看 Node.js 官方文档：https://nodejs.org/en/docs/
2. 参考项目的 README.md 文件
3. 检查 SETUP_GUIDE.md 中的详细配置说明

---

**安装完成后，请重新运行项目启动命令！**
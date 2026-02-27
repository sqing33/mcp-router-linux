<h1 align="center">MCP Router</h1>
<h3 align="center">统一的 MCP 服务器管理应用</h3>

<div align="center">

[![GitHub stars](https://img.shields.io/github/stars/mcp-router/mcp-router?style=flat&logo=github&label=Star)](https://github.com/mcp-router/mcp-router)
[![Discord](https://img.shields.io/badge/Discord-加入我们-7289DA?style=flat&logo=discord)](https://discord.com/invite/dwG9jPrhxB)
[![X](<https://img.shields.io/badge/X(Twitter)-@mcp__router-1DA1F2?style=flat&logo=x>)](https://x.com/mcp_router)

[中文 | [English](README_en.md) | [日本語](README_ja.md)]

</div>

> **说明**：本仓库为个人 Fork。相对上游 `mcp-router/mcp-router`，仅补充了 Linux（Ubuntu `.deb`）打包脚本（GitHub Actions 构建 + Electron Forge `maker-deb`）；其余内容保持与上游一致。

## 🐧 Linux（Ubuntu `.deb`）版本与构建命令

### 安装（Ubuntu / Debian 系）

1. 从本仓库的 Release 下载 `.deb`（文件名类似 `mcp-router_0.6.2_amd64.deb`）
2. 安装：

```bash
sudo dpkg -i ./mcp-router_*_amd64.deb
# 若提示缺少依赖：
sudo apt-get -f install -y
```

### 构建（本地生成 `.deb`）

前置依赖（Ubuntu）：

```bash
sudo apt-get update
sudo apt-get install -y fakeroot dpkg
```

在仓库根目录执行：

```bash
pnpm install
pnpm run make
```

产物输出目录：

- `.deb`：`apps/electron/out/make/deb/x64/`
- `.zip`：`apps/electron/out/make/zip/linux/x64/`

如果你当前环境无法访问 `github.com`（会导致 Electron 校验下载失败），可临时关闭校验再构建：

```bash
FORGE_DISABLE_CHECKSUMS=true pnpm run make
```

## 🎯 概览

**MCP Router** 是一款用于简化 Model Context Protocol (MCP) 服务器管理的桌面应用。

### ✨ 核心特性

- 🌐 **通用连接** — 支持接入任意 MCP 服务器
  - 既可连接远程服务器，也支持本地服务器
  - 兼容 DXT、JSON、Manual 等多种协议
- 🖥️ **跨平台** — 提供 Windows、macOS 与 Linux（Ubuntu）版本
- 🗂 **上下文管理** — 有序管理不断增长的 MCP 服务器上下文
  - 以「项目」对 MCP 服务器分组
  - 通过「工作区」管理模式（类似浏览器配置文件）
  - 按服务器粒度开启/关闭工具

## 🔒 隐私与安全

### 数据完全本地

- ✅ **数据始终保存在本地** —— 请求日志、配置与服务器数据均存放于本地设备
- ✅ **凭据安全** —— API 密钥与认证信息不会外传
- ✅ **完全掌控** —— 您完全掌控 MCP 服务器连接与数据

### 透明可信

- 🔍 **可审计** —— 桌面应用源代码公开托管在 GitHub
- 🛡️ **可验证隐私** —— 您可以直接查阅代码，验证数据确实仅在本地保存
- 🤝 **社区驱动** —— 欢迎在 [社区](https://discord.com/invite/dwG9jPrhxB) 中贡献安全改进与审计

## 📥 安装

可在 [GitHub 发布页](https://github.com/mcp-router/mcp-router/releases) 获取最新版本。

## 🚀 功能亮点

### 📊 集中式服务器管理

在单一控制面板中轻松切换 MCP 服务器的启用状态

<img src="https://raw.githubusercontent.com/mcp-router/mcp-router/main/public/images/readme/toggle.png" alt="服务器管理" width="600">

### 🌐 通用连接能力

支持添加与连接任意 MCP 服务器，无论是本地还是远程环境

<img src="https://raw.githubusercontent.com/mcp-router/mcp-router/main/public/images/readme/add-mcp-manual.png" alt="通用连接" width="600">

### 🔗 一键集成

与 Claude、Cline、Windsurf、Cursor 等常见 AI 工具或自定义客户端无缝接入

<img src="https://raw.githubusercontent.com/mcp-router/mcp-router/main/public/images/readme/token.png" alt="一键集成" width="600">

### 📈 全面的日志与分析

监控并展示详细的请求日志与统计信息

<img src="https://raw.githubusercontent.com/mcp-router/mcp-router/main/public/images/readme/stats.png" alt="日志与统计" width="600">

## 🤝 社区

欢迎加入社区，获取帮助、分享想法并获取最新动态：

- 💬 [Discord 社区](https://discord.com/invite/dwG9jPrhxB)
- 🐦 [在 X (Twitter) 关注我们](https://x.com/mcp_router)
- ⭐ [在 GitHub 上为我们加星](https://github.com/mcp-router/mcp-router)

## 📝 许可证

本项目采用 Sustainable Use License 授权，详情请参阅 [LICENSE.md](LICENSE.md)。

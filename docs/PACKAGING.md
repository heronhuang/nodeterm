> English: [docs/en/PACKAGING.md](./en/PACKAGING.md)

# 打包（macOS 与 Windows）

桌面安装包使用 [electron-builder](https://www.electron.build/) 构建。配置在 `package.json` 的 `build` 块中。产物输出到 `dist/`。

**官方安装包仅提供 macOS 与 Windows。** Linux 可从源码运行桌面版或 Server Edition，见根目录 [README.md](../README.md#-从源码构建)。

## 本地命令

| 命令 | 平台 | 用途 |
|--------|----------|---------|
| `npm run dist` | macOS（arm64，未签名） | 本地 mac 包：DMG + zip，更新关闭（`nodeTermUpdates=disabled`） |
| `npm run dist:win` | Windows（x64，未签名） | 本地 Windows 包：NSIS + zip，更新关闭 |
| `npm run release` | macOS（arm64 + x64，已签名） | 生产 mac 构建：签名、公证、DMG + zip + `latest-mac.yml` |
| `npm run dist:win:release` | Windows（x64，未签名 beta） | CI/发布 Windows 构建：NSIS + zip + `latest.yml`，仅被动更新提示 |
| `npm run dist:mac:release` | macOS（arm64 + x64，未签名） | CI/发布 mac 构建：DMG + zip + `latest-mac.yml`，仅被动更新提示 |

每个打包脚本在调用 electron-builder 前都会运行 `npm run make-icon` 和完整的 `npm run build`（electron-vite 打包、session host、Codex relay）。

在 macOS 上，`npm run release` 期望 universal 构建，并在之后运行 `npm run rebuild`，使原生模块与开发环境一致。

## 代码签名与公证

### macOS（`npm run release`，上游已签名构建）

设置以下环境变量（GitHub Actions 在具备签名的 Mac runner 上的 secrets）：

- **`CSC_LINK`** — base64 编码的 Developer ID Application `.p12`
- **`CSC_KEY_PASSWORD`** — `.p12` 密码
- **`APPLE_API_KEY_B64`** — base64 编码的 App Store Connect API 密钥（`.p8`）
- **`APPLE_API_KEY_ID`** — 密钥 ID
- **`APPLE_API_ISSUER`** — issuer ID

electron-builder 用它们完成签名与 Apple 公证（`package.json` 中的 `build.mac.notarize`）。

### Windows（`npm run dist:win:release`，CI `release-win`）

当前发布的 Windows 构建为**未签名**（仅被动更新提示）。获得 Windows 代码签名证书后，electron-builder 接受相同的 **`CSC_LINK`** / **`CSC_KEY_PASSWORD`** 对（或 electron-builder 文档中的平台专用证书环境变量）。在此之前，安装时 SmartScreen 可能警告。

## CI 发布工作流

推送标签（`v*`）触发 `.github/workflows/release.yml`：

- **`release-mac`** — GitHub `macos-14`：`npm run dist:mac:release`（本 fork 未签名），上传 DMG/zip/`latest-mac.yml`
- **`release-win`** — GitHub `windows-latest`：`npm run dist:win:release`，上传 NSIS/zip/`latest.yml`（尽力而为，不阻塞发布）
- **`publish`** — mac 资源上传后将 GitHub Release 设为 latest
- **`verify-feed`** — 仅在 `eneskirca/nodeterm` 检查 `https://nodeterm.dev/updates`（fork 跳过）

更新 feed 文件在上游镜像于 `https://nodeterm.dev/updates`（仓库外）。

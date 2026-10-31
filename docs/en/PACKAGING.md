# Packaging (macOS and Windows)

Desktop installers are built with [electron-builder](https://www.electron.build/). Configuration lives in the `build` block of `package.json`. Artifacts land in `dist/`.

## Local commands

| Command | Platform | Purpose |
|--------|----------|---------|
| `npm run dist` | macOS (arm64, unsigned) | Local mac package: DMG + zip, updates disabled (`nodeTermUpdates=disabled`) |
| `npm run dist:win` | Windows (x64, unsigned) | Local Windows package: NSIS + zip, updates disabled |
| `npm run release` | macOS (arm64 + x64, signed) | Production mac build: sign, notarize, DMG + zip + `latest-mac.yml` |
| `npm run dist:win:release` | Windows (x64, unsigned beta) | CI/release Windows build: NSIS + zip + `latest.yml`, manual update notice only |
| `npm run dist:mac:release` | macOS (arm64 + x64, unsigned) | CI/release mac build: DMG + zip + `latest-mac.yml`, manual update notice only |

Every packaging script runs `npm run make-icon` and the full `npm run build` (electron-vite bundles, session host, Codex relay) before invoking electron-builder.

On macOS, `npm run release` expects a universal build and runs `npm run rebuild` afterward so native modules match your dev environment.

## Code signing and notarization

### macOS (`npm run release`, signed upstream)

Set these environment variables (GitHub Actions secrets on a signing Mac runner):

- **`CSC_LINK`** — base64-encoded Developer ID Application `.p12`
- **`CSC_KEY_PASSWORD`** — password for the `.p12`
- **`APPLE_API_KEY_B64`** — base64-encoded App Store Connect API key (`.p8`)
- **`APPLE_API_KEY_ID`** — key ID
- **`APPLE_API_ISSUER`** — issuer ID

electron-builder uses them for signing and Apple notarization (`build.mac.notarize` in `package.json`).

### Windows (`npm run dist:win:release`, CI `release-win`)

Shipped Windows builds are currently **unsigned** (passive update notice only). When a Windows code-signing certificate is available, electron-builder accepts the same **`CSC_LINK`** / **`CSC_KEY_PASSWORD`** pair (or platform-specific cert env vars documented by electron-builder). Until then, SmartScreen may warn on install.

## CI release workflow

Tag pushes (`v*`) run `.github/workflows/release.yml`:

- **`release-mac`** — GitHub `macos-14`: `npm run dist:mac:release` (unsigned on this fork), uploads DMG/zip/`latest-mac.yml`
- **`release-win`** — GitHub `windows-latest`: `npm run dist:win:release`, uploads NSIS/zip/`latest.yml` (best-effort, does not block publish)
- **`publish`** — promotes the GitHub Release to latest after mac assets upload
- **`verify-feed`** — checks `https://nodeterm.dev/updates` only on `eneskirca/nodeterm` (skipped on forks)

Update feed files are mirrored at `https://nodeterm.dev/updates` on upstream (outside this repo).

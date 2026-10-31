> English: [docs/en/release-notes/README.md](../en/release-notes/README.md)

# 版本说明

GitHub Release 的文案由两层组成。`.github/workflows/release.yml` 的 “Generate release notes” 步骤组装它们；生成器是 `scripts/release-notes.mjs`，测试是 `scripts/release-notes.test.ts`。

## 归档位置

**各版本的 Highlights 正文（英文）** 存放在 [`docs/en/release-notes/`](../en/release-notes/)，例如 `v0.4.5.md`。CI 在发布时若存在对应 `<tag>.md` 会将其置于 Release 顶部 `## Highlights` 下。

本目录（`docs/release-notes/`）仅提供**中文索引**，不复制每版全文。需要阅读某版细节请打开英文文件。

## 两层结构（简述）

1. **分组列表（自动）** — GitHub 按 PR 标题 conventional commit 类型分组：New / Improved / Fixed / Internal changes 等。规则见 `scripts/release-notes.mjs` 的 `TYPE_SECTIONS`。
2. **Highlights（可选手写）** — 在 `docs/en/release-notes/<tag>.md` 写 3–5 句面向用户的摘要；缺文件则 Release 仅含分组列表。

带 `no-release-notes` 标签的 PR 完全不出现在生成说明中。

## 最近版本（一行摘要）

| 版本 | 摘要（中文） |
|------|----------------|
| v0.4.5 | 见 [v0.4.5.md](../en/release-notes/v0.4.5.md)（英文 Highlights） |
| v0.4.4 | 见 [v0.4.4.md](../en/release-notes/v0.4.4.md) |
| v0.4.3 | 见 [v0.4.3.md](../en/release-notes/v0.4.3.md) |
| v0.4.2 | 见 [v0.4.2.md](../en/release-notes/v0.4.2.md) |
| v0.4.1 | 见 [v0.4.1.md](../en/release-notes/v0.4.1.md) |
| v0.4.0 | 见 [v0.4.0.md](../en/release-notes/v0.4.0.md) |

更早版本见 [`docs/en/release-notes/`](../en/release-notes/) 目录列表。

## 本地试跑生成器

```bash
node scripts/release-notes.mjs --tag v0.3.8 --prev v0.3.7 --repo eneskirca/nodeterm
```

从工作目录读取 `docs/release-notes/<tag>.md`（`--root` 可改路径）。Release 说明字符串仍以英文书写（与仓库其他 release 文案一致）。

> English: [docs/en/DOCUMENTATION-LANGUAGES.md](./en/DOCUMENTATION-LANGUAGES.md)

# 文档语言策略

nodeterm 文档以**简体中文**为主路径，英文为对照 mirror。

## 路径约定

| 语言 | 路径 | 说明 |
|------|------|------|
| 中文（默认） | `docs/*.md` | 用户与贡献者优先阅读 |
| 英文 | `docs/en/*.md` | 与中文文件同名；保持同步的英文原文 |

仓库根目录同样遵循：

| 文件 | 中文 | 英文 |
|------|------|------|
| 项目介绍 | `README.md` | `README.en.md` |
| 贡献指南 | `CONTRIBUTING.md` | `CONTRIBUTING.en.md` |
| AI/深度参考 | `CLAUDE.md`（中文导向） | `CLAUDE.en.md`（完整英文） |

每个中文文档顶部有一行 `> English: …` 指向对应英文文件。

## 版本说明

逐版本 Highlights 与发布说明生成流程见 [docs/release-notes/README.md](./release-notes/README.md)。版本正文归档在 `docs/en/release-notes/`（英文）；中文 README 仅作索引与可选摘要。

## 不翻译的范围

测试 fixture、源码内 README、`THIRD-PARTY-NOTICES.md` 等非面向最终用户的路径保持原语言，除非另有说明。

## 贡献翻译

修改行为时请同时更新中文主路径与 `docs/en/` mirror（或仅更新一侧并开 issue 跟踪另一侧）。PR 描述中说明文档语言变更。

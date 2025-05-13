# MELODYBABY 👩🏻

## Git 版本管理規範

### 提交規則

- [慣例式提交](https://www.conventionalcommits.org/zh-hant/v1.0.0/)
- [Angular Commit Message Format](https://github.com/angular/angular/blob/main/contributing-docs/commit-message-guidelines.md)
- [@semantic-release](https://github.com/semantic-release/semantic-release/tree/master?tab=readme-ov-file#commit-message-format)

### 1. 主分支（`main`）

- 代表穩定版本的分支，自動發佈至 NPM。
- 不接受直接提交，只能透過來自 開發分支 的 PR 合併，並使用 **Rebase and Merge**。
- 每次合併後，GitHub Actions 會自動產生新的提交，內容包含：
  - 根據 提交說明 產生新的 **正式版本號**（如 `1.2.3`）
  - 更新 `package.json`
  - 更新 `CHANGELOG.md`

### 2. 開發分支（`dev/{動物名}`）

- 當前開發週期的主幹分支。
- 每次開啟新一輪開發週期時，從 `main` 建立，例如：`dev/koala`。
- 不接受直接提交，只接受由 任務分支 發起的 PR，並使用 **Squash and Merge**。
- 任務完成後透過 PR 合併回 `main`，並使用 **Rebase and Merge**，合併後刪除該分支。
- 每次合併後，GitHub Actions 會自動產生新的提交，內容包含：
  - 根據 **提交說明 產生新的 開發版本號**（如 `1.2.3-dev.1`）
  - 更新 `package.json`

### 3. 任務分支（`feat/*、`fix/\* 等）

- 處理特定功能、修復或其他開發工作分支。
- 從 dev/{動物名} 分支建立，例如：`feat/login`。
- 任務完成後透過 PR 合併回 `dev/{動物名}`，並使用 **Squash and Merge**，合併後刪除該分支。

### 4. 緊急修補分支（`hotfix/*`）

- 針對 `main` 的版本進行緊急修補。
- 從 main 分支建立，例如：`hotfix/login-bug`。
- 修復完成後提交 PR 合併回 `main`，並使用 **Squash and Merge**，合併後刪除該分支。
- 若目前有開發中的 `dev/{動物名}` 分支，需要在該分支上執行 `git rebase main`。

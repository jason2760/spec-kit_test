<!--
Sync Impact Report:
- Version change: 1.2.0 -> 1.2.1
- Modified principles:
  - III. 文件與在地化 -> III. 語言與文件規範
- Templates requiring updates: None
- Follow-up TODOs: None
-->
# 系統測試範例 Constitution

## Core Principles

### I. 技術棧
後端技術： 必須使用 C# 語言，採用 ASP.NET Core MVC 架構，框架 .NET 9。
資料庫： 統一使用 SQL Server。所有資料存取必須透過 Entity Framework Core (EF Core) 進行，採用 Code First Migration 模式。
前端技術： 必須使用 Vue3。

### II. 命名慣例
所有變數、函式、類別 (Class) 和方法 (Method) 命名必須使用英文命名 + 功能名稱 + 流水號。

### III. 語言與文件規範
所有文件（spec.md, plan.md, tasks.md, constitution.md）中的 標題、說明、註解、業務邏輯描述，以及所有 非程式碼/非類別名稱 的文字，必須使用繁體中文 (Traditional Chinese)。僅有 C# 類別名稱 (ClassName)、變數名稱 (variableName)、檔案路徑、Git Commit 訊息允許使用英文。嚴禁使用任何簡體中文或英文的 非技術性標題（例如：將 User Stories 替換為 使用者故事）。

## Governance

所有開發工作都必須遵守本章程。任何修訂都應記錄在案、獲得批准並制定遷移計劃。

**Version**: 1.2.1 | **Ratified**: 2025-10-28 | **Last Amended**: 2025-10-29
<!--
Sync Impact Report:
- Version change: 1.1.0 -> 1.2.0
- Modified principles:
  - I. 技術棧: Updated backend framework to .NET 9.
  - II. 命名慣例: Added "功能名稱+流水號" to naming rules.
- Templates requiring updates:
  - ✅ .specify/templates/plan-template.md
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

### III. 文件與在地化
所有 README 文件、程式碼註解和使用者介面 (UI) 訊息 必須使用繁體中文。

## Governance

所有開發工作都必須遵守本章程。任何修訂都應記錄在案、獲得批准並制定遷移計劃。

**Version**: 1.2.0 | **Ratified**: 2025-10-28 | **Last Amended**: 2025-10-28
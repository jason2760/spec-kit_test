# Implementation Plan: 人員進出管理系統

**功能分支**: `002-personnel-access` | **日期**: 2025-10-28 | **規格文件**: specs/002-personnel-access/spec.md
**輸入來源**: Feature specification from `/specs/002-personnel-access/spec.md`

**Note**: This template is filled in by the `/speckit.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## 總結

建立一個人員進出管理系統，能夠記錄刷卡資料並提供查詢功能。

## 技術背景

<!--
  ACTION REQUIRED: Replace the content in this section with the technical details
  for the project. The structure here is presented in advisory capacity to guide
  the iteration process.
-->

**語言/版本**: C# .NET 9, Vue3
**主要依賴**: ASP.NET Core MVC, Entity Framework Core
**儲存**: SQL Server
**測試**: C# 後端使用 xUnit 進行單元/整合測試，Playwright 進行端到端 (E2E) 測試。Vue3 前端使用 Vitest 進行單元/組件測試，Cypress 進行端到端 (E2E) 測試。
**目標平台**: Web
**專案類型**: Web application (frontend + backend)
**效能目標**: 記錄進出事件 < 500ms。查詢進出記錄 < 3 秒 (最多 10,000 條記錄)。系統可用性 99.9% 正常運行時間。
**限制**: 安全性：靜態和傳輸中的資料加密。基於角色的存取控制 (RBAC)。可擴展性：支援未來人員和進出事件的增長。資料保留：進出記錄的保留政策。可稽核性：追蹤進出記錄變更的能力。
**規模/範圍**: 人員數量：最多 1,000。每日進出記錄：最多 5,000。

### 資料庫綱要與資料模型 (Database Schema and Data Model)

#### SQL 資料表定義 (SQL Table Definition)
由於專案採用 EF Core Code First 模式，實際的 SQL 將由遷移工具產生。以下是等效的 T-SQL (`SQL Server`) `CREATE TABLE` 語法：

```sql
CREATE TABLE [AccessRecords] (
    [Id] int NOT NULL IDENTITY,
    [EmployeeID] nvarchar(max) NOT NULL,
    [Name] nvarchar(max) NOT NULL,
    [UnitName] nvarchar(max) NOT NULL,
    [Timestamp] datetime2 NOT NULL,
    [CardReaderID] nvarchar(max) NOT NULL,
    CONSTRAINT [PK_AccessRecords] PRIMARY KEY ([Id])
);
```

#### 索引建議 (Index Recommendations)
為了滿足成功標準 SC-002（在 3 秒內檢索 10,000 條記錄），並優化依時間、單位和姓名組合的查詢效能，建議在 `AccessRecord` 資料表上建立索引。

**建議的索引 (T-SQL 語法)：**
1.  **複合索引**: 在 `(UnitName, Name, Timestamp)` 上建立一個複合索引。
    ```sql
    CREATE INDEX IX_AccessRecords_UnitName_Name_Timestamp ON AccessRecords (UnitName, Name, Timestamp);
    ```
2.  **單獨索引**: 如果單獨按時間戳記查詢也很頻繁，可以考慮在 `Timestamp` 上建立一個獨立的索引。
    ```sql
    CREATE INDEX IX_AccessRecords_Timestamp ON AccessRecords (Timestamp);
    ```
這將確保資料庫可以快速定位和篩選記錄，避免在高資料量下進行全資料表掃描。

## 憲章檢查

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **I. 技術棧**: ASP.NET Core MVC (.NET 9), EF Core (Code First), Vue3, SQL Server
- **II. 命名慣例**: 所有變數/函式/類別/方法使用英文命名 + 功能名稱 + 流水號
- **III. 文件與在地化**: README, 註解, UI 訊息使用繁體中文

## 專案結構

### 文件 (此功能)

```text
specs/002-personnel-access/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### 原始碼 (儲存庫根目錄)
<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# Option 2: Web application (when "frontend" + "backend" detected)
backend/
├── src/
│   ├── models/
│   ├── services/
│   └── api/
└── tests/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
```

**結構決策**: 選擇了 Web 應用程式結構，因為此功能包含後端 (C# ASP.NET Core MVC) 和前端 (Vue3)。

## 複雜度追蹤

> **Fill ONLY if Constitution Check has violations that must be justified**

| 違規項目 | 需要原因 | 已拒絕的更簡單替代方案，因為 |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |
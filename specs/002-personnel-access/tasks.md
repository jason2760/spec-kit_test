# Tasks: 人員進出管理系統

**輸入來源**: Design documents from `/specs/002-personnel-access/`
**先決條件**: plan.md (必要), spec.md (使用者故事為必要)

**測試**: 單元測試的任務已根據實作計畫包含在內。

**組織**: 任務按使用者故事分組，以便能夠獨立實作和測試每個故事。

## 格式: `[ID] [P?] [Story] 描述`

- **[P]**: 可並行執行 (不同檔案，無依賴關係)
- **[Story]**: 此任務所屬的使用者故事 (例如, US1, US2)
- 在描述中包含確切的檔案路徑

## 路徑慣例

- **Web 應用程式**: `backend/src/`, `frontend/src/`

---

## 階段 1: 設定 (共享基礎設施)

**目的**: 專案初始化與基礎結構。

- [ ] T001 建立包含 `backend` 和 `frontend` 目錄的專案結構。
- [ ] T002 [P] 在 `backend/` 中初始化 C# ASP.NET Core MVC 專案。
- [ ] T003 [P] 在 `frontend/` 中初始化 Vue3 專案。
- [ ] T004 [P] 在 `backend/` 中安裝 Entity Framework Core (`Microsoft.EntityFrameworkCore.SqlServer`, `Microsoft.EntityFrameworkCore.Design`)。

---

## 階段 2: 基礎 (前置必要任務)

**目的**: 在實作任何使用者故事之前必須完成的核心基礎設施。

- [ ] T005 在 `backend/appsettings.json` 中設定 SQL Server 資料庫連接字串。
- [ ] T006 在 `backend/src/Data/ApplicationDbContext.cs` 中建立應用程式的 `DbContext` 檔案。

**檢查點**: 基礎已就緒 - 現在可以開始實作使用者故事。

---

## 階段 3: 使用者故事 1 - 記錄刷卡資料 (優先度: P1) 🎯 MVP

**目標**: 作為系統，當人員刷卡進出時，我希望將刷卡資料寫入資料庫中，以便記錄人員的進出情況。

**獨立測試**: 可以透過模擬刷卡事件，並驗證資料庫中是否新增了包含工號、姓名、單位名稱、時間戳記、刷卡機編號的刷卡資料來獨立測試。

### 使用者故事 1 的實作

- [ ] T007 [US1] 在 `backend/src/models/AccessRecord.cs` 中建立 `AccessRecord` 模型，其屬性包含：`EmployeeID`, `Name`, `UnitName`, `Timestamp`, `CardReaderID`。
- [ ] T008 [US1] 將 `DbSet<AccessRecord>` 屬性新增至 `backend/src/Data/ApplicationDbContext.cs`。
- [ ] T009 [US1] 使用 `dotnet ef migrations add InitialCreate` 為 `AccessRecord` 資料表建立初始的 EF Core 遷移。
- [ ] T010 [US1] 使用 `dotnet ef database update` 將遷移應用於資料庫。
- [ ] T011 [US1] 在 `backend/src/services/AccessRecordService.cs` 中實作 `AccessRecordService`，並包含一個儲存新 `AccessRecord` 的方法。
- [ ] T012 [US1] 在 `backend/src/api/AccessRecordsController.cs` 中實作 `AccessRecordsController`，並包含一個 `POST` 端點，用於接收刷卡資料並使用服務儲存它。
- [ ] T013 [P] [US1] 在 `backend/tests/AccessRecordServiceTests.cs` 中為 `AccessRecordService` 的儲存方法撰寫單元測試。

**檢查點**: 此時，使用者故事 1 應能透過 API 呼叫完全運作並可獨立測試。

---

## 階段 4: 使用者故事 2 - 查詢進出記錄 (優先度: P1)

**目標**: 作為使用者，我希望能夠透過時間、單位和姓名查詢人員進出記錄，以便審查進出歷史。

**獨立測試**: 可以透過在查詢頁面輸入不同的查詢條件（時間範圍、單位、姓名），並驗證顯示的記錄是否符合條件來獨立測試。

### 使用者故事 2 的實作

- [ ] T014 [US2] 在 `backend/src/services/AccessRecordService.cs` 中新增一個查詢方法，支援依時間範圍、單位和姓名進行篩選。
- [ ] T015 [US2] 在 `backend/src/api/AccessRecordsController.cs` 中新增一個 `GET` 端點，該端點接受查詢參數並返回篩選後的結果。
- [ ] T016 [P] [US2] 在 `backend/tests/AccessRecordServiceTests.cs` 中為 `AccessRecordService` 的查詢方法撰寫單元測試。
- [ ] T017 [P] [US2] 在 `frontend/src/services/api.js` 中建立一個服務，用於從後端 API 獲取進出記錄。
- [ ] T018 [P] [US2] 在 `frontend/src/components/` 中建立一個 `RecordQueryForm.vue` 組件，包含時間、單位和姓名的輸入欄位。
- [ ] T019 [P] [US2] 在 `frontend/src/components/` 中建立一個 `RecordsList.vue` 組件，用於顯示進出記錄列表。
- [ ] T020 [US2] 在 `frontend/src/pages/` 中建立一個 `Query.vue` 頁面，結合 `RecordQueryForm` 和 `RecordsList` 組件以提供完整的查詢功能。

**檢查點**: 此時，使用者故事 1 和 2 都應能獨立運作。

---

## 階段 5: 優化與跨領域關注點

**目的**: 影響多個使用者故事的改進。

- [ ] T021 [P] 在 `backend/src/api/AccessRecordsController.cs` 的端點中新增基本的驗證和錯誤處理。
- [ ] T022 [P] 在 `frontend/src/components/` 的 Vue 組件中新增基本的 UI 樣式和佈局。
- [ ] T023 [P] 在前端為 API 呼叫新增全域錯誤處理。

---

## 依賴性與執行順序

### 階段依賴性

- **設定 (階段 1)**: 無依賴。
- **基礎 (階段 2)**: 依賴於設定階段的完成。
- **使用者故事 (階段 3+)**: 依賴於基礎階段的完成。
- **優化 (最終階段)**: 依賴於所有使用者故事的完成。

### 使用者故事依賴性

- **使用者故事 1 (P1)**: 可在基礎 (階段 2) 完成後開始。不依賴其他故事。
- **使用者故事 2 (P2)**: 可在基礎 (階段 2) 完成後開始。資料依賴 US1，但查詢功能可以使用模擬資料獨立開發和測試。

### 在每個使用者故事中

- 後端: 模型 → DbContext → 遷移 → 服務 → 控制器 → 測試。
- 前端: API 服務 → 組件 → 頁面。

---

## 實作策略

### MVP 優先 (僅使用者故事 1)

1. 完成階段 1: 設定
2. 完成階段 2: 基礎
3. 完成階段 3: 使用者故事 1
4. **停止並驗證**: 測試 POST 端點以確保資料正確儲存。

### 增量交付

1. 完成設定 + 基礎。
2. 新增使用者故事 1 → 獨立測試 → MVP 完成。
3. 新增使用者故事 2 → 獨立測試 → 完整功能完成。
4. 完成優化階段。
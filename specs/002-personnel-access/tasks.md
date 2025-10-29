# Tasks: 人員進出管理系統

**Input**: Design documents from `specs/002-personnel-access/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The feature specification implies a need for testing, and research has identified specific testing frameworks. Therefore, test tasks will be included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/src/`, `frontend/src/`
- Paths shown below assume web app structure.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 建立後端 ASP.NET Core MVC 專案結構於 `backend/src/`
- [ ] T002 建立前端 Vue3 專案結構於 `frontend/src/`
- [ ] T003 初始化 Entity Framework Core 與 SQL Server 於 `backend/src/`
- [ ] T004 [P] 配置 xUnit 於後端測試 `backend/tests/`
- [ ] T005 [P] 配置 Vitest 於前端測試 `frontend/tests/`
- [ ] T006 [P] 配置 Playwright 於 E2E 測試 `backend/tests/E2E/` (或獨立 E2E 專案)
- [ ] T007 [P] 配置 Cypress 於 E2E 測試 `frontend/tests/E2E/` (或獨立 E2E 專案)
- [ ] T008 [P] 配置 C# 和 Vue3 的程式碼檢查與格式化工具

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: 核心基礎設施，必須在任何使用者故事實作之前完成

**⚠️ CRITICAL**: 任何使用者故事工作都不能在此階段完成之前開始

- [ ] T009 實作進出記錄實體模型於 `backend/src/models/AccessRecord.cs`
- [ ] T010 建立 EF Core DbContext 於 `backend/src/Data/ApplicationDbContext.cs`
- [ ] T011 配置 EF Core 遷移並應用初始遷移於 `backend/src/`
- [ ] T012 實作基本 API 路由與錯誤處理於 `backend/src/`
- [ ] T013 實作基本日誌記錄基礎設施於 `backend/src/`

**Checkpoint**: 基礎準備就緒 - 使用者故事實作現在可以並行開始

---

## Phase 3: User Story 1 - 記錄刷卡資料 (Priority: P1) 🎯 MVP

**Goal**: 將刷卡資料寫入資料庫。

**Independent Test**: 模擬刷卡事件，並驗證資料庫中是否新增了包含工號、姓名、單位名稱、時間戳記、刷卡機編號的刷卡資料。

### Tests for User Story 1

- [ ] T014 [P] [US1] 後端整合測試：驗證 `POST /api/accessrecords` 能記錄刷卡資料並進行驗證，於 `backend/tests/IntegrationTests/AccessRecordControllerTests.cs`

### Implementation for User Story 1

- [ ] T015 [P] [US1] 建立 `AccessRecordController` 處理 `POST /api/accessrecords` 請求，於 `backend/src/controllers/AccessRecordController.cs`
- [ ] T016 [P] [US1] 建立 `AccessRecordService` 處理刷卡資料記錄邏輯，於 `backend/src/services/AccessRecordService.cs`
- [ ] T017 [P] [US1] 建立 `AccessRecordRepository` 處理 EF Core 資料存取，於 `backend/src/repositories/AccessRecordRepository.cs`

**Checkpoint**: User Story 1 應能獨立運作並進行測試。

---

## Phase 4: User Story 2 - 查詢進出記錄 (Priority: P1)

**Goal**: 透過時間、單位和姓名查詢人員進出記錄。

**Independent Test**: 在查詢頁面輸入不同的查詢條件（時間範圍、單位、姓名），並驗證顯示的記錄是否符合條件。

### Tests for User Story 2

- [ ] T018 [P] [US2] 後端整合測試：驗證 `GET /api/accessrecords` 能根據查詢條件返回進出記錄，於 `backend/tests/IntegrationTests/AccessRecordControllerTests.cs`
- [ ] T019 [P] [US2] 前端組件測試：驗證查詢表單組件能正確提交查詢條件並顯示結果，於 `frontend/tests/unit/AccessRecordQueryForm.spec.js`
- [ ] T020 [P] [US2] E2E 測試：驗證透過查詢表單查詢進出記錄的流程，於 `frontend/tests/E2E/query-access-records.spec.js`

### Implementation for User Story 2

- [ ] T021 [P] [US2] 擴展 `AccessRecordController` 處理 `GET /api/accessrecords` 請求，於 `backend/src/controllers/AccessRecordController.cs`
- [ ] T022 [P] [US2] 擴展 `AccessRecordService` 處理進出記錄查詢邏輯，於 `backend/src/services/AccessRecordService.cs`
- [ ] T023 [P] [US2] 建立 Vue3 進出記錄查詢頁面組件 `AccessRecordQueryPage.vue`，於 `frontend/src/pages/AccessRecordQueryPage.vue`
- [ ] T024 [P] [US2] 建立 Vue3 進出記錄清單顯示組件 `AccessRecordList.vue`，於 `frontend/src/components/AccessRecordList.vue`
- [ ] T025 [US2] 整合前端查詢頁面與後端 API 取得進出記錄，於 `frontend/src/pages/AccessRecordQueryPage.vue`

**Checkpoint**: User Story 2 應能獨立運作並進行測試。

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: 影響多個使用者故事的改進

- [ ] T026 [P] 文件更新：更新 `README.md` 和 `quickstart.md`
- [ ] T027 程式碼清理和重構
- [ ] T028 效能優化 (根據效能目標)
- [ ] T029 安全性強化 (資料加密、RBAC 實作)
- [ ] T030 額外的單元測試 (如果需要)
- [ ] T031 執行 `quickstart.md` 驗證

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 無依賴 - 可立即開始
- **Foundational (Phase 2)**: 依賴於 Setup 完成 - 阻擋所有使用者故事
- **User Stories (Phase 3+)**: 都依賴於 Foundational 階段完成
  - 使用者故事可以並行進行 (如果人力充足)
  - 或按優先順序依序進行 (P1 → P2)
- **Polish (最終階段)**: 依賴於所有預期的使用者故事完成

### User Story Dependencies

- **User Story 1 (P1)**: 可在 Foundational (Phase 2) 後開始 - 不依賴其他故事
- **User Story 2 (P1)**: 可在 Foundational (Phase 2) 後開始 - 不依賴其他故事

### Within Each User Story

- 測試 (如果包含) 必須在實作之前編寫並失敗
- 模型優先於服務
- 服務優先於端點
- 核心實作優先於整合
- 故事完成後再進入下一個優先級

### Parallel Opportunities

- 所有標記 [P] 的 Setup 任務都可以並行執行
- 所有標記 [P] 的 Foundational 任務都可以並行執行 (在 Phase 2 內)
- Foundational 階段完成後，所有使用者故事都可以並行開始 (如果團隊能力允許)
- 使用者故事的所有測試 (如果標記 [P]) 都可以並行執行
- 故事中的模型 (如果標記 [P]) 都可以並行執行
- 不同的使用者故事可以由不同的團隊成員並行處理

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. 完成 Phase 1: Setup
2. 完成 Phase 2: Foundational (關鍵 - 阻擋所有故事)
3. 完成 Phase 3: User Story 1
4. **停止並驗證**: 獨立測試 User Story 1
5. 如果準備就緒，部署/演示

### Incremental Delivery

1. 完成 Setup + Foundational → 基礎準備就緒
2. 新增 User Story 1 → 獨立測試 → 部署/演示 (MVP!)
3. 新增 User Story 2 → 獨立測試 → 部署/演示
4. 每個故事都增加價值，而不會破壞以前的故事

### Parallel Team Strategy

有多個開發人員時：

1. 團隊共同完成 Setup + Foundational
2. Foundational 完成後：
   - 開發人員 A: User Story 1
   - 開發人員 B: User Story 2
3. 故事獨立完成並整合

---

## Notes

- [P] 任務 = 不同的檔案，無依賴
- [Story] 標籤將任務映射到特定的使用者故事以進行追溯
- 每個使用者故事都應能獨立完成和測試
- 在實作之前驗證測試是否失敗
- 每個任務或邏輯組後提交
- 在任何檢查點停止以獨立驗證故事
- 避免：模糊的任務、相同的檔案衝突、破壞獨立性的跨故事依賴

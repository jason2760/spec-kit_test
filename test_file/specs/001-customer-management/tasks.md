# Tasks: 客戶資料管理頁面

**Input**: Design documents from `specs/001-customer-management/`
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

- [ ] T001 Create backend project structure for ASP.NET Core MVC in `backend/src/`
- [ ] T002 Create frontend project structure for Vue3 in `frontend/src/`
- [ ] T003 Initialize Entity Framework Core with SQL Server in `backend/src/`
- [ ] T004 [P] Configure xUnit for backend testing in `backend/tests/`
- [ ] T005 [P] Configure Vitest for frontend testing in `frontend/tests/`
- [ ] T006 [P] Configure Playwright for E2E testing in `backend/tests/E2E/` (or a separate E2E project)
- [ ] T007 [P] Configure Cypress for E2E testing in `frontend/tests/E2E/` (or a separate E2E project)
- [ ] T008 [P] Configure linting and formatting tools for C# and Vue3

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T009 Implement Customer entity model in `backend/src/models/Customer.cs`
- [ ] T010 Create EF Core DbContext for Customer in `backend/src/Data/ApplicationDbContext.cs`
- [ ] T011 Configure EF Core migrations and apply initial migration in `backend/src/`
- [ ] T012 Implement basic API routing and error handling in `backend/src/`
- [ ] T013 Implement basic logging infrastructure in `backend/src/`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - 檢視客戶清單 (Priority: P1) 🎯 MVP

**Goal**: 顯示所有客戶的清單表格。

**Independent Test**: 導航到客戶管理頁面，驗證客戶清單表格的顯示。

### Tests for User Story 1

- [ ] T014 [P] [US1] 後端整合測試：驗證 `GET /api/customers` 能返回客戶清單，在 `backend/tests/IntegrationTests/CustomerControllerTests.cs`
- [ ] T015 [P] [US1] 前端組件測試：驗證客戶清單組件能正確渲染資料，在 `frontend/tests/unit/CustomerList.spec.js`
- [ ] T016 [P] [US1] E2E 測試：驗證客戶管理頁面載入後能顯示客戶清單，在 `frontend/tests/E2E/customer-list.spec.js`

### Implementation for User Story 1

- [ ] T017 [P] [US1] 建立 `CustomerController` 處理 `GET /api/customers` 請求，在 `backend/src/controllers/CustomerController.cs`
- [ ] T018 [P] [US1] 建立 `CustomerService` 處理客戶資料查詢邏輯，在 `backend/src/services/CustomerService.cs`
- [ ] T019 [P] [US1] 建立 `CustomerRepository` 處理 EF Core 資料存取，在 `backend/src/repositories/CustomerRepository.cs`
- [ ] T020 [P] [US1] 建立 Vue3 客戶清單頁面組件 `CustomerListPage.vue`，在 `frontend/src/pages/CustomerListPage.vue`
- [ ] T021 [P] [US1] 建立 Vue3 客戶清單表格組件 `CustomerListTable.vue`，在 `frontend/src/components/CustomerListTable.vue`
- [ ] T022 [US1] 整合前端頁面與後端 API 取得客戶清單，在 `frontend/src/pages/CustomerListPage.vue`

**Checkpoint**: User Story 1 應能獨立運作並進行測試。

---

## Phase 4: User Story 2 - 新增客戶 (Priority: P2)

**Goal**: 透過按鈕新增客戶，並進行基本欄位驗證。

**Independent Test**: 點擊新增按鈕、填寫表單並提交，驗證新客戶是否成功加入清單。

### Tests for User Story 2

- [ ] T023 [P] [US2] 後端整合測試：驗證 `POST /api/customers` 能新增客戶並進行驗證，在 `backend/tests/IntegrationTests/CustomerControllerTests.cs`
- [ ] T024 [P] [US2] 前端組件測試：驗證新增客戶表單組件能正確提交資料和顯示驗證錯誤，在 `frontend/tests/unit/AddCustomerForm.spec.js`
- [ ] T025 [P] [US2] E2E 測試：驗證透過表單新增客戶的流程，在 `frontend/tests/E2E/add-customer.spec.js`

### Implementation for User Story 2

- [ ] T026 [P] [US2] 擴展 `CustomerController` 處理 `POST /api/customers` 請求，在 `backend/src/controllers/CustomerController.cs`
- [ ] T027 [P] [US2] 擴展 `CustomerService` 處理新增客戶邏輯和驗證，在 `backend/src/services/CustomerService.cs`
- [ ] T028 [P] [US2] 建立 Vue3 新增客戶表單組件 `AddCustomerForm.vue`，在 `frontend/src/components/AddCustomerForm.vue`
- [ ] T029 [US2] 整合前端表單與後端 API 提交新客戶資料，在 `frontend/src/pages/CustomerListPage.vue` 或 `frontend/src/pages/AddCustomerPage.vue`

**Checkpoint**: User Story 2 應能獨立運作並進行測試。

---

## Phase 5: User Story 3 - 編輯客戶資料 (Priority: P3)

**Goal**: 點擊清單中的客戶，進入編輯頁面進行資料修改。

**Independent Test**: 點擊清單中的客戶、修改資料並儲存，驗證客戶資料是否成功更新。

### Tests for User Story 3

- [ ] T030 [P] [US3] 後端整合測試：驗證 `GET /api/customers/{id}` 和 `PUT /api/customers/{id}` 能取得和更新客戶資料，在 `backend/tests/IntegrationTests/CustomerControllerTests.cs`
- [ ] T031 [P] [US3] 前端組件測試：驗證編輯客戶表單組件能正確載入資料、提交資料和顯示驗證錯誤，在 `frontend/tests/unit/EditCustomerForm.spec.js`
- [ ] T032 [P] [US3] E2E 測試：驗證點擊客戶進入編輯頁面並更新資料的流程，在 `frontend/tests/E2E/edit-customer.spec.js`

### Implementation for User Story 3

- [ ] T033 [P] [US3] 擴展 `CustomerController` 處理 `GET /api/customers/{id}` 和 `PUT /api/customers/{id}` 請求，在 `backend/src/controllers/CustomerController.cs`
- [ ] T034 [P] [US3] 擴展 `CustomerService` 處理取得和更新客戶邏輯和驗證，在 `backend/src/services/CustomerService.cs`
- [ ] T035 [P] [US3] 建立 Vue3 編輯客戶表單組件 `EditCustomerForm.vue`，在 `frontend/src/components/EditCustomerForm.vue`
- [ ] T036 [US3] 整合前端編輯頁面與後端 API 取得和更新客戶資料，在 `frontend/src/pages/EditCustomerPage.vue`

**Checkpoint**: User Story 3 應能獨立運作並進行測試。

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T037 [P] 文件更新：更新 `README.md` 和 `quickstart.md`
- [ ] T038 程式碼清理和重構
- [ ] T039 效能優化 (根據效能目標)
- [ ] T040 安全性強化 (資料加密、RBAC 實作)
- [ ] T041 額外的單元測試 (如果需要)
- [ ] T042 執行 `quickstart.md` 驗證

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: 無依賴 - 可立即開始
- **Foundational (Phase 2)**: 依賴於 Setup 完成 - 阻擋所有使用者故事
- **User Stories (Phase 3+)**: 都依賴於 Foundational 階段完成
  - 使用者故事可以並行進行 (如果人力充足)
  - 或按優先順序依序進行 (P1 → P2 → P3)
- **Polish (最終階段)**: 依賴於所有預期的使用者故事完成

### User Story Dependencies

- **User Story 1 (P1)**: 可在 Foundational (Phase 2) 後開始 - 不依賴其他故事
- **User Story 2 (P2)**: 可在 Foundational (Phase 2) 後開始 - 可能與 US1 整合，但應能獨立測試
- **User Story 3 (P3)**: 可在 Foundational (Phase 2) 後開始 - 可能與 US1/US2 整合，但應能獨立測試

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
4. 新增 User Story 3 → 獨立測試 → 部署/演示
5. 每個故事都增加價值，而不會破壞以前的故事

### Parallel Team Strategy

有多個開發人員時：

1. 團隊共同完成 Setup + Foundational
2. Foundational 完成後：
   - 開發人員 A: User Story 1
   - 開發人員 B: User Story 2
   - 開發人員 C: User Story 3
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

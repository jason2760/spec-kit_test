# Feature Specification: 人員進出管理系統

**Feature Branch**: `002-personnel-access`  
**Created**: 2025-10-28  
**Status**: Draft  
**Input**: User description: "我現在要做一個人員進出管理系統，人員進出刷卡後，會將刷卡資料寫入DB中，資料包含了工號、姓名、單位名稱、時間戳記、刷卡機編號。系統需要提供一個查詢功能，查詢條件包含時間、單位、姓名。"

## User Scenarios & Testing *(mandatory)*

### User Story 1 - 記錄刷卡資料 (Priority: P1)

作為系統，當人員刷卡進出時，我希望將刷卡資料寫入資料庫中，以便記錄人員的進出情況。

**Why this priority**: 這是人員進出管理系統的核心功能，確保所有進出事件都被記錄。

**Independent Test**: 可以透過模擬刷卡事件，並驗證資料庫中是否新增了包含工號、姓名、單位名稱、時間戳記、刷卡機編號的刷卡資料來獨立測試。

**Acceptance Scenarios**:

1. **Given** 發生刷卡事件，**When** 系統處理該事件，**Then** 刷卡資料（工號、姓名、單位名稱、時間戳記、刷卡機編號）被儲存到資料庫中。

---

### User Story 2 - 查詢進出記錄 (Priority: P1)

作為使用者，我希望能夠透過時間、單位和姓名查詢人員進出記錄，以便審查進出歷史。

**Why this priority**: 這是系統提供給使用者的主要功能，用於追蹤和審查人員進出情況。

**Independent Test**: 可以透過在查詢頁面輸入不同的查詢條件（時間範圍、單位、姓名），並驗證顯示的記錄是否符合條件來獨立測試。

**Acceptance Scenarios**:

1. **Given** 我在進出查詢頁面，**When** 我輸入查詢條件（時間範圍、單位、姓名）並提交，**Then** 顯示符合條件的進出記錄清單。

---

### Edge Cases

- 當資料庫連線失敗時，刷卡資料如何處理？
- 當查詢條件為空時，系統如何處理？
- 當沒有符合查詢條件的記錄時，系統如何顯示？

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: 系統**必須**將刷卡資料寫入資料庫。
- **FR-002**: 刷卡資料**必須**包含工號、姓名、單位名稱、時間戳記和刷卡機編號。
- **FR-003**: 系統**必須**提供人員進出記錄的查詢功能。
- **FR-004**: 查詢功能**必須**支援按時間篩選。
- **FR-005**: 查詢功能**必須**支援按單位篩選。
- **FR-006**: 查詢功能**必須**支援按姓名篩選。
- **FR-007**: 查詢結果**必須**顯示符合條件的進出記錄。

### Key Entities *(include if feature involves data)*

- **進出記錄 (AccessRecord)**: 代表單次刷卡事件。屬性：`工號 (EmployeeID)`、`姓名 (Name)`、`單位名稱 (UnitName)`、`時間戳記 (Timestamp)`、`刷卡機編號 (CardReaderID)`。

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: 99.9% 的刷卡事件在 1 秒內成功記錄到資料庫中。
- **SC-002**: 使用者可以在 3 秒內檢索到最多 10,000 條記錄的查詢結果。
- **SC-003**: 系統能根據所有提供的查詢條件準確篩選進出記錄。

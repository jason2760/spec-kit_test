# Data Model: 人員進出管理系統

## Entities

### 進出記錄 (AccessRecord)
- **Purpose**: 儲存人員的刷卡進出事件。
- **Attributes**:
    - `AccessRecordID` (整數, 主鍵): 進出記錄的唯一識別碼。
    - `EmployeeID` (字串, 必填): 人員的工號。
    - `Name` (字串, 必填): 人員的姓名。
    - `UnitName` (字串, 必填): 人員所屬的單位名稱。
    - `Timestamp` (日期時間, 必填): 刷卡發生的時間。
    - `CardReaderID` (字串, 必填): 刷卡機的編號。
- **Relationships**: 無。
- **Validation Rules**:
    - 所有屬性皆為必填。

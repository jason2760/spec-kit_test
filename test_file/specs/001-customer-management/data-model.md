# Data Model: 客戶資料管理頁面

## Entities

### 客戶 (Customer)
- **Purpose**: 儲存客戶的基本資訊。
- **Attributes**:
    - `CustomerID` (整數, 主鍵): 客戶的唯一識別碼。
    - `CustomerName` (字串, 必填): 客戶的名稱。
    - `ContactPerson` (字串, 可選): 客戶的聯絡人姓名。
    - `PhoneNumber` (字串, 可選): 客戶的電話號碼。
    - `Email` (字串, 必填): 客戶的電子郵件地址。
- **Relationships**: 無。
- **Validation Rules**:
    - `CustomerName`: 不得為空。
    - `Email`: 必須符合有效的電子郵件格式。

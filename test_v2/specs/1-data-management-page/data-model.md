# 階段 1: 資料模型

**日期**: 2025-10-30

## 資料實體: 紀錄 (Record)

代表由使用者輸入的一筆獨立資料。

### 欄位

| 欄位 | 類型   | 描述 | 驗證規則 |
|---|---|---|---|
| id | string | 紀錄的內部唯一識別碼。 | 必須是唯一字串。透過 `crypto.randomUUID()` 產生。 |
| no | string | 使用者提供的「編號」。 | 可為任何字串，不保證唯一。 |
| name | string | 與此紀錄相關的「姓名」。 | 不可為空。 |
| unit | string | 與此紀錄相關的「單位」。 | 不可為空。 |

### 關聯

- 無。這是一個扁平化的紀錄列表。

## 儲存機制

- **系統**: 瀏覽器 `localStorage`
- **鍵 (Key)**: `spec-kit-db`
- **格式**: 一個代表 `Record` 物件陣列的 JSON 字串。

### JSON 結構範例

```json
[
  {
    "id": "f47ac10b-58cc-4372-a567-0e02b2c3d479",
    "no": "EMP-001",
    "name": "John Doe",
    "unit": "Engineering"
  },
  {
    "id": "a1b2c3d4-e5f6-7890-1234-567890abcdef",
    "no": "EMP-002",
    "name": "Jane Smith",
    "unit": "Marketing"
  }
]
```
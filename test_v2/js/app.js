const DB_KEY = 'spec-kit-db';

/**
 * 從 localStorage 獲取所有紀錄。
 * @returns {Array} 紀錄陣列，如果沒有則返回空陣列。
 */
function getAllRecords() {
    const data = localStorage.getItem(DB_KEY);
    return data ? JSON.parse(data) : [];
}

/**
 * 將所有紀錄儲存到 localStorage。
 * @param {Array} records 要儲存的紀錄陣列。
 */
function saveAllRecords(records) {
    localStorage.setItem(DB_KEY, JSON.stringify(records));
}

/**
 * 新增一筆紀錄到 localStorage。
 * @param {object} record - 要新增的紀錄物件，應包含 no, name, unit。
 */
function addRecord(record) {
    const records = getAllRecords();
    const newRecord = {
        id: crypto.randomUUID(), // Generate a unique internal ID
        ...record
    };
    records.push(newRecord);
    saveAllRecords(records);
}

/**
 * 根據 ID 刪除一筆紀錄。
 * @param {string} id 要刪除的紀錄的 ID。
 */
function deleteRecord(id) {
    let records = getAllRecords();
    records = records.filter(record => record.id !== id);
    saveAllRecords(records);
}

/**
 * 根據 ID 更新一筆紀錄。
 * @param {string} id - 要更新的紀錄的 ID。
 * @param {object} updatedData - 包含更新後 no, name, unit 的物件。
 */
function updateRecord(id, updatedData) {
    let records = getAllRecords();
    const recordIndex = records.findIndex(record => record.id === id);
    if (recordIndex > -1) {
        records[recordIndex] = { ...records[recordIndex], ...updatedData };
        saveAllRecords(records);
    }
}

/**
 * 將紀錄陣列渲染成 HTML 表格。
 * @param {Array} records 要渲染的紀錄陣列。
 */
function renderTable(records) {
    const tableContainer = document.getElementById('table-container');
    // 清空現有內容
    tableContainer.innerHTML = '<h2>資料列表</h2>';

    if (!records || records.length === 0) {
        tableContainer.innerHTML += '<p>目前沒有資料。</p>';
        return;
    }

    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>編號</th>
                <th>姓名</th>
                <th>單位</th>
                <th>操作</th>
            </tr>
        </thead>
        <tbody>
        </tbody>
    `;

    const tbody = table.querySelector('tbody');
    records.forEach(record => {
        const tr = document.createElement('tr');
        tr.setAttribute('data-id', record.id);
        tr.innerHTML = `
            <td>${record.no}</td>
            <td>${record.name}</td>
            <td>${record.unit}</td>
            <td>
                <button class="modify-btn">修改</button>
                <button class="delete-btn">刪除</button>
            </td>
        `;
        tbody.appendChild(tr);
    });

    tableContainer.appendChild(table);
}

/**
 * 顯示一個短暫的通知訊息。
 * @param {string} message - 要顯示的訊息。
 */
function showNotification(message) {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    container.appendChild(notification);

    // 自動移除
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// App's entry point
document.addEventListener('DOMContentLoaded', () => {
    const allRecords = getAllRecords();
    renderTable(allRecords);

    const addForm = document.getElementById('add-record-form');
    addForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const noInput = document.getElementById('record-no');
        const nameInput = document.getElementById('record-name');
        const unitInput = document.getElementById('record-unit');

        const newRecord = {
            no: noInput.value,
            name: nameInput.value,
            unit: unitInput.value
        };

        // Basic validation
        if (!newRecord.no || !newRecord.name || !newRecord.unit) {
            alert('所有欄位都必須填寫！');
            return;
        }

        addRecord(newRecord);
        showNotification('紀錄已成功新增！');

        // Clear form and re-render table
        addForm.reset();
        renderTable(getAllRecords());
    });

    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const allRecords = getAllRecords();
        
        const filteredRecords = allRecords.filter(record => {
            // Check if search term exists in any of the record's string values
            return Object.values(record).some(value => 
                String(value).toLowerCase().includes(searchTerm)
            );
        });

        renderTable(filteredRecords);
    });

    const tableContainer = document.getElementById('table-container');
    tableContainer.addEventListener('click', (event) => {
        const target = event.target;
        const recordRow = target.closest('tr');
        if (!recordRow) return;

        const recordId = recordRow.dataset.id;

        if (target.classList.contains('delete-btn')) {
            if (confirm('您確定要刪除這筆資料嗎？')) {
                deleteRecord(recordId);
                showNotification('紀錄已刪除。');
                renderTable(getAllRecords());
            }
        } else if (target.classList.contains('modify-btn')) {
            const cells = recordRow.querySelectorAll('td');
            // Turn cells into input fields, except for the last one (actions)
            for (let i = 0; i < cells.length - 1; i++) {
                const cellValue = cells[i].textContent;
                cells[i].innerHTML = `<input type="text" value="${cellValue}">`;
            }
            // Change button to 'Save'
            target.textContent = '儲存';
            target.classList.remove('modify-btn');
            target.classList.add('save-btn');
        } else if (target.classList.contains('save-btn')) {
            const inputs = recordRow.querySelectorAll('input');
            const updatedData = {
                no: inputs[0].value,
                name: inputs[1].value,
                unit: inputs[2].value
            };
            updateRecord(recordId, updatedData);
            showNotification('紀錄已更新！');
            renderTable(getAllRecords()); // Re-render the whole table to switch back from edit mode
        }
    });
});
# Message Consolidation Plan - WMS_SRS_ver0.1.md

## 🎯 MỤC TIÊU

Gộp các MSG có nội dung trùng lặp thành 1 MSG duy nhất, giảm từ **213 MSG → ~150-160 MSG**

---

## 📋 BẢNG MAPPING MSG CONSOLIDATION

### NHÓM 1: VALIDATION MESSAGES - FORM INPUT

#### MSG 001: "All fields are required" / "All required fields must be filled"

| MSG Code Gốc | Nội dung                              | MSG Giữ Lại | Action                                     |
| ------------ | ------------------------------------- | ----------- | ------------------------------------------ |
| MSG 6        | "All fields are required."            | **MSG 6**   | ✅ KEEP                                    |
| MSG 12       | "All fields are required."            | MSG 6       | ❌ DELETE → Replace all BR refs with MSG 6 |
| MSG 18       | "All fields are required."            | MSG 6       | ❌ DELETE → Replace all BR refs with MSG 6 |
| MSG 33       | "All fields are required."            | MSG 6       | ❌ DELETE → Replace all BR refs with MSG 6 |
| MSG 38       | "All required fields must be filled." | MSG 6       | ❌ DELETE → Replace all BR refs with MSG 6 |
| MSG 49       | "All required fields must be filled." | MSG 6       | ❌ DELETE → Replace all BR refs with MSG 6 |
| MSG 163      | "All required fields must be filled." | MSG 6       | ❌ DELETE → Replace all BR refs with MSG 6 |
| MSG 180      | "All required fields must be filled." | MSG 6       | ❌ DELETE → Replace all BR refs with MSG 6 |

**Total to delete:** 7 messages → Keep MSG 6

---

#### MSG 002: "Invalid email format"

| MSG Code Gốc | Nội dung                | MSG Giữ Lại | Action                                     |
| ------------ | ----------------------- | ----------- | ------------------------------------------ |
| MSG 7        | "Invalid email format." | **MSG 7**   | ✅ KEEP                                    |
| MSG 20       | "Invalid email format." | MSG 7       | ❌ DELETE → Replace all BR refs with MSG 7 |
| MSG 30       | "Invalid email format." | MSG 7       | ❌ DELETE → Replace all BR refs with MSG 7 |
| MSG 39       | "Invalid email format." | MSG 7       | ❌ DELETE → Replace all BR refs with MSG 7 |
| MSG 50       | "Invalid email format." | MSG 7       | ❌ DELETE → Replace all BR refs with MSG 7 |
| MSG 181      | "Invalid email format." | MSG 7       | ❌ DELETE → Replace all BR refs with MSG 7 |

**Total to delete:** 5 messages → Keep MSG 7

---

#### MSG 003: "Phone must be 10-11 digits" / "Phone must be 10 digits"

| MSG Code Gốc | Nội dung                      | MSG Giữ Lại | Action                                     |
| ------------ | ----------------------------- | ----------- | ------------------------------------------ |
| MSG 8        | "Phone must be 10-11 digits." | **MSG 8**   | ✅ KEEP (chọn "10-11" vì linh hoạt hơn)    |
| MSG 21       | "Phone must be 10-11 digits." | MSG 8       | ❌ DELETE → Replace all BR refs with MSG 8 |
| MSG 40       | "Phone must be 10-11 digits." | MSG 8       | ❌ DELETE → Replace all BR refs with MSG 8 |
| MSG 51       | "Phone must be 10-11 digits." | MSG 8       | ❌ DELETE → Replace all BR refs with MSG 8 |
| MSG 164      | "Phone must be 10 digits."    | MSG 8       | ❌ DELETE → Replace all BR refs with MSG 8 |
| MSG 182      | "Phone must be 10 digits."    | MSG 8       | ❌ DELETE → Replace all BR refs with MSG 8 |

**Total to delete:** 5 messages → Keep MSG 8

---

#### MSG 004: "Password must be at least 8 characters with uppercase, lowercase, digit and special character"

| MSG Code Gốc | Nội dung                                                                                         | MSG Giữ Lại | Action                                      |
| ------------ | ------------------------------------------------------------------------------------------------ | ----------- | ------------------------------------------- |
| MSG 13       | "Password must be at least 8 characters with uppercase, lowercase, digit and special character." | **MSG 13**  | ✅ KEEP                                     |
| MSG 22       | "Password must be at least 8 characters with uppercase, lowercase, digit and special character." | MSG 13      | ❌ DELETE → Replace all BR refs with MSG 13 |
| MSG 34       | "Password must be at least 8 characters with uppercase, lowercase, digit and special character." | MSG 13      | ❌ DELETE → Replace all BR refs with MSG 13 |

**Total to delete:** 2 messages → Keep MSG 13

---

### NHÓM 2: CRUD MESSAGES - MASTER DATA

#### MSG 005: "[Entity] name must be 3-100 characters"

| MSG Code Gốc | Entity   | Nội dung                                   | MSG Giữ Lại | Action                                              |
| ------------ | -------- | ------------------------------------------ | ----------- | --------------------------------------------------- |
| MSG 82       | Hall     | "Hall name must be 3-100 characters."      | **MSG 82**  | ✅ KEEP (Generic: "Name must be 3-100 characters.") |
| MSG 88       | Hall     | "Hall name must be 3-100 characters."      | MSG 82      | ❌ DELETE                                           |
| MSG 98       | HallType | "Hall type name must be 3-100 characters." | MSG 82      | ❌ DELETE                                           |
| MSG 104      | HallType | "Hall type name must be 3-100 characters." | MSG 82      | ❌ DELETE                                           |
| MSG 114      | Dish     | "Dish name must be 3-100 characters."      | MSG 82      | ❌ DELETE                                           |
| MSG 120      | Dish     | "Dish name must be 3-100 characters."      | MSG 82      | ❌ DELETE                                           |
| MSG 130      | Service  | "Service name must be 3-100 characters."   | MSG 82      | ❌ DELETE                                           |
| MSG 136      | Service  | "Service name must be 3-100 characters."   | MSG 82      | ❌ DELETE                                           |
| MSG 146      | Shift    | "Shift name must be 3-100 characters."     | MSG 82      | ❌ DELETE                                           |
| MSG 152      | Shift    | "Shift name must be 3-100 characters."     | MSG 82      | ❌ DELETE                                           |

**Total to delete:** 9 messages → Keep MSG 82 (update content to generic)

---

#### MSG 006: "Price must be a positive number"

| MSG Code Gốc | Entity  | MSG Giữ Lại | Action    |
| ------------ | ------- | ----------- | --------- |
| MSG 115      | Dish    | **MSG 115** | ✅ KEEP   |
| MSG 121      | Dish    | MSG 115     | ❌ DELETE |
| MSG 131      | Service | MSG 115     | ❌ DELETE |
| MSG 137      | Service | MSG 115     | ❌ DELETE |

**Total to delete:** 3 messages → Keep MSG 115

---

#### MSG 007: "[Entity] name already exists"

| MSG Code Gốc | Entity   | Nội dung                         | MSG Giữ Lại | Action            |
| ------------ | -------- | -------------------------------- | ----------- | ----------------- |
| MSG 84       | Hall     | "Hall name already exists."      | **MSG 84**  | ✅ KEEP (Generic) |
| MSG 90       | Hall     | "Hall name already exists."      | MSG 84      | ❌ DELETE         |
| MSG 100      | HallType | "Hall type name already exists." | MSG 84      | ❌ DELETE         |
| MSG 106      | HallType | "Hall type name already exists." | MSG 84      | ❌ DELETE         |
| MSG 116      | Dish     | "Dish name already exists."      | MSG 84      | ❌ DELETE         |
| MSG 122      | Dish     | "Dish name already exists."      | MSG 84      | ❌ DELETE         |
| MSG 132      | Service  | "Service name already exists."   | MSG 84      | ❌ DELETE         |
| MSG 138      | Service  | "Service name already exists."   | MSG 84      | ❌ DELETE         |
| MSG 148      | Shift    | "Shift name already exists."     | MSG 84      | ❌ DELETE         |
| MSG 154      | Shift    | "Shift name already exists."     | MSG 84      | ❌ DELETE         |

**Total to delete:** 9 messages → Keep MSG 84 (generic)

---

#### MSG 008: "Failed to create [entity]. Please try again."

| MSG Code Gốc | Entity   | MSG Giữ Lại | Action            |
| ------------ | -------- | ----------- | ----------------- |
| MSG 85       | Hall     | **MSG 85**  | ✅ KEEP (Generic) |
| MSG 101      | HallType | MSG 85      | ❌ DELETE         |
| MSG 117      | Dish     | MSG 85      | ❌ DELETE         |
| MSG 133      | Service  | MSG 85      | ❌ DELETE         |
| MSG 149      | Shift    | MSG 85      | ❌ DELETE         |

**Total to delete:** 4 messages → Keep MSG 85

---

#### MSG 009: "[Entity] created successfully"

| MSG Code Gốc | Entity   | MSG Giữ Lại | Action            |
| ------------ | -------- | ----------- | ----------------- |
| MSG 86       | Hall     | **MSG 86**  | ✅ KEEP (Generic) |
| MSG 102      | HallType | MSG 86      | ❌ DELETE         |
| MSG 118      | Dish     | MSG 86      | ❌ DELETE         |
| MSG 134      | Service  | MSG 86      | ❌ DELETE         |
| MSG 150      | Shift    | MSG 86      | ❌ DELETE         |

**Total to delete:** 4 messages → Keep MSG 86

---

#### MSG 010: "Failed to update [entity]. Please try again."

| MSG Code Gốc | Entity   | MSG Giữ Lại | Action            |
| ------------ | -------- | ----------- | ----------------- |
| MSG 91       | Hall     | **MSG 91**  | ✅ KEEP (Generic) |
| MSG 107      | HallType | MSG 91      | ❌ DELETE         |
| MSG 123      | Dish     | MSG 91      | ❌ DELETE         |
| MSG 139      | Service  | MSG 91      | ❌ DELETE         |
| MSG 155      | Shift    | MSG 91      | ❌ DELETE         |

**Total to delete:** 4 messages → Keep MSG 91

---

#### MSG 011: "[Entity] updated successfully"

| MSG Code Gốc | Entity   | MSG Giữ Lại | Action            |
| ------------ | -------- | ----------- | ----------------- |
| MSG 92       | Hall     | **MSG 92**  | ✅ KEEP (Generic) |
| MSG 108      | HallType | MSG 92      | ❌ DELETE         |
| MSG 124      | Dish     | MSG 92      | ❌ DELETE         |
| MSG 140      | Service  | MSG 92      | ❌ DELETE         |
| MSG 156      | Shift    | MSG 92      | ❌ DELETE         |

**Total to delete:** 4 messages → Keep MSG 92

---

#### MSG 012: "Failed to delete [entity]. Please try again."

| MSG Code Gốc | Entity   | MSG Giữ Lại | Action            |
| ------------ | -------- | ----------- | ----------------- |
| MSG 94       | Hall     | **MSG 94**  | ✅ KEEP (Generic) |
| MSG 110      | HallType | MSG 94      | ❌ DELETE         |
| MSG 126      | Dish     | MSG 94      | ❌ DELETE         |
| MSG 142      | Service  | MSG 94      | ❌ DELETE         |
| MSG 158      | Shift    | MSG 94      | ❌ DELETE         |

**Total to delete:** 4 messages → Keep MSG 94

---

#### MSG 013: "[Entity] deleted successfully"

| MSG Code Gốc | Entity   | MSG Giữ Lại | Action            |
| ------------ | -------- | ----------- | ----------------- |
| MSG 95       | Hall     | **MSG 95**  | ✅ KEEP (Generic) |
| MSG 111      | HallType | MSG 95      | ❌ DELETE         |
| MSG 127      | Dish     | MSG 95      | ❌ DELETE         |
| MSG 143      | Service  | MSG 95      | ❌ DELETE         |
| MSG 159      | Shift    | MSG 95      | ❌ DELETE         |

**Total to delete:** 4 messages → Keep MSG 95

---

#### MSG 014: "No data to export"

| MSG Code Gốc | Context         | MSG Giữ Lại | Action    |
| ------------ | --------------- | ----------- | --------- |
| MSG 96       | Hall Export     | **MSG 96**  | ✅ KEEP   |
| MSG 112      | HallType Export | MSG 96      | ❌ DELETE |
| MSG 128      | Dish Export     | MSG 96      | ❌ DELETE |
| MSG 144      | Service Export  | MSG 96      | ❌ DELETE |
| MSG 160      | Shift Export    | MSG 96      | ❌ DELETE |
| MSG 210      | Report Export   | MSG 96      | ❌ DELETE |

**Total to delete:** 5 messages → Keep MSG 96

---

### NHÓM 3: BOOKING MESSAGES

#### MSG 015: "Hall is already booked for selected date and shift"

| MSG Code Gốc | Context              | MSG Giữ Lại | Action    |
| ------------ | -------------------- | ----------- | --------- |
| MSG 185      | Staff Create Booking | **MSG 185** | ✅ KEEP   |
| MSG 188      | Staff Modify Booking | MSG 185     | ❌ DELETE |

**Total to delete:** 1 message → Keep MSG 185

---

#### MSG 016: "Hall is no longer available for selected date and shift"

| MSG Code Gốc | Context                 | MSG Giữ Lại | Action    |
| ------------ | ----------------------- | ----------- | --------- |
| MSG 167      | Customer Submit Booking | **MSG 167** | ✅ KEEP   |
| MSG 172      | Customer Edit Booking   | MSG 167     | ❌ DELETE |

**Total to delete:** 1 message → Keep MSG 167

---

#### MSG 017: "Wedding date must be in future"

| MSG Code Gốc | Context         | MSG Giữ Lại | Action    |
| ------------ | --------------- | ----------- | --------- |
| MSG 165      | Customer Submit | **MSG 165** | ✅ KEEP   |
| MSG 183      | Staff Create    | MSG 165     | ❌ DELETE |

**Total to delete:** 1 message → Keep MSG 165

---

#### MSG 018: "Cannot load booking details. Please try again."

| MSG Code Gốc | Context       | MSG Giữ Lại | Action    |
| ------------ | ------------- | ----------- | --------- |
| MSG 170      | Customer View | **MSG 170** | ✅ KEEP   |
| MSG 178      | Customer Edit | MSG 170     | ❌ DELETE |

**Total to delete:** 1 message → Keep MSG 170

---

#### MSG 019: "Booking updated successfully"

| MSG Code Gốc | Context       | MSG Giữ Lại | Action    |
| ------------ | ------------- | ----------- | --------- |
| MSG 173      | Customer Edit | **MSG 173** | ✅ KEEP   |
| MSG 189      | Staff Modify  | MSG 173     | ❌ DELETE |

**Total to delete:** 1 message → Keep MSG 173

---

## 📊 TỔNG KẾT CONSOLIDATION

### Thống kê:

- **Total MSG hiện tại:** 213 messages
- **Total MSG sẽ DELETE:** 65 messages
- **Total MSG sau gộp:** 148 messages (213 - 65)
- **Giảm:** 30.5%

### Breakdown by category:

| Category                         | Current | Delete | Remaining |
| -------------------------------- | ------- | ------ | --------- |
| Validation Messages (Form Input) | 19      | 14     | 5         |
| CRUD Messages (Master Data)      | 75      | 47     | 28        |
| Booking Messages                 | 10      | 5      | 5         |
| Other Messages                   | 109     | 0      | 109       |
| **TOTAL**                        | **213** | **66** | **147**   |

---

## 🔧 IMPLEMENTATION PLAN

### Phase 1: Replace BR References (Multi-replace)

Use `multi_replace_string_in_file` to replace all `(Refer to MSG XXX)` → `(Refer to MSG YYY)`

**Example replacements:**

```
(Refer to MSG 12) → (Refer to MSG 6)
(Refer to MSG 18) → (Refer to MSG 6)
(Refer to MSG 33) → (Refer to MSG 6)
...
```

### Phase 2: Delete Duplicate MSG Entries

Remove MSG entries from Messages section (### 5.2 Messages)

### Phase 3: Verification

- Check all BR có reference đúng MSG
- Verify không có MSG nào bị broken reference
- Đảm bảo tất cả MSG còn lại đều unique

---

## ⚠️ LƯU Ý QUAN TRỌNG

1. **KHÔNG đánh số lại MSG:** Giữ nguyên số MSG, chỉ xóa các MSG trùng
2. **Update nội dung MSG generic:** MSG 82, 84, 85, 86, 91, 92, 94, 95 cần update thành generic (bỏ entity name cụ thể)
3. **Test kỹ sau khi replace:** Đảm bảo không có BR nào bị broken reference
4. **Backup trước khi thực hiện:** Commit code trước khi consolidate

---

## ✅ READY TO EXECUTE

File này đã sẵn sàng để thực thi consolidation. Khi bắt đầu:

1. Tạo backup/commit
2. Run Phase 1 (replace BR references)
3. Run Phase 2 (delete duplicate MSGs)
4. Verify và test

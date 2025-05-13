基於 [date-fns](https://date-fns.org/) 與 [date-fns-tz](https://github.com/marnusw/date-fns-tz) 的時間格式化函式，支援不同時間戳記格式、語系與時區調整。  
可接受秒級 (`s`) 或毫秒級 (`ms`) 時間戳記，自動判斷並轉換為適當格式。

---

### 📌 **功能特性**
- **自動識別時間戳記單位**（秒級/毫秒級）
- **支援不同時間格式 (`formatType`)**
- **支援多種語系 (`locale`)**
- **時區調整 (`timezone`)，可使用 `auto` 來應用系統時區**
---

### 🛠 **使用方式**
```ts
import { formatTime } from "@melodybaby";

formatTime(1735660799000); // => "2024-12-31 23:59:59"
formatTime(1735660799); // => "2024-12-31 23:59:59"

// 指定不同格式
formatTime(1735660799000, { formatType: "YMD" }); // => "2024-12-31"
formatTime(1735660799000, { formatType: "MD" }); // => "12-31"
formatTime(1735660799000, { formatType: "HMS" }); // => "23:59:59"

// 指定不同語系
formatTime(1735660799000, { formatType: "YMD", locale: "en-US" }); // => "12-31-2024"
formatTime(1735660799000, { formatType: "YMD", locale: "pt-BR" }); // => "31-12-2024"

// 指定不同時區
formatTime(1735660799000, { formatType: "YMDHMS", timezone: "auto" }); // => "2024-12-31 23:59:59"
formatTime(1735660799000, { formatType: "YMDHMS", timezone: "Asia/Tokyo" }); // => "2025-01-01 00:59:59"
formatTime(1735660799000, { formatType: "YMDHMS", timezone: "+07:00" }); // => "2024-12-31 22:59:59"

// 所有參數
formatTime(1735660799000, { formatType: "YMDHMS", locale: "zh-CN", timezone: "auto" }) // => "2024-12-31 23:59:59"

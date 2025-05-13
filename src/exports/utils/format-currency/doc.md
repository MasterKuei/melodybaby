基於 [decimal.js](https://mikemcl.github.io/decimal.js/) 的貨幣格式化函式。 支援不同貨幣單位，並確保高精度計算與千分位格式。 所有傳入數值皆為該貨幣的最小單位（例如人民幣是分、印尼盾是元），輸出一律為格式化後的「元」。

```ts
import { formatCurrency } from "@melodybaby"

// 基本使用（幣種默認 CNY）
formatCurrency(1); // => "¥0.01"
formatCurrency(100); // => "¥1.00"

// 指定不同貨幣
formatCurrency(1234567, { currency: "USD" }); // => "$12,345.67"
formatCurrency(1234567, { currency: "IDR" }); // => "Rp1,234,567"

// 更改語系（影響千分位與小數點格式）
formatCurrency(1234567, { currency: "IDR", locale: "zh-CN" }); // => "Rp1,234,567"
formatCurrency(1234567, { currency: "IDR", locale: "id-ID" }); // => "Rp1.234.567"

// 控制貨幣符號顯示
formatCurrency(1000, { currency: "CNY", showSymbol: false }); // => "10.00"
formatCurrency(1000, { currency: "USD", showSymbol: false }); // => "10.00"

// 使用縮寫
formatCurrency(1234, { currency: "IDR", notation: true }); // => "Rp1.23K"
formatCurrency(12345678, { currency: "IDR", notation: true }); // => "Rp12.34M"
formatCurrency(123456789012, { currency: "IDR", notation: true }); // => "Rp123.45G"

// 控制小數精度
formatCurrency(100, { currency: "CNY", precision: 0 }); // => "¥1"
formatCurrency(100, { currency: "CNY", precision: 3 }); // => "¥1.000"
formatCurrency(12345678, { currency: "IDR", notation: true, precision: 4 }); // => " Rp12.3456M"
```

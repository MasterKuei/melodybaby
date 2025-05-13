import { describe, expect, test } from "vitest"
import formatCurrency from "."

describe("formatCurrency", () => {
  test("正確格式化人民幣 (CNY)", () => {
    expect(formatCurrency(12345, { currency: "CNY" })).toBe("¥123.45")
  })

  test("測試 notation 模式", () => {
    expect(formatCurrency(1000000, { currency: "IDR", notation: true })).toBe("Rp1.00M")
  })

  test("測試 precision 影響小數點顯示", () => {
    expect(formatCurrency(5000000, { currency: "IDR", precision: 2 })).toBe("Rp5,000,000.00")
  })
})

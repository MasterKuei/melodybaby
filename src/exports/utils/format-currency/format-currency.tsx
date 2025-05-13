import Decimal from "decimal.js"

export type Currency = "CNY" | "IDR" | "USD" | "VND"
export type Locale = "zh-CN" | "en-US" | "id-ID" | "vi-VN"

export type FormatCurrencyOptions = {
  currency: Currency
  locale?: Locale
  showSymbol?: boolean
  notation?: boolean
  precision?: number // 控制小數點後的位數（0 表示不顯示，2 表示顯示兩位）
}

/**
 * 格式化數字，並使用指定的分隔符
 * @param amount 數值 (number)
 * @param thousandSeparator 千分位符號（CNY/USD: ",", IDR/VND: "."）
 * @param decimalSeparator 小數點符號（CNY/USD: ".", IDR/VND: ","）
 * @param precision 強制顯示的小數位數（如 0 表示 `.000` 類型）
 * @returns 格式化後的字串
 */
function formatNumber(amount: number, thousandSeparator: string, decimalSeparator: string, precision: number): string {
  const decimalAmount = new Decimal(amount).toDecimalPlaces(precision, Decimal.ROUND_DOWN)
  let formatted = decimalAmount.toFixed(precision) // 確保固定的小數位數

  const parts = formatted.split(".")
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, thousandSeparator)

  return parts.join(decimalSeparator) // 不論 `decimalPlaces` 為何，都保留小數點後固定位數
}

/**
 * 縮寫數字為 K (千), M (百萬), G (十億), T (兆)
 * @param amount 數值 (number)
 * @returns 縮寫後的數字 (number) 與單位 (string)
 */
function formatNotation(amount: number, decimalPlaces: number): { formatted: number; unit: string } {
  const notationMap = [
    { value: new Decimal(1_000_000_000_000), label: "T" },
    { value: new Decimal(1_000_000_000), label: "G" },
    { value: new Decimal(1_000_000), label: "M" },
    { value: new Decimal(1_000), label: "K" }
  ]

  const decimalAmount = new Decimal(amount) // 確保內部運算避免浮點數誤差

  for (const { value, label } of notationMap) {
    if (decimalAmount.greaterThanOrEqualTo(value)) {
      return { formatted: decimalAmount.div(value).toDecimalPlaces(decimalPlaces, Decimal.ROUND_DOWN).toNumber(), unit: label }
    }
  }

  return { formatted: decimalAmount.toDecimalPlaces(decimalPlaces, Decimal.ROUND_DOWN).toNumber(), unit: "" }
}

const currencyConfig: Record<Currency, { symbol: string; divider: number }> = {
  CNY: { symbol: "¥", divider: 100 },
  IDR: { symbol: "Rp", divider: 1 },
  USD: { symbol: "$", divider: 100 },
  VND: { symbol: "₫", divider: 1 }
}

const localeConfig: Record<Locale, { thousandSeparator: string; decimalSeparator: string }> = {
  "zh-CN": { thousandSeparator: ",", decimalSeparator: "." },
  "en-US": { thousandSeparator: ",", decimalSeparator: "." },
  "id-ID": { thousandSeparator: ".", decimalSeparator: "," },
  "vi-VN": { thousandSeparator: ".", decimalSeparator: "," }
}

/**
 * 格式化貨幣數值
 * @param amount 金額（最小單位，如分、角、美分）
 * @param options 設定物件（包含貨幣類型、語系、是否顯示符號等）
 * @returns 格式化後的貨幣字串
 */
export default function formatCurrency(amount: number, options?: FormatCurrencyOptions): string {
  const { currency = "CNY", locale = "zh-CN", showSymbol = true, notation = false, precision } = options ?? {}
  const { symbol, divider } = currencyConfig[currency]
  const { thousandSeparator, decimalSeparator } = localeConfig[locale]

  const amountInBaseUnit = new Decimal(amount).div(divider).toNumber()

  // 計算應該使用的小數位數（如果 `precision` 未提供）
  const calculatedPrecision = Math.log10(divider)
  const finalPrecision = precision ?? (notation ? 2 : Math.max(0, calculatedPrecision))

  if (notation) {
    const { formatted, unit } = formatNotation(amountInBaseUnit, finalPrecision)
    return `${showSymbol ? symbol : ""}${formatNumber(formatted, thousandSeparator, decimalSeparator, finalPrecision)}${unit}`
  }

  return `${showSymbol ? symbol : ""}${formatNumber(amountInBaseUnit, thousandSeparator, decimalSeparator, finalPrecision)}`
}

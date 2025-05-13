import { format } from "date-fns"
import { toZonedTime } from "date-fns-tz"
import Decimal from "decimal.js"
import { isNil, isNaN, isFinite } from "lodash-es"
import type { Locale } from "../../types"
// export type Locale = "zh-CN" | "en-US" | "id-ID" | "vi-VN" | "pt-BR";
export type FormatType = "YMDHMS" | "YMD" | "MD" | "MDHMS" | "HMS"

interface FormatTimeOptions {
  /**
   * 時間格式類型
   * - `"YMDHMS"`：年月日時分秒，例如 `2024-12-31 23:59:59`
   * - `"YMD"`：年月日，例如 `2024-12-31`
   * - `"MD"`：月日，例如 `12-31`
   * - `"MDHMS"`：月日時分秒，例如 `12-31 23:59:59`
   * - `"HMS"`： 時分秒，例如 `23:59:59`
   * - 預設值是 `"YMDHMS"`
   */
  formatType?: FormatType
  /**
   * 語系
   * - `"zh-CN"`：中文-中國
   * - `"en-US"`：英文-美國
   * - `"id-ID"`：印尼文-印尼
   * - `"vi-VN"`：越南文-越南
   * - `"pt-BR"`：葡萄牙文-巴西
   * - 預設值是 `"zh-CN"`
   */
  locale?: Locale // 語系，預設 "zh-CN"
  /**
   * 時區
   * - 可以是 `auto`，代表使用系統時區
   * - 可以是時區偏移值（例如 `"+08:00"` 或 `"-05:00"`）
   * - 或者是 IANA 時區名稱（例如 `"Asia/Taipei"` 或 `"America/New_York"`）
   * - 預設值是 `"auto"`
   */
  timezone?: string // 時區，預設系統時區
}

const s = "-"
const timeFormat = "HH:mm:ss"

const formats: Record<Locale, Record<FormatType, string>> = {
  "zh-CN": { YMD: `yyyy${s}MM${s}dd`, YMDHMS: `yyyy${s}MM${s}dd ${timeFormat}`, MD: `MM${s}dd`, MDHMS: `MM${s}dd ${timeFormat}`, HMS: timeFormat },
  "en-US": { YMD: `MM${s}dd${s}yyyy`, YMDHMS: `MM${s}dd${s}yyyy ${timeFormat}`, MD: `MM${s}dd`, MDHMS: `MM${s}dd ${timeFormat}`, HMS: timeFormat },
  "id-ID": { YMD: `dd${s}MM${s}yyyy`, YMDHMS: `dd${s}MM${s}yyyy ${timeFormat}`, MD: `dd${s}MM`, MDHMS: `dd${s}MM ${timeFormat}`, HMS: timeFormat },
  "vi-VN": { YMD: `dd${s}MM${s}yyyy`, YMDHMS: `dd${s}MM${s}yyyy ${timeFormat}`, MD: `dd${s}MM`, MDHMS: `dd${s}MM ${timeFormat}`, HMS: timeFormat },
  "pt-BR": { YMD: `MM${s}dd${s}yyyy`, YMDHMS: `MM${s}dd${s}yyyy ${timeFormat}`, MD: `MM${s}dd`, MDHMS: `MM${s}dd ${timeFormat}`, HMS: timeFormat }
}

const isMillisecond = (timestamp: number): boolean => {
  return Math.abs(timestamp) > 10 ** 11
}

/**
 * 格式化時間
 * @param value 時間戳記 (毫秒或秒)
 * @param options 格式化選項
 * @returns 格式化後的日期字串
 */
export default function formatTime(value?: number, options: FormatTimeOptions = {}) {
  if (isNil(value) || isNaN(value) || !isFinite(value)) {
    return "-"
  }

  // 取得選項參數，並提供預設值
  const { formatType = "YMDHMS", locale = "zh-CN", timezone = "auto" } = options
  const milliseconds = isMillisecond(value) ? value : Decimal.mul(value, 1000).toNumber()
  const date = timezone === "auto" ? new Date(milliseconds) : toZonedTime(new Date(milliseconds), timezone)
  return format(date, formats[locale][formatType])
}

formatTime(10000, {
  formatType: "HMS",
  locale: "zh-CN",
  timezone: "auto"
})

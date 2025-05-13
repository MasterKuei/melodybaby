import type { Meta, StoryObj } from "@storybook/react"
import formatTime, { FormatType } from "./"
import type { Locale } from "../../types"
//@ts-expect-error
import doc from "./doc.md?raw"

const meta = {
  title: "工具函數/formatTime",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: doc
      }
    }
  },
  argTypes: {
    value: {
      control: { type: "number" },
      type: { required: true, name: "number" },
      description: "要格式化的時間戳記（毫秒或秒級）。"
    },
    formatType: {
      control: { type: "select" },
      options: ["YMDHMS", "YMD", "MD", "MDHMS", "HMS"],
      description: "時間格式類型。",
      table: {
        defaultValue: { summary: "YMDHMS" }
      }
    },
    locale: {
      control: { type: "select" },
      options: ["zh-CN", "en-US", "id-ID", "vi-VN", "pt-BR"],
      description: "日期顯示語系。",
      table: {
        defaultValue: { summary: "zh-CN" }
      }
    },
    timezone: {
      control: { type: "select" },
      options: ["auto", "+08:00", "+06:00", "+07:00", "Asia/Tokyo"],
      description: "時區，可以是 `auto`（本地）、時區偏移值（+08:00）或 IANA 時區名稱（Asia/Tokyo）。",
      table: {
        defaultValue: { summary: "auto" }
      }
    }
  }
} satisfies Meta

export default meta

type Story = StoryObj<{ value: number; formatType: FormatType; locale: Locale; timezone: string }>

export const Default: Story = {
  args: {
    value: 1735660799000, // 示例時間戳記
    formatType: "YMDHMS",
    locale: "zh-CN",
    timezone: "auto"
  },
  render: ({ value, formatType, locale, timezone }) => {
    return (
      <div>
        <b>時間戳記(value): </b> {value}
        <br />
        <b>語系(locale): </b>
        {locale}
        <br />
        <b>時間格式(formatType): </b>
        {formatType}
        <br />
        <b>時區(timezone): </b>
        {timezone}
        <br />
        <b>返回值: </b> {formatTime(value, { formatType, locale, timezone })}
      </div>
    )
  }
}

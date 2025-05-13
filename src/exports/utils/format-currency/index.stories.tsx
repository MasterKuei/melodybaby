import type { Meta, StoryObj } from "@storybook/react"
import formatCurrency, { FormatCurrencyOptions } from "./"
//@ts-expect-error
import doc from "./doc.md?raw"

const meta: Meta = {
  title: "工具函數/formatCurrency",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: doc
      }
    }
  },
  argTypes: {
    amount: {
      control: { type: "number" },
      type: { required: true, name: "number" },
      description: "要轉換的金額，單位為該貨幣的最小單位，例如 CNY 為分（0.01元）。"
    },
    currency: {
      control: { type: "select" },
      options: ["CNY", "IDR", "USD", "VND"],
      description: "貨幣類型",
      table: {
        defaultValue: { summary: "CNY" }
      }
    },
    locale: {
      control: { type: "select" },
      options: ["zh-CN", "en-US", "id-ID", "vi-VN"],
      description: "數字格式語系（影響千分位與小數點符號）。",
      table: {
        defaultValue: { summary: "zh-CN" }
      }
    },
    showSymbol: {
      control: { type: "boolean" },
      description: "是否顯示貨幣符號。",
      table: {
        defaultValue: { summary: "true" }
      }
    },
    notation: {
      control: { type: "boolean" },
      description: "是否使用縮寫(K, M, G, T )",
      table: {
        defaultValue: { summary: "false" }
      }
    },
    precision: {
      control: { type: "number", min: 0, step: 1 },
      description: "小數點顯示位數"
    }
  }
} satisfies Meta

export default meta

type Story = StoryObj<{ amount: number } & FormatCurrencyOptions>

export const Default: Story = {
  args: {
    amount: 1234567,
    currency: "CNY",
    locale: "zh-CN",
    showSymbol: true,
    notation: false
  },
  render: ({ amount, ...options }) => {
    return (
      <div>
        <b>語系：</b>
        {options.locale}
        <br />
        <b>貨幣類型：</b>
        {options.currency}
        <br />
        <b>顯示符號：</b>
        {options.showSymbol ? "是" : "否"}
        <br />
        <b>縮寫(K,M,G,T)：</b>
        {options.notation ? "是" : "否"}
        <br />
        <b>精度：</b>
        {options.precision !== undefined ? options.precision : "不限制"}
        <br />
        <b>格式化前：</b> {amount}
        <br />
        <b>格式化後：</b> {formatCurrency(amount, options)}
      </div>
    )
  }
}

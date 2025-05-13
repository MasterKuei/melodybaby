import type { Meta, StoryObj } from "@storybook/react"
import Layout from "./"

const meta = {
  title: "組件/Layout",
  component: Layout,
  tags: ["autodocs"],
  argTypes: {
    onMenuClick: { action: "menu點擊" }
  }
} satisfies Meta<typeof Layout>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    menu: [
      { name: "頁面1", path: "/page/1" },
      {
        name: "頁面2",
        children: [
          { name: "頁面2-1", path: "/page/2-1" },
          { name: "頁面2-2", path: "/page/2-2" },
          { name: "頁面2-3", path: "/page/2-3" }
        ]
      },
      {
        name: "頁面3",
        children: [
          { name: "頁面3-1", path: "/page/3-1" },
          { name: "頁面3-2", path: "/page/3-2" },
          {
            name: "頁面3-3",
            children: [
              { name: "頁面3-3-1", path: "/page/3-3-1" },
              { name: "頁面3-3-2", path: "/page/3-3-2" },
              { name: "頁面3-3-3", path: "/page/3-3-3" }
            ]
          }
        ]
      }
    ],
    toolBar: "右上角工具欄",
    children: "頁面內容",
    title: "網頁標題"
  }
}

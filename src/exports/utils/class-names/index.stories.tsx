import type { Meta, StoryObj } from "@storybook/react"
import classNames from "./"
//@ts-expect-error
import doc from "./doc.md?raw"

const meta: Meta = {
  title: "工具函數/classNames",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: doc
      }
    }
  }
} satisfies Meta

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    args: ["px-2", "py-1", "p-3", "bg-red", "bg-blue", "bg-green"]
  },
  argTypes: {
    args: {
      control: { type: "object" },
      description: "輸入類名陣列"
    }
  },
  render: ({ args }) => {
    return (
      <div>
        <strong>輸入參數：</strong> {JSON.stringify(args)}
        <br />
        <strong>輸出：</strong> {`"${classNames(...args)}"`}
      </div>
    )
  }
}

// export const Default: Story = {
//   args: {
//     className: "px-2 py-1 p-3 bg-red bg-blue",
//   },
//   render: () => {
//     return (
//       <div style={{ fontFamily: "monospace", padding: "20px" }}>
//         <h3>classNames 使用示例</h3>
//         <pre>
//           {classNames("px-2", "py-1", "p-3", "bg-red", "bg-blue")}
//         </pre>
//       </div>
//     );
//   },
// };

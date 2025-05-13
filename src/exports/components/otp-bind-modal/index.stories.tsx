import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "antd"
import { useArgs } from "@storybook/preview-api"
import OTPBindModal from "./"

const meta = {
  title: "組件/OTPBindModal",
  component: OTPBindModal,
  tags: ["autodocs"]
} satisfies Meta<typeof OTPBindModal>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    secretKey: "我是 secretKey",
    qrcode: {
      type: "url",
      value: "https://example.com/"
    }
  },
  render: (args) => {
    const [{ open }, updateArgs] = useArgs()
    const openModal = () => {
      updateArgs({ open: true })
    }
    const closeModal = () => {
      updateArgs({ open: false })
    }
    return (
      <>
        <Button type="primary" onClick={openModal}>
          點擊開啟
        </Button>
        <OTPBindModal {...args} open={open} onCancel={closeModal} onFinish={closeModal} />
      </>
    )
  }
}

import type { Meta, StoryObj } from "@storybook/react"
import LoginForm from "./"

const meta = {
  title: "組件/LoginForm",
  component: LoginForm,
  tags: ["autodocs"]
} satisfies Meta<typeof LoginForm>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: "管理後台系統"
  }
}

export const ShowOTPInput: Story = {
  args: {
    title: "管理後台系統",
    showOTPInput: true
  }
}

import React from "react"
import { App, ConfigProvider } from "antd"
import zhCN from "antd/locale/zh_CN"
import "antd/dist/reset.css"

import type { Preview } from "@storybook/react"
import "../src/style.css"
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <ConfigProvider locale={zhCN}>
        <App>
          <Story />
        </App>
      </ConfigProvider>
    )
  ]
}

export default preview

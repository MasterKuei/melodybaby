import { LockOutlined, SafetyCertificateOutlined, UserOutlined } from "@ant-design/icons"
import { Button, Checkbox, Flex, Form, Input, Typography, message } from "antd"

interface FormField {
  username: string
  password: string
  otp?: string
  remember: boolean
}

export interface LoginFormProps {
  /** 標題 */
  title?: string
  /** 是否顯示一次性密碼輸入框 */
  showOTPInput?: boolean
  /** 表單驗證完成的回調函數 */
  onFinish?: (values: FormField) => void
  /** 登入按鈕 loading 狀態 */
  loading?: boolean
}

/** 登入介面組件 */
const LoginForm = (props: LoginFormProps) => {
  const [messageApi, contextHolder] = message.useMessage()
  return (
    <div>
      {props.title && (
        <Typography.Title level={2} className="m:text-center m:mt-0">
          {props.title}
        </Typography.Title>
      )}
      <Form<FormField>
        name="login"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          props.onFinish?.(values)
        }}
      >
        <Form.Item name="username" rules={[{ required: true, message: "请输入此栏位" }]}>
          <Input prefix={<UserOutlined />} placeholder="用户名" autoComplete="username" />
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: "请输入此栏位" }]}>
          <Input prefix={<LockOutlined />} type="password" placeholder="密码" autoComplete="current-password" />
        </Form.Item>
        {props.showOTPInput && (
          <Form.Item name="otp" rules={[{ required: true, message: "请输入此栏位" }]}>
            <Input prefix={<SafetyCertificateOutlined />} placeholder="谷歌动态口令" />
          </Form.Item>
        )}

        <Form.Item>
          <Flex justify="space-between" align="center">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住用户</Checkbox>
            </Form.Item>
            <Typography.Link
              onClick={() => {
                messageApi.info("请联系管理员")
              }}
            >
              忘记密码
            </Typography.Link>
          </Flex>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit" loading={props.loading}>
            登录
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </div>
  )
}

export default LoginForm

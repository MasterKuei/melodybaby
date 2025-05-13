import { Form, Input, Modal, QRCode } from "antd"
import { useEffect } from "react"

export interface OTPBindModalProps {
  open?: boolean
  onCancel?: () => void
  onOk?: () => void
  onFinish?: (values: FormField) => void
  qrcode?: {
    type: "base64" | "url"
    value: string
  }
  secretKey?: string
}

interface FormField {
  otp: string
}

const BindQRCode = (props: { type: "base64" | "url"; value: string }) => {
  if (props.type === "base64") {
    return (
      <div>
        <img src={props.value} alt="QR Code" />
      </div>
    )
  }
  if (props.type === "url") {
    return (
      <div>
        <QRCode value={props.value} bordered={false} />
      </div>
    )
  }
  return null
}

/** 綁定 OTP 驗證器的彈窗 UI */
const OTPBindModal = ({ open = false, secretKey = "", onCancel, onOk, onFinish, qrcode }: OTPBindModalProps) => {
  const [form] = Form.useForm()
  useEffect(() => {
    if (!open) {
      form.resetFields()
    }
  }, [open])

  return (
    <Modal
      open={open}
      onCancel={() => {
        onCancel?.()
      }}
      onOk={() => {
        onOk?.()
        form.submit()
      }}
    >
      <Form<FormField>
        form={form}
        name="otpBindForm"
        initialValues={{ remember: true }}
        onFinish={(values) => {
          onFinish?.(values)
        }}
      >
        {qrcode && <BindQRCode type={qrcode.type} value={qrcode.value} />}
        <p>{secretKey}</p>
        <Form.Item name="otp" rules={[{ required: true, message: "请输入此栏位" }]}>
          <Input placeholder="驗證碼" />
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default OTPBindModal

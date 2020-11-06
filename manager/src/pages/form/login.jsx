import { Card, Form, Input, Button } from 'antd'
import React from 'react'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
export default class Login extends React.Component {
	onFinish = (values) => {
		console.log('Finish:', values)
	}
	render() {
		const [form] = Form.useForm()
		// const [, forceUpdate] = useState()
		return (
			<div>
				<Card title="登录行内表单">
					<Form
						form={form}
						name="horizontal_login"
						layout="inline"
						onFinish={this.onFinish}
					>
						<Form.Item
							name="username"
							rules={[
								{
									required: true,
									message: 'Please input your username!',
								},
							]}
						>
							<Input
								prefix={
									<UserOutlined className="site-form-item-icon" />
								}
								placeholder="Username"
							/>
						</Form.Item>
						<Form.Item
							name="password"
							rules={[
								{
									required: true,
									message: 'Please input your password!',
								},
							]}
						>
							<Input
								prefix={
									<LockOutlined className="site-form-item-icon" />
								}
								type="password"
								placeholder="Password"
							/>
						</Form.Item>
						<Form.Item shouldUpdate={true}>
							{() => (
								<Button
									type="primary"
									htmlType="submit"
									disabled={
										!form.isFieldsTouched(true) ||
										form
											.getFieldsError()
											.filter(
												({ errors }) => errors.length
											).length
									}
								>
									Log in
								</Button>
							)}
						</Form.Item>
					</Form>
				</Card>
			</div>
		)
	}
}

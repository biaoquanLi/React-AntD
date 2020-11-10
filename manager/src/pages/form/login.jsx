import { Card, Form, Input, Button, Checkbox } from 'antd'
import React from 'react'
import './form.less'

export default class Login extends React.Component {
	onFinish = (values) => {
		console.log('Success:', values)
	}

	onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo)
	}
	render() {
		return (
			<div style={{ width: '100%' }}>
				<Card title="登录行内表单" className="card-wrap">
					<Form
						layout="inline"
						name="basic"
						initialValues={{
							remember: true,
						}}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
					>
						<Form.Item
							label="用户名"
							name="username"
							rules={[
								{
									required: true,
									message: '请输入用户名!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="密码"
							name="password"
							rules={[
								{
									required: true,
									message: '请输入密码!',
								},
							]}
						>
							<Input.Password />
						</Form.Item>

						<Form.Item>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
						</Form.Item>
					</Form>
				</Card>
				<Card title="登录水平表单" className="card-wrap">
					<Form
						initialValues={{ remember: true }}
						onFinish={this.onFinish}
						onFinishFailed={this.onFinishFailed}
						labelCol={{ span: 8, offset: 0 }}
						wrapperCol={{ span: 8 }}
						layout="vertical"
					>
						<Form.Item
							label="用户名"
							name="username"
							rules={[
								{
									required: true,
									message: '请输入用户名!',
								},
							]}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label="密码"
							name="password"
							rules={[
								{
									required: true,
									message: '请输入密码!',
								},
							]}
						>
							<Input.Password />
						</Form.Item>
						<Form.Item name="remember" valuePropName="checked">
							<Checkbox>记住密码</Checkbox>
							<a href="#" style={{ float: 'right' }}>
								忘记密码
							</a>
						</Form.Item>
						<Form.Item>
							<Button type="primary" htmlType="submit">
								登录
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		)
	}
}

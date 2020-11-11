import React from 'react'
import {
	Form,
	Card,
	Input,
	Radio,
	InputNumber,
	Select,
	Switch,
	DatePicker,
	TimePicker,
	Upload,
	message,
	Checkbox,
	Button,
} from 'antd'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import moment from 'moment'
const { Option } = Select
const { TextArea } = Input
const stateList = [
	{
		title: '北大才子一枚0',
		value: 0,
	},
	{
		title: '北大才子一枚1',
		value: 1,
	},
	{
		title: '北大才子一枚2',
		value: 2,
	},
]
const hobbyList = [
	{
		title: '爬山',
		value: 0,
	},
	{
		title: '打篮球',
		value: 1,
	},
	{
		title: '踢足球',
		value: 2,
	},
	{
		title: '唱歌',
		value: 3,
	},
]
function getBase64(img, callback) {
	const reader = new FileReader()
	reader.addEventListener('load', () => callback(reader.result))
	reader.readAsDataURL(img)
}
export default class Register extends React.Component {
	state = {
		birthday: null,
		riseTime: null,
		loading: false,
		imageUrl: '',
		sex: 0,
		isRead: false,
		birthdayStr: '',
		riseTimeStr: '',
	}
	onFinish = (values) => {
		console.log(values)
	}
	onChangeBirthday = (date, dateString) => {
		console.log(date, dateString)
		this.setState({
			birthday: date,
			birthdayStr: dateString,
		})
	}
	onChangeRise = (time, timeString) => {
		console.log(time, timeString)
		this.setState({
			riseTime: time,
			riseTimeStr: timeString,
		})
	}
	onChangeIsRead = (e) => {
		console.log(e.target.checked)
		this.setState({
			isRead: e.target.checked,
		})
	}
	beforeUpload = (file) => {
		const isJpgOrPng =
			file.type === 'image/jpeg' || file.type === 'image/png'
		if (!isJpgOrPng) {
			message.error('You can only upload JPG/PNG file!')
		}
		const isLt2M = file.size / 1024 / 1024 < 2
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!')
		}
		return isJpgOrPng && isLt2M
	}
	handleChangeImg = (info) => {
		if (info.file.status === 'uploading') {
			this.setState({ loading: true })
			return
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			getBase64(info.file.originFileObj, (imageUrl) =>
				this.setState({
					imageUrl,
					loading: false,
				})
			)
		}
	}
	render() {
		const { loading, imageUrl } = this.state
		const uploadButton = (
			<div>
				{loading ? <LoadingOutlined /> : <PlusOutlined />}
				<div style={{ marginTop: 8 }}>上传</div>
			</div>
		)
		return (
			<div style={{ width: '100%' }}>
				<Card title="注册表单">
					<Form
						labelCol={{ span: 7 }}
						wrapperCol={{ span: 9 }}
						onFinish={this.onFinish}
						initialValues={{
							isRead: false,
							isMarry: false,
							sex: 1,
						}}
					>
						<Form.Item
							label="用户名"
							name="userName"
							rules={[
								{
									required: true,
									message: '请输入用户名!',
								},
							]}
						>
							<Input placeholder="请输入用户名" />
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
							<Input placeholder="请输入密码" />
						</Form.Item>
						<Form.Item label="性别" name="sex">
							<Radio.Group defaultValue={this.state.sex}>
								<Radio value={0}>女</Radio>
								<Radio value={1}>男</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item label="年龄" name="age">
							<InputNumber min={1} max={150} />
						</Form.Item>
						<Form.Item label="当前状态" name="state">
							<Select allowClear placeholder="请选择状态">
								{stateList.map((item) => (
									<Option value={item.value}>
										{item.title}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label="爱好" name="hobby">
							<Select
								allowClear
								placeholder="请选择爱好"
								mode="multiple"
							>
								{hobbyList.map((item) => (
									<Option value={item.value}>
										{item.title}
									</Option>
								))}
							</Select>
						</Form.Item>
						<Form.Item label="是否已婚" name="isMarry">
							<Switch />
						</Form.Item>
						<Form.Item label="生日" name="birthday">
							<DatePicker
								value={this.state.birthday}
								onChange={this.onChangeBirthday}
								placeholder="请选择日期"
							/>
						</Form.Item>
						<Form.Item label="联系地址" name="address">
							<TextArea />
						</Form.Item>
						<Form.Item label="早起时间" name="riseTime">
							<TimePicker
								value={this.state.riseTime}
								onChange={this.onChangeRise}
								placeholder="请选择时间"
							/>
						</Form.Item>
						<Form.Item label="头像" name="urlImg">
							<Upload
								name="avatar"
								listType="picture-card"
								className="avatar-uploader"
								showUploadList={false}
								action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
								beforeUpload={this.beforeUpload}
								onChange={this.handleChangeImg}
							>
								{imageUrl ? (
									<img
										src={imageUrl}
										alt="avatar"
										style={{ width: '100%' }}
									/>
								) : (
									uploadButton
								)}
							</Upload>
						</Form.Item>
						<Form.Item
							wrapperCol={{ span: 9, offset: 7 }}
							name="isRead"
							valuePropName="checked"
						>
							<Checkbox onChange={this.onChangeIsRead}>
								我已阅读过
								<span style={{ color: 'blue' }}>慕课协议</span>
							</Checkbox>
						</Form.Item>
						<Form.Item wrapperCol={{ span: 9, offset: 7 }}>
							<Button type="primary" htmlType="submit">
								注册
							</Button>
						</Form.Item>
					</Form>
				</Card>
			</div>
		)
	}
}

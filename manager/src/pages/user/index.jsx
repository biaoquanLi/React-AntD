import React from 'react'
import {
	Table,
	Card,
	Button,
	Modal,
	message,
	Form,
	Select,
	Input,
	Radio,
} from 'antd'
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import FilterForm from '../../components/filterForm/filterForm'
import axios from '../../axios/index'
import Util from '../../utils/utils'
const { confirm } = Modal
const { Option } = Select
const { TextArea } = Input
export default class User extends React.Component {
	formRef = React.createRef()
	state = {
		loading: true,
		list: [],
		pagination: null,
		orderId: '',
		record: null,
		modalTitle: '',
		visible: false,
	}
	requestList = (current = 1) => {
		axios
			.ajxa({
				url: '/user/list',
				data: {
					params: {
						current,
					},
				},
			})
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						list: res.data.list,
						isLoading: false,
						pagination: Util.pagination(res.data, (current) => {
							this.request(current)
						}),
					})
				}
			})
	}
	getSearchParams = (params) => {
		console.log(params)
	}
	userOperate = (type) => {
		if (type === 'add') {
			this.setState({
				record: null,
				modalTitle: '创建员工',
				visible: true,
			})
		} else {
			if (this.state.orderId) {
				if (type === 'edit') {
					this.setState({
						modalTitle: '编辑员工',
						visible: true,
					})
					this.formRef.current.setfildsValue({ username: 2222 })
				} else if (type === 'detail') {
					this.setState({
						modalTitle: '员工详情',
						visible: true,
					})
				} else {
					confirm({
						title: '删除',
						content: '确定要删除该员工?',
						icon: <DeleteOutlined />,
						onOk: () => {
							axios
								.ajxa({
									url: '/user/delete',
									data: {
										params: {
											orderId: this.state.orderId,
										},
									},
								})
								.then((res) => {
									if (res.code === 200) {
										message.success('删除成功')
										this.requestList()
									}
								})
						},
						onCancel() {
							console.log('Cancel')
						},
					})
				}
			} else {
				Modal.info({
					title: '信息',
					content: (
						<div>
							<p>请先选择一条用户信息</p>
						</div>
					),
				})
			}
		}
	}
	handleSubmit = (modalTitle) => {
		const params = this.formRef.current.getFieldsValue()
		if (this.state.orderId && modalTitle === '编辑员工') {
			params.id = this.state.orderId
		}
		console.log(333, params)
		this.setState({
			visible: false,
		})
		axios
			.ajxa({
				url: `/user/${modalTitle === '创建员工' ? 'add' : 'edit'}`,
				data: {
					params,
				},
			})
			.then((res) => {
				if (res.code === 200) {
					message.success(res.msg)
					this.formRef.current.resetFields()
					this.requestList()
				}
			})
	}
	componentDidMount() {
		this.requestList()
	}
	render() {
		const formList = [
			{
				type: 'Input',
				name: 'username',
				placeholder: '请输入用户名',
				width: 130,
			},
			{
				type: 'Password',
				name: 'password',
				placeholder: '请输入密码',
				width: 130,
			},
		]
		const columns = [
			{
				title: 'id',
				dataIndex: 'id',
			},
			{
				title: '性别',
				dataIndex: 'sex',
				render(sex) {
					return sex === 1 ? '男' : '女'
				},
			},
			{
				title: '状态',
				dataIndex: 'state',
				render(state) {
					let config = {
						1: '咸鱼一条',
						2: '风华浪子',
						3: '北大才子',
						4: '百度FE',
						5: '创业者',
					}
					return config[state]
				},
			},
			{
				title: '爱好',
				dataIndex: 'interest',
				render(interest) {
					let config = {
						1: '游泳',
						2: '打篮球',
						3: '踢足球',
						4: '跑步',
						5: '爬山',
						6: '骑行',
						7: '桌球',
						8: '麦霸',
					}
					return config[interest]
				},
			},
			{
				title: '是否已婚',
				dataIndex: 'isMarried',
				render(isMarried) {
					return isMarried ? '已婚' : '未婚'
				},
			},
			{
				title: '生日',
				dataIndex: 'birthday',
			},
			{
				title: '联系地址',
				dataIndex: 'address',
			},
			{
				title: '早起时间',
				dataIndex: 'time',
			},
		]
		const rowSelection = {
			type: 'radio',
			onSelect: (record) => {
				this.setState({ orderId: record.id, record })
			},
		}
		return (
			<div style={{ width: '100%' }}>
				<Card>
					<FilterForm
						handleSearch={this.getSearchParams}
						formList={formList}
					/>
				</Card>
				<Card style={{ marginTop: 10 }}>
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => {
							this.userOperate('add')
						}}
					>
						创建员工
					</Button>
					<Button
						style={{ marginLeft: 10 }}
						icon={<EditOutlined />}
						onClick={() => {
							this.userOperate('edit')
						}}
					>
						编辑员工
					</Button>
					<Button
						style={{ marginLeft: 10 }}
						onClick={() => {
							this.userOperate('detail')
						}}
					>
						员工详情
					</Button>
					<Button
						icon={<DeleteOutlined />}
						danger
						style={{ marginLeft: 10 }}
						onClick={() => {
							this.userOperate('delete')
						}}
					>
						删除员工
					</Button>
				</Card>
				<div className="content-wrap">
					<Table
						bordered
						rowSelection={rowSelection}
						loading={this.state.isLoading}
						columns={columns}
						dataSource={this.state.list}
						pagination={this.state.pagination}
						rowKey={(record) => record.id}
					/>
				</div>
				<Modal
					title={this.state.modalTitle}
					visible={this.state.visible}
					onCancel={() => {
						this.setState({ visible: false })
					}}
					onOk={() => {
						this.handleSubmit(this.state.modalTitle)
					}}
					okText="确定"
					cancelText="取消"
				>
					<Form
						layout="horizontal"
						ref={this.formRef}
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 18 }}
						initialValues={{ sex: 1 }}
					>
						<Form.Item label="姓名" name="username">
							<Input placeholder="请输入姓名" />
						</Form.Item>
						<Form.Item label="性别" name="sex">
							<Radio.Group>
								<Radio value={1}>男</Radio>
								<Radio value={2}>女</Radio>
							</Radio.Group>
						</Form.Item>
						<Form.Item label="状态" name="state">
							<Select placeholder="请选择状态">
								<Option value={1}>咸鱼一条</Option>
								<Option value={2}>风华浪子</Option>
								<Option value={3}>北大才子</Option>
								<Option value={4}>百度FE</Option>
								<Option value={5}>创业者</Option>
							</Select>
						</Form.Item>
						<Form.Item label="联系地址" name="address">
							<TextArea placeholder="请输入联系地址" />
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
}

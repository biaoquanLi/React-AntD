import React from 'react'
import { Card, Form, Button, Table, Modal, Select, message } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import FilterForm from '../../components/filterForm/filterForm'
const { Option } = Select
export default class CityManage extends React.Component {
	formRef = React.createRef()
	state = {
		list: [],
		isLoading: true,
		isShowOpenCity: false,
	}
	componentDidMount() {
		this.requestList()
	}
	requestList = (current = 1) => {
		axios
			.ajxa({
				url: '/open_city',
				data: {
					params: {
						page: current,
					},
				},
			})
			.then((res) => {
				this.setState({
					list: res.data.list,
					isLoading: false,
					pagination: Utils.pagination(res.data, (current) => {
						this.requestList(current)
					}),
				})
			})
	}
	handleOpenCity = () => {
		this.setState({ isShowOpenCity: true })
	}
	getSearchParams = (params) => {
		console.log(222, params)
		this.requestList()
	}
	handleSumbit = () => {
		const params = this.formRef.current.getFieldsValue()
		axios
			.ajxa({
				url: '/open_city/add',
				data: {
					params,
				},
			})
			.then((res) => {
				if (res.code === 200) {
					message.success('城市开通成功')
					this.setState({
						isShowOpenCity: false,
					})
				}
			})
	}
	render() {
		const columns = [
			{
				title: '城市ID',
				dataIndex: 'id',
			},
			{
				title: '城市名称',
				dataIndex: 'cityName',
			},
			{
				title: '用车模式',
				dataIndex: 'mode',
				render(mode) {
					return mode === 1 ? '停车点' : '禁停区'
				},
			},
			{
				title: '营运模式',
				dataIndex: 'op_mode',
				render(op_mode) {
					return op_mode === 1 ? '自营' : '加盟'
				},
			},
			{
				title: '授权加盟商',
				dataIndex: 'franchisee_name',
			},
			{
				title: '城市管理员',
				dataIndex: 'city_admins',
				render(arr) {
					return arr
						.map((item) => {
							return item.user_name
						})
						.join(',')
				},
			},
			{
				title: '城市开通时间',
				dataIndex: 'open_time',
			},
			{
				title: '操作时间',
				dataIndex: 'update_time',
				render: Utils.formateDate,
			},
			{
				title: '操作人',
				dataIndex: 'sys_user_name',
			},
		]
		const formList = [
			{
				type: 'Select',
				label: '城市',
				name: 'city_id',
				placeholder: '请选择城市',
				width: 100,
				list: [
					{ title: '全部', value: '' },
					{ title: '北京市', value: '1' },
					{ title: '天津市', value: '2' },
					{ title: '深圳市', value: '3' },
				],
			},
			{
				type: 'Select',
				label: '用车模式',
				name: 'mode',
				placeholder: '全部',
				width: 120,
				list: [
					{ title: '全部', value: '' },
					{ title: '指定停车点模式', value: '1' },
					{ title: '禁停区模式', value: '2' },
				],
			},
			{
				type: 'Select',
				label: '运营模式',
				name: 'op_mode',
				placeholder: '全部',
				width: 80,
				list: [
					{ title: '全部', value: '' },
					{ title: '自营', value: '1' },
					{ title: '加盟', value: '2' },
				],
			},
			{
				type: 'Select',
				label: '加盟商授权状态',
				name: 'auth_status',
				placeholder: '全部',
				width: 100,
				list: [
					{ title: '全部', value: '' },
					{ title: '已授权', value: '1' },
					{ title: '未授权', value: '2' },
				],
			},
		]
		return (
			<div style={{ width: '100%' }}>
				<Card>
					<FilterForm
						handleSearch={this.getSearchParams}
						formList={formList}
					></FilterForm>
				</Card>
				<Card style={{ marginTop: 10 }}>
					<Button type="primary" onClick={this.handleOpenCity}>
						开通城市
					</Button>
				</Card>
				<div className="content-wrap">
					<Table
						bordered
						loading={this.state.isLoading}
						columns={columns}
						dataSource={this.state.list}
						pagination={this.state.pagination}
						rowKey={(record) => record.id}
					/>
				</div>
				<Modal
					title="开通城市"
					visible={this.state.isShowOpenCity}
					onCancel={() => {
						this.setState({ isShowOpenCity: false })
					}}
					onOk={this.handleSumbit}
					cancelText="取消"
					okText="确定"
				>
					<Form
						layout="horizontal"
						ref={this.formRef}
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 7 }}
						initialValues={{ cityName: '', op_mode: 1, mode: 2 }}
					>
						<Form.Item label="选择城市" name="cityName">
							<Select>
								<Option value="">全部</Option>
								<Option value="1">北京市</Option>
								<Option value="2">天津市</Option>
							</Select>
						</Form.Item>
						<Form.Item label="运营模式" name="op_mode">
							<Select>
								<Option value={1}>自营</Option>
								<Option value={2}>加盟</Option>
							</Select>
						</Form.Item>
						<Form.Item label="用车模式" name="mode">
							<Select>
								<Option value={1}>指定停车点</Option>
								<Option value={2}>禁停区</Option>
							</Select>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
}

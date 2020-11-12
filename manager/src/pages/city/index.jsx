import React from 'react'
import { Card, Form, Button, Table, Modal, Select } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
const { Option } = Select
export default class CityManage extends React.Component {
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
	render() {
		const columns = [
			{
				title: '城市ID',
				dataIndex: 'id',
			},
			{
				title: '城市名称',
				dataIndex: 'name',
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
		return (
			<div style={{ width: '100%' }}>
				<Card>
					<FilterForm />
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
			</div>
		)
	}
}

const FilterForm = () => {
	const [form] = Form.useForm()
	const search = (values) => {
		console.log(values)
	}
	const reset = () => {
		form.resetFields()
	}
	return (
		<Form form={form} layout="inline" onFinish={search}>
			<Form.Item label="城市" name="city_id">
				<Select placeholder="全部" style={{ width: 100 }}>
					<Option value="">全部</Option>
					<Option value="1">北京市</Option>
					<Option value="2">天津市</Option>
					<Option value="3">深圳市</Option>
				</Select>
			</Form.Item>
			<Form.Item label="用车模式" name="mode">
				<Select placeholder="全部" style={{ width: 120 }}>
					<Option value="">全部</Option>
					<Option value="1">指定停车点模式</Option>
					<Option value="2">禁停区模式</Option>
				</Select>
			</Form.Item>
			<Form.Item label="运营模式" name="op_mode">
				<Select placeholder="全部" style={{ width: 80 }}>
					<Option value="">全部</Option>
					<Option value="1">自营</Option>
					<Option value="2">加盟</Option>
				</Select>
			</Form.Item>
			<Form.Item label="加盟商授权状态" name="auth_status">
				<Select placeholder="全部" style={{ width: 100 }}>
					<Option value="">全部</Option>
					<Option value="1">已授权</Option>
					<Option value="2">未授权</Option>
				</Select>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					style={{ margin: '0 20px' }}
					htmlType="submit"
				>
					查询
				</Button>
				<Button onClick={reset}>重置</Button>
			</Form.Item>
		</Form>
	)
}

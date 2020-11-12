import React from 'react'
import { Card, Table, Modal, Badge, Button, message } from 'antd'
import axios from '../../axios/index'
import Util from '../../utils/utils'
import { ExclamationCircleOutlined } from '@ant-design/icons'
const basicData = [
	{
		id: 0,
		userName: 'Jack',
		sex: 1,
		status: 1,
		hobby: 1,
		birthday: '2000-01-01',
		address: '北京市奥利给',
		riseTime: '09:00',
	},
	{
		id: 1,
		userName: 'Jack',
		sex: 1,
		status: 2,
		hobby: 1,
		birthday: '2000-01-01',
		address: '北京市奥利给',
		riseTime: '09:00',
	},
	{
		id: 2,
		userName: 'Jack',
		sex: 1,
		status: 3,
		hobby: 1,
		birthday: '2000-01-01',
		address: '北京市奥利给',
		riseTime: '09:00',
	},
	{
		id: 3,
		userName: 'Jack',
		sex: 1,
		status: 4,
		hobby: 1,
		birthday: '2000-01-01',
		address: '北京市奥利给',
		riseTime: '09:00',
	},
	{
		id: 4,
		userName: 'Jack',
		sex: 1,
		status: 5,
		hobby: 1,
		birthday: '2000-01-01',
		address: '北京市奥利给',
		riseTime: '09:00',
	},
]
export default class HighTable extends React.Component {
	state = {
		data: [],
		isLoading: true,
		pagination: null,
		sortOrder: '',
	}
	componentDidMount() {
		this.request(1)
	}
	request = (current = 1) => {
		axios
			.ajxa({
				url: '/table/high/list',
				data: {
					params: {
						page: current,
					},
				},
			})
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						data: res.data.list,
						isLoading: false,
						pagination: Util.pagination(res.data, (current) => {
							this.request(current)
						}),
					})
				}
			})
	}
	handleChange = (pagination, filters, sorter) => {
		console.log(sorter)
		this.setState({
			sortOrder: sorter.order,
		})
	}
	deleteData = (record) => {
		if (record.id) {
			Modal.confirm({
				title: '删除',
				icon: <ExclamationCircleOutlined />,
				content: `你确定要删除ID为${record.id}的数据`,
				okText: '确认',
				cancelText: '取消',
				onOk: () => {
					this.request()
					message.success('删除成功')
				},
			})
		}
	}
	render() {
		const columns = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: '用户名',
				dataIndex: 'userName',
				key: 'userName',
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				render(sex) {
					return sex === 1 ? '男' : '女'
				},
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render(status) {
					let config = {
						1: '咸鱼一条',
						2: '风华浪子',
						3: '北大才子',
						4: '百度FE',
						5: '创业者',
					}
					return config[status]
				},
			},

			{
				title: '爱好',
				dataIndex: 'hobby',
				key: 'hobby',
				render(hobby) {
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
					return config[hobby]
				},
			},
			{
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
			},
		]
		const columns2 = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
				fixed: 'left',
				width: 80,
			},
			{
				title: '用户名',
				dataIndex: 'userName',
				key: 'userName',
				fixed: 'left',
				width: 80,
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				width: 100,
				render(sex) {
					return sex === 1 ? '男' : '女'
				},
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				width: 100,
				render(status) {
					let config = {
						1: '咸鱼一条',
						2: '风华浪子',
						3: '北大才子',
						4: '百度FE',
						5: '创业者',
					}
					return config[status]
				},
			},

			{
				title: '爱好',
				dataIndex: 'hobby',
				key: 'hobby',
				width: 100,
				render(hobby) {
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
					return config[hobby]
				},
			},
			{
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
				width: 100,
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
				width: 100,
			},
		]
		const columns3 = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
				sorter: (a, b) => {
					return a.id - b.id
				},
				sortOrder: this.state.sortOrder,
			},
			{
				title: '用户名',
				dataIndex: 'userName',
				key: 'userName',
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				render(sex) {
					return sex === 1 ? '男' : '女'
				},
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render(status) {
					let config = {
						1: '咸鱼一条',
						2: '风华浪子',
						3: '北大才子',
						4: '百度FE',
						5: '创业者',
					}
					return config[status]
				},
			},

			{
				title: '爱好',
				dataIndex: 'hobby',
				key: 'hobby',
				render(hobby) {
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
					return config[hobby]
				},
			},
			{
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
			},
		]
		const columns4 = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: '用户名',
				dataIndex: 'userName',
				key: 'userName',
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				render(sex) {
					return sex === 1 ? '男' : '女'
				},
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render(status) {
					let config = {
						1: <Badge status="success" text="咸鱼一条" />,
						2: <Badge status="error" text="风华浪子" />,
						3: <Badge status="default" text="北大才子" />,
						4: <Badge status="processing" text="百度FE" />,
						5: <Badge status="warning" text="创业者" />,
					}
					return config[status]
				},
			},

			{
				title: '爱好',
				dataIndex: 'hobby',
				key: 'hobby',
				render(hobby) {
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
					return config[hobby]
				},
			},
			{
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '早起时间',
				dataIndex: 'riseTime',
				key: 'riseTime',
			},
			{
				title: '操作',
				render: (value, record) => {
					return (
						<Button
							size="small"
							onClick={() => {
								this.deleteData(record)
							}}
						>
							删除
						</Button>
					)
				},
			},
		]
		return (
			<div style={{ width: '100%' }}>
				<Card title="固定表头">
					<Table
						bordered
						columns={columns}
						loading={this.state.isLoading}
						dataSource={this.state.data}
						rowKey={(columns) => columns.id}
						pagination={this.state.pagination}
						scroll={{ y: 240 }}
					/>
				</Card>
				<Card title="左侧固定">
					<Table
						bordered
						columns={columns2}
						loading={this.state.isLoading}
						dataSource={this.state.data}
						rowKey={(columns) => columns.id}
						pagination={this.state.pagination}
						scroll={{ x: 2060 }}
					/>
				</Card>
				<Card title="表格排序">
					<Table
						bordered
						columns={columns3}
						loading={this.state.isLoading}
						dataSource={this.state.data}
						rowKey={(columns) => columns.id}
						onChange={this.handleChange}
						pagination={this.state.pagination}
					/>
				</Card>
				<Card title="按钮操作">
					<Table
						bordered
						columns={columns4}
						loading={this.state.isLoading}
						dataSource={this.state.data}
						rowKey={(columns) => columns.id}
						pagination={this.state.pagination}
					/>
				</Card>
			</div>
		)
	}
}

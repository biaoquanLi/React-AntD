import React from 'react'
import { Card, Table, Modal } from 'antd'
import axios from '../../axios/index'
import Util from '../../utils/utils'
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
		status: 1,
		hobby: 1,
		birthday: '2000-01-01',
		address: '北京市奥利给',
		riseTime: '09:00',
	},
	{
		id: 2,
		userName: 'Jack',
		sex: 1,
		status: 1,
		hobby: 1,
		birthday: '2000-01-01',
		address: '北京市奥利给',
		riseTime: '09:00',
	},
]
const baseUrl =
	'https://www.easy-mock.com/mock/5fab5dfc5d1197774d6ab195/mockapi'
export default class BasicTable extends React.Component {
	state = {
		data2: [],
		isLoading: true,
		pagination: null,
	}
	request = (current = 1) => {
		axios
			.ajxa({
				url: '/table/list',
				data: {
					params: {
						page: current,
					},
				},
			})
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						data2: res.data.list,
						isLoading: false,
						pagination: Util.pagination(res.data, (current) => {
							this.request(current)
						}),
					})
				}
			})
	}
	componentDidMount() {
		this.request()
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
		const rowSelection = {
			type: 'radio',
			onSelect: (record, index) => {
				Modal.success({
					title: '单选',
					content: record.id,
				})
			},
		}
		const rowCheckBoxSelection = {
			type: 'checkbox',
			onSelect: (record, selected, selectedRows, nativeEvent) => {
				console.log(record, selected, selectedRows, nativeEvent)
			},
			onSelectAll: (selected, selectedRows, changeRows) => {
				console.log(selected, selectedRows, changeRows)
			},
		}
		return (
			<div style={{ width: '100%' }}>
				<Card title="基础表格">
					<Table
						bordered
						columns={columns}
						dataSource={basicData}
						rowKey={(columns) => columns.id}
					/>
				</Card>
				<Card title="动态表格">
					<Table
						bordered
						columns={columns}
						loading={this.state.isLoading}
						dataSource={this.state.data2}
						rowKey={(columns) => columns.id}
					/>
				</Card>
				<Card title="动态表格--单选">
					<Table
						bordered
						rowSelection={rowSelection}
						columns={columns}
						loading={this.state.isLoading}
						dataSource={this.state.data2}
						rowKey={(columns) => columns.id}
					/>
				</Card>
				<Card title="动态表格--复选框">
					<Table
						bordered
						rowSelection={rowCheckBoxSelection}
						columns={columns}
						loading={this.state.isLoading}
						dataSource={this.state.data2}
						rowKey={(columns) => columns.id}
					/>
				</Card>
				<Card title="动态表格--分页">
					<Table
						bordered
						columns={columns}
						loading={this.state.isLoading}
						dataSource={this.state.data2}
						rowKey={(columns) => columns.id}
						pagination={this.state.pagination}
					/>
				</Card>
			</div>
		)
	}
}

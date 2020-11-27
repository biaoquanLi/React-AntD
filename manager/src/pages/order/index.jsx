import React from 'react'
import {
	Card,
	Button,
	Table,
	Badge,
	message,
	Modal,
	Spin,
} from 'antd'
import FilterForm from '../../components/filterForm/filterForm'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
export default class Order extends React.Component {
	state = {
		list: [],
		isLoading: true,
		pagination: null,
		selectId: '',
		isShow: false,
		endBikeInfo: null,
	}
	getSearchParams = (params) => {
		console.log(222, params)
	}
	requestList = (current = 1) => {
		axios
			.ajxa({
				url: '/order/list',
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
	toDetail = () => {
		const id = this.state.orderId
		if (id) {
			window.open(`/common/order/detail/${id}`, '_blank')
		} else {
			Modal.info({
				title: '信息',
				content: (
					<div>
						<p>请先选择一条订单</p>
					</div>
				),
			})
		}
	}
	endOrder = () => {
		const { orderId } = this.state
		this.setState({
			endBikeInfo: null,
			isShow: true,
		})
		if (orderId) {
			axios
				.ajxa({
					url: '/order/endBikeInfo',
					data: {
						params: {
							orderId,
						},
					},
				})
				.then((res) => {
					if (res.code === 200) {
						this.setState({
							endBikeInfo: res.data,
						})
					}
				})
		} else {
			Modal.info({
				title: '信息',
				content: (
					<div>
						<p>请先选择一条订单</p>
					</div>
				),
			})
		}
	}
	handleSumbit = () => {
		const { orderId } = this.state
		axios
			.ajxa({
				url: '/order/finishOrder',
				data: {
					params: {
						orderId,
					},
				},
			})
			.then((res) => {
				if (res.code === 200) {
					message.success('成功结束订单')
					this.setState({
						isShow: false,
					})
				}
				this.requestList()
			})
	}
	componentDidMount() {
		this.requestList()
	}
	render() {
		const columns = [
			{
				title: '订单编号',
				dataIndex: 'order_sn',
			},
			{
				title: '车辆编号',
				dataIndex: 'bike_sn',
			},
			{
				title: '用户名',
				dataIndex: 'user_name',
			},
			{
				title: '手机号',
				dataIndex: 'mobile',
			},
			{
				title: '里程',
				dataIndex: 'distance',
				render(distance) {
					return distance / 1000 + 'Km'
				},
			},
			{
				title: '行驶时长',
				dataIndex: 'total_time',
			},
			{
				title: '状态',
				dataIndex: 'status',
				render(value) {
					return value === 1 ? (
						<Badge status="processing" text="进行中" />
					) : (
						<Badge status="success" text="结束行程" />
					)
				},
			},
			{
				title: '开始时间',
				dataIndex: 'start_time',
			},
			{
				title: '结束时间',
				dataIndex: 'end_time',
			},
			{
				title: '订单金额',
				dataIndex: 'total_fee',
			},
			{
				title: '实付金额',
				dataIndex: 'user_pay',
			},
		]
		const rowSelection = {
			type: 'radio',
			onSelect: (record) => {
				this.setState({ orderId: record.id })
			},
		}
		const endBikeInfo = this.state.endBikeInfo || {}
		const formList = [
			{
				type: 'Select',
				label: '城市',
				name: 'city_id',
				placeholder: '请选择城市',
				width: 130,
				list: [
					{ title: '全部', value: '' },
					{ title: '北京市', value: '1' },
					{ title: '天津市', value: '2' },
					{ title: '深圳市', value: '3' },
				],
			},
			{
				type: 'RangePicker',
				label: '订单时间',
				name: 'orderTime',
				placeholder: ['开始时间', '结束时间'],
			},
			{
				type: 'Select',
				label: '订单状态',
				name: 'mode',
				placeholder: '全部',
				width: 130,
				list: [
					{ title: '全部', value: '' },
					{ title: '进行中', value: '1' },
					{ title: '行程结束', value: '2' },
				],
			},
		]
		return (
			<div style={{ width: '100%' }}>
				<Card>
					<FilterForm
						handleSearch={this.getSearchParams}
						formList={formList}
					/>
				</Card>
				<Card style={{ marginTop: 10 }}>
					<Button type="primary" onClick={this.toDetail}>
						订单详情
					</Button>
					<Button
						danger
						style={{ marginLeft: 10 }}
						onClick={this.endOrder}
					>
						结束订单
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
						rowKey={(record) => record.order_sn}
					/>
				</div>
				<Modal
					title="结束订单"
					visible={this.state.isShow}
					onCancel={() => {
						this.setState({ isShow: false })
					}}
					onOk={this.handleSumbit}
					cancelText="取消"
					okText="确定"
				>
					{this.state.endBikeInfo ? (
						<div>
							<div className="infoContent">
								<span>车辆编号:</span>
								<span>{endBikeInfo.bike_sn}</span>
							</div>
							<div className="infoContent">
								<span>剩余电量:</span>
								<span>{endBikeInfo.battery}%</span>
							</div>
							<div className="infoContent">
								<span>行程开始时间:</span>
								<span>{endBikeInfo.start_time}</span>
							</div>
							<div className="infoContent">
								<span>当前位置:</span>
								<span>{endBikeInfo.location}</span>
							</div>
						</div>
					) : (
						<div className="loading-model">
							<Spin />
						</div>
					)}
				</Modal>
			</div>
		)
	}
}

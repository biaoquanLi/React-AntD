import React from 'react'
import { Card } from 'antd'
import axios from '../../axios/index'
import './detail.less'
const BMap = window.BMap
export default class OrderDetail extends React.Component {
	state = {
		orderInfo: null,
	}
	request = () => {
		axios
			.ajxa({
				url: '/order/detail',
				data: {
					params: {
						id: this.props.match.params.orderId,
					},
				},
			})
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						orderInfo: res.data,
					})
					this.renderMap(res.data)
				}
			})
	}
	renderMap = (orderInfo) => {
		this.map = new BMap.Map('myMap')
		// 创建地图实例
		// 添加地图控件
		this.addMapControl()
		// 调用路线图绘制方法
		this.drawBikeRoute(orderInfo.position_list)
		// 调用服务区绘制方法
		this.drwaServiceArea(orderInfo.area)
	}
	addMapControl = () => {
		this.map.addControl(new BMap.NavigationControl())
		this.map.addControl(new BMap.ScaleControl())
		this.map.addControl(new BMap.OverviewMapControl())
		this.map.addControl(new BMap.MapTypeControl())
	}
	drawBikeRoute = (position) => {
		if (position.length > 0) {
			const positionStart = position[0]
			const positionEnd = position[position.length - 1]
			var point = new BMap.Point(positionStart.lon, positionStart.lat)
			this.map.centerAndZoom(point, 11)
			// // 创建起点图标
			var myIconStart = new BMap.Icon(
				'/assets/start_point.png',
				new BMap.Size(72, 83),
				{
					imageSize: new window.BMap.Size(36, 42),
					anchor: new window.BMap.Size(18, 42),
				}
			)
			// 创建Marker标注，使用起点图标
			var ptStart = new BMap.Point(positionStart.lon, positionStart.lat)
			var markerStart = new BMap.Marker(ptStart, {
				icon: myIconStart,
			})
			this.map.addOverlay(markerStart)
			// 创建终点图标
			var myIconEnd = new BMap.Icon(
				'/assets/end_point.png',
				new BMap.Size(72, 83),
				{
					imageSize: new window.BMap.Size(36, 42),
					anchor: new window.BMap.Size(18, 42),
				}
			)
			// 创建Marker标注，使用终点图标
			var ptEnd = new BMap.Point(positionEnd.lon, positionEnd.lat)
			var markerEnd = new BMap.Marker(ptEnd, {
				icon: myIconEnd,
			})
			this.map.addOverlay(markerEnd)

			//生成坐标点
			var trackPoint = []
			position.forEach((value) => {
				trackPoint.push(new BMap.Point(value.lon, value.lat))
			})
			//画线
			var polyline = new BMap.Polyline(trackPoint, {
				strokeColor: '#1869AD',
				strokeWeight: 3,
				strokeOpacity: 1,
			})
			this.map.addOverlay(polyline)
		}
	}
	drwaServiceArea = (area) => {
		if (area.length > 0) {
			// 绘制面
			var polygonPointArr = []
			area.forEach((value) => {
				polygonPointArr.push(new BMap.Point(value.lon, value.lat))
			})
			var polygon = new BMap.Polygon(polygonPointArr, {
				strokeColor: 'red',
				strokeWeight: 5,
				strokeOpacity: 1,
			})
			this.map.addOverlay(polygon)
		}
	}
	componentDidMount() {
		this.request()
	}
	render() {
		const info = this.state.orderInfo || {}
		return (
			<div style={{ width: '100%' }}>
				<Card style={{ margin: '5px auto', width: '90%' }}>
					<div className="order-map" id="myMap"></div>
					<div className="message">
						<div className="title">
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">
									{info.mode === 1 ? '停车点' : '禁停点'}
								</span>
							</div>
							<div className="item">
								<span className="title-left">订单编号</span>
								<span className="content">{info.order_sn}</span>
							</div>
							<div className="item">
								<span className="title-left">车辆编号</span>
								<span className="content">{info.bike_sn}</span>
							</div>
							<div className="item">
								<span className="title-left">用户姓名</span>
								<span className="content">
									{info.user_name}
								</span>
							</div>
							<div className="item">
								<span className="title-left">手机号码</span>
								<span className="content">{info.mobile}</span>
							</div>
						</div>
					</div>
					<div className="message">
						<div className="title">
							<div className="item">
								<span className="title-left">行程起点</span>
								<span className="content">
									{info.start_location}
								</span>
							</div>
							<div className="item">
								<span className="title-left">行程终点</span>
								<span className="content">
									{info.end_location}
								</span>
							</div>
							<div className="item">
								<span className="title-left">行驶里程</span>
								<span className="content">
									{info.distance / 1000}公里
								</span>
							</div>
						</div>
					</div>
				</Card>
			</div>
		)
	}
}

import React from 'react'
import { Card } from 'antd'
import FilterForm from '../../components/filterForm/filterForm'
import axios from '../../axios/index'
import moment from 'moment'
const BMap = window.BMap
export default class BikeMap extends React.Component {
	state = {
		orderTimeStart: '',
		orderTimeEnd: '',
		mode: '',
		data: null,
		map: null,
	}
	requestList = () => {
		const { orderTimeStart, orderTimeEnd, mode } = this.state
		axios
			.ajxa({
				url: '/bikeList',
				data: {
					params: {
						orderTimeStart,
						orderTimeEnd,
						mode,
					},
				},
			})
			.then((res) => {
				if (res.code === 200) {
					this.setState({
						data: res.data,
					})
					this.renderMap(res.data)
				}
			})
	}
	getSearchParams = (params) => {
		this.setState(
			{
				mode: params.mode,
				orderTimeStart: moment(
					moment(params.orderTime[0]).valueOf()
				).format('YYYY-MM-DD HH:mm:ss'),
				orderTimeEnd: moment(
					moment(params.orderTime[1]).valueOf()
				).format('YYYY-MM-DD HH:mm:ss'),
			},
			() => {
				console.log(this.state)
			}
		)
	}

	componentDidMount() {
		this.requestList()
	}
	renderMap = (data) => {
		this.map = new BMap.Map('bikeMap')
		// 添加地图控件
		this.addMapControl()
		// 调用路线图绘制方法
		this.drawBikeRoute(data.route_list)
		// 调用标记物方法
		this.markerBike(data.bike_list)
		// 调用服务区绘制方法
		this.drwaServiceArea(data.service_list)
	}
	addMapControl = () => {
		this.map.addControl(new BMap.NavigationControl())
		this.map.addControl(new BMap.ScaleControl())
		this.map.addControl(new BMap.OverviewMapControl())
		this.map.addControl(new BMap.MapTypeControl())
	}
	drawBikeRoute = (route) => {
		if (route.length > 0) {
			const positionStart = route[0].split(',')
			const positionEnd = route[route.length - 1].split(',')
			var myIconStart = new BMap.Icon(
				'/assets/start_point.png',
				new BMap.Size(72, 83),
				{
					imageSize: new BMap.Size(36, 42),
					anchor: new BMap.Size(18, 42),
				}
			)
			// 创建Marker标注，使用起点图标
			var ptStart = new BMap.Point(positionStart[0], positionStart[1])
			var markerStart = new BMap.Marker(ptStart, {
				icon: myIconStart,
			})
			this.map.addOverlay(markerStart)
			// 创建终点图标
			var myIconEnd = new BMap.Icon(
				'/assets/end_point.png',
				new BMap.Size(72, 83),
				{
					imageSize: new BMap.Size(36, 42),
					anchor: new BMap.Size(18, 42),
				}
			)
			// 创建Marker标注，使用终点图标
			var ptEnd = new BMap.Point(positionEnd[0], positionEnd[1])
			var markerEnd = new BMap.Marker(ptEnd, {
				icon: myIconEnd,
			})
			this.map.addOverlay(markerEnd)

			//生成坐标点
			var trackPoint = []
			route.forEach((value) => {
				const [lon, lat] = value.split(',')
				trackPoint.push(new BMap.Point(lon, lat))
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
	markerBike = (bike) => {
		if (bike.length > 0) {
			let startBike = bike[0].split(',')
			let point = new BMap.Point(startBike[0], startBike[1])
			this.map.centerAndZoom(point, 11)
			bike.forEach((value) => {
				const [lon, lat] = value.split(',')
				let myIcon = new BMap.Icon(
					'/assets/bike.jpg',
					new BMap.Size(72, 83),
					{
						imageSize: new BMap.Size(36, 42),
						anchor: new BMap.Size(18, 42),
					}
				)
				// 创建Marker标注，使用终点图标
				let pt = new BMap.Point(lon, lat)
				let markerBike = new BMap.Marker(pt, {
					icon: myIcon,
				})
				this.map.addOverlay(markerBike)
			})
		}
	}
	drwaServiceArea = (service) => {
		if (service.length > 0) {
			// 绘制面
			var polygonPointArr = []
			service.forEach((value) => {
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
	render() {
		const formList = [
			{
				type: 'RangePicker',
				name: 'orderTime',
				label: '订单时间',
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
					<div
						className="content-wrap"
						id="bikeMap"
						style={{ height: 800 }}
					></div>
				</Card>
			</div>
		)
	}
}

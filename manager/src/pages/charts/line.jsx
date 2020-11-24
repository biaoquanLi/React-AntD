import React from 'react'
import { Card } from 'antd'
import echarts from 'echarts/lib/echarts'
import infographic from './infographic'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import ReactEcharts from 'echarts-for-react'
export default class Line extends React.Component {
	componentWillMount() {
		echarts.registerTheme('theme', infographic)
	}
	getOption1 = () => {
		const option = {
			title: {
				text: '用户骑行订单',
			},
			tooltip: {
				formatter: '{b}<br/>{a} : {c} ',
			},
			xAxis: {
				type: 'category',
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: '订单量',
					data: [1000, 2000, 1800, 2200, 1290, 1330, 1320],
					type: 'line',
				},
			],
		}
		return option
	}
	getOption2 = () => {
		const option = {
			title: {
				text: '用户骑行订单',
			},
			tooltip: {
				trigger: 'axis',
			},
			legend: {
				data: ['OFO订单量', '摩拜订单量'],
			},
			xAxis: {
				type: 'category',
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: 'OFO订单量',
					data: [1000, 2000, 1800, 2200, 1290, 1330, 1320],
					type: 'line',
				},
				{
					name: '摩拜订单量',
					data: [2000, 1500, 2800, 3200, 3290, 2330, 4320],
					type: 'line',
				},
			],
		}
		return option
	}
	getOption3 = () => {
		const option = {
			title: {
				text: '用户骑行订单',
			},
			tooltip: {
				formatter: '{b}<br/>{a} : {c} ',
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			yAxis: {
				type: 'value',
			},
			series: [
				{
					name: '订单量',
					data: [1000, 2000, 1800, 2200, 1290, 1330, 1320],
					type: 'line',
					areaStyle: {},
				},
			],
		}
		return option
	}
	render() {
		return (
			<div style={{ width: '100%' }}>
				<Card title="折线图表一">
					<ReactEcharts
						theme="theme"
						option={this.getOption1()}
						lazyUpdate={true}
						style={{ height: 500 }}
					/>
				</Card>
				<Card title="折线图表二">
					<ReactEcharts
						theme="theme"
						option={this.getOption2()}
						lazyUpdate={true}
						style={{ height: 500 }}
					/>
				</Card>
				<Card title="折线图表三">
					<ReactEcharts
						theme="theme"
						option={this.getOption3()}
						lazyUpdate={true}
						style={{ height: 500 }}
					/>
				</Card>
			</div>
		)
	}
}

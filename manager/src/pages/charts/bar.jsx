import React from 'react'
import { Card } from 'antd'
import echarts from 'echarts/lib/echarts'
import infographic from './infographic'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/bar'
import ReactEcharts from 'echarts-for-react'
export default class Bar extends React.Component {
	componentWillMount() {
		echarts.registerTheme('theme', infographic)
	}
	getOption1 = () => {
		const option = {
			title: {
				text: '用户骑行订单',
			},
			tooltip: {},
			xAxis: {
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			yAxis: {},
			series: [
				{
					name: '订单量',
					type: 'bar',
					data: [1000, 2000, 1800, 2200, 1900, 2500, 2800],
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
			tooltip: {},
			legend: {},
			xAxis: {
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			yAxis: {},
			series: [
				{
					name: 'OFO',
					type: 'bar',
					data: [1000, 2000, 1800, 2200, 1900, 2500, 2800],
				},
				{
					name: '摩拜',
					type: 'bar',
					data: [1200, 2500, 1300, 2800, 2900, 3400, 5000],
				},
				{
					name: '小蓝',
					type: 'bar',
					data: [1300, 3000, 2000, 2400, 1500, 1800, 2800],
				},
			],
		}
		return option
	}
	render() {
		return (
			<div style={{ width: '100%' }}>
				<Card title="柱形图表一">
					<ReactEcharts
						theme="theme"
						option={this.getOption1()}
						lazyUpdate={true}
						style={{ height: 500 }}
					/>
				</Card>
				<Card title="柱形图表二">
					<ReactEcharts
						theme="theme"
						option={this.getOption2()}
						lazyUpdate={true}
						style={{ height: 500 }}
					/>
				</Card>
			</div>
		)
	}
}

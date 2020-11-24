import React from 'react'
import { Card } from 'antd'
import echarts from 'echarts/lib/echarts'
import infographic from './infographic'
import 'echarts/lib/component/title'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/pie'
import ReactEcharts from 'echarts-for-react'
export default class Pie extends React.Component {
	componentWillMount() {
		echarts.registerTheme('theme', infographic)
	}
	getOption1 = () => {
		const option = {
			title: {
				text: '用户骑行订单',
				left: 'center',
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)',
			},
			legend: {
				orient: 'vertical',
				left: 'right',
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			series: [
				{
					name: '订单量',
					type: 'pie',
					data: [
						{ value: 1000, name: '周一' },
						{ value: 2000, name: '周二' },
						{ value: 1800, name: '周三' },
						{ value: 2200, name: '周四' },
						{ value: 1900, name: '周五' },
						{ value: 2500, name: '周六' },
						{ value: 2800, name: '周日' },
					],
				},
			],
		}
		return option
	}
	getOption2 = () => {
		const option = {
			title: {
				text: '用户骑行订单',
				left: 'center',
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)',
			},
			legend: {
				orient: 'vertical',
				left: 'right',
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			series: [
				{
					name: '订单量',
					type: 'pie',
					radius: ['45%', '70%'],
					data: [
						{ value: 1000, name: '周一' },
						{ value: 2000, name: '周二' },
						{ value: 1800, name: '周三' },
						{ value: 2200, name: '周四' },
						{ value: 1900, name: '周五' },
						{ value: 2500, name: '周六' },
						{ value: 2800, name: '周日' },
					],
				},
			],
		}
		return option
	}
	getOption3 = () => {
		const option = {
			title: {
				text: '用户骑行订单',
				left: 'center',
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b} : {c} ({d}%)',
			},
			legend: {
				orient: 'vertical',
				left: 'right',
				data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
			},
			series: [
				{
					name: '订单量',
					type: 'pie',
					roseType: 'radius',
					data: [
						{ value: 1000, name: '周一' },
						{ value: 2000, name: '周二' },
						{ value: 1800, name: '周三' },
						{ value: 2200, name: '周四' },
						{ value: 1900, name: '周五' },
						{ value: 2500, name: '周六' },
						{ value: 2800, name: '周日' },
					].sort((a, b) => {
						return a.value - b.value
					}),
				},
			],
		}
		return option
	}
	render() {
		return (
			<div style={{ width: '100%' }}>
				<Card title="饼形图表一">
					<ReactEcharts
						theme="theme"
						option={this.getOption1()}
						lazyUpdate={true}
						style={{ height: 500 }}
					/>
				</Card>
				<Card title="饼形图表二">
					<ReactEcharts
						theme="theme"
						option={this.getOption2()}
						lazyUpdate={true}
						style={{ height: 500 }}
					/>
				</Card>
				<Card title="饼形图表三">
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

import React from 'react'
import { Card, Carousel } from 'antd'
import './ui.less'

export default class Carousels extends React.Component {
	onChange = (e) => {
		console.log(e)
	}
	render() {
		const contentStyle = {
			height: '160px',
			color: '#fff',
			lineHeight: '160px',
			textAlign: 'center',
			background: '#364d79',
		}
		return (
			<div style={{ width: '100%' }}>
				<Card title="文本轮播图">
					<Carousel afterChange={this.onChange}>
						<div>
							<h3 style={contentStyle}>1</h3>
						</div>
						<div>
							<h3 style={contentStyle}>2</h3>
						</div>
						<div>
							<h3 style={contentStyle}>3</h3>
						</div>
						<div>
							<h3 style={contentStyle}>4</h3>
						</div>
					</Carousel>
				</Card>
				<Card title="图片轮播图" style={{ width: 600 }}>
					<Carousel afterChange={this.onChange} autoplay>
						<div>
							<img src="/carousel-img/carousel-1.jpg"></img>
						</div>
						<div>
							<img src="/carousel-img/carousel-2.jpg"></img>
						</div>
						<div>
							<img src="/carousel-img/carousel-3.jpg"></img>
						</div>
					</Carousel>
				</Card>
			</div>
		)
	}
}

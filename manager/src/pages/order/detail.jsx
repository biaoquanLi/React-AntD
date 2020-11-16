import React from 'react'
import { Card, Table, Modal } from 'antd'
import axios from '../../axios/index'
import Util from '../../utils/utils'
import { render } from 'less'
import './detail.less'

export default class OrderDetail extends React.Component {
	render() {
		return (
			<div style={{ width: '100%' }}>
				<Card>
					<div className="map"></div>
					<div className="message">
						<div className="title">
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
						</div>
					</div>
					<div className="message">
						<div className="title">
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
							<div className="item">
								<span className="title-left">用车模式</span>
								<span className="content">停车点</span>
							</div>
						</div>
					</div>
				</Card>
			</div>
		)
	}
}

import { Col, Row } from 'antd';
import React from 'react'
import Util from '../../utils/utils'
import './index.less'

export default class Header extends React.Component {
    state={}
    componentWillMount(){
        this.setState({
            userName: '河畔一角'
        })
        setInterval(() => {
            let sysTime = Util.formatDate(new Date().getTime())
            this.setState({
                sysTime
            })
        })
    }
    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>欢迎，${this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">首页</Col>
                    <Col span="20" className="weather">
        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">晴转多云</span>
                    </Col>
                </Row>
            </div>
        )
    }
}

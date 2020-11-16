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
        const { menuName, menuType } = this.props
        return (
            <div className="header">
                <Row className="header-top">
                {
                        menuType?
                            <Col span={6} className="logo" >
                                <img src="/assets/logo-ant.svg" alt=""/>
                                <span>IMooc 通用管理系统</span>
                            </Col>:''
                    }
                    <Col span={menuType?18:24}>
                        <span>欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType?'':
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                {menuName || '首页'}
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                {/* <span className="weather-img">
                                    <img src={this.state.dayPictureUrl} alt="" />
                                </span> */}
                                <span className="weather-detail">
                                         晴转多云
                                </span>
                            </Col>
                        </Row>
                }
            </div>
        )
    }
}

import { Col, Row } from 'antd';
import React, {Component} from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import NavLeft from './components/NavLeft'
import './style/common.less'
import Home from './pages/home'

export default class Admin extends Component{
    render(){
        return (
            <Row className="container">
                <Col span="3" className="nav-left">
                <NavLeft/>
                </Col>
                <Col span="21"  className="main">
                    <Header/>
                    <Row className="content"> 
                        {this.props.children}
                         </Row>
                    <Footer/>
                </Col>
            </Row>
        )
    }
}


import React from 'react'
import {Card, Row, Col, Modal } from 'antd'
import './ui.less'
export default class Gallery extends React.Component{
    state = {
        visible: false,
        url: ''
    }
    showBigImg = (url) => {
        this.setState({
            visible:true,
            url
        })
    }
    render(){
        const imgs = [
            ['1.png','2.png','3.png','4.png','5.png'],
            ['6.png','7.png','8.png','9.png','10.png'],
            ['11.png','12.png','13.png','14.png','15.png'],
            ['16.png','17.png','18.png','19.png','20.png'],
            ['21.png','22.png','23.png','24.png','25.png']
        ]
        const imgList = imgs.map((img)=>{
            return img.map(item=>
                <Card onClick={()=>this.showBigImg(`/gallery/${item}`)}
                    hoverable
                    cover={<img alt="example" src={`/gallery/${item}`} />}
                >
                </Card>
                )
        })
        return (
            <div style={{width:'100%'}} className="card-wrap">
                <Row gutter={10}>
                    <Col md={5}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                    {imgList[1]}
                    </Col>
                    <Col md={5}>
                    {imgList[2]}
                    </Col>
                    <Col md={5}>
                    {imgList[3]}
                    </Col>
                    <Col md={4}>
                    {imgList[4]}
                    </Col>
                </Row>
                <Modal footer={null} visible={this.state.visible} title="图片墙" onCancel={() => {this.setState({visible:false})}}>
                    <img src={this.state.url} style={{width:'100%'}}></img>
                </Modal>
            </div>
        )
    }
}
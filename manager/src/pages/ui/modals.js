import React from 'react'
import {Card,Button, Modal,message} from 'antd'
import './ui.less'

export default class Modals extends React.Component{
    state={
        ModalText: 'The modal will be closed after two seconds',
        showModal1: false
    }
    handleOpen=(type)=>{
        this.setState({
            [type]: true
        })
    }
    handleOk = () => {
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      }
      handleTip=(type)=>{
        message[type]('This is a success message')
      }
      handleConfirm = (type)=>{
        Modal[type]({
            title:'确认？',
            content:'你确定你学会了React了吗？',
            onOk(){
                console.log('Ok')
            },
            onCancel(){
                console.log('Cancel')
            }
        })
    }
    render(){
        return (
            <div style={{width:'100%'}}>
                <Card title="基础模态框" className="card-wrap">
                    <Button type="primary" onClick={() =>this.handleOpen('showModal1')}>Open</Button>
                </Card>
                <Card title="全局提示框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleTip('info')}>info</Button>
                    <Button type="primary" onClick={() => this.handleTip('success')}>success</Button>
                    <Button type="primary" onClick={() => this.handleTip('warning')}>warning</Button>
                    <Button type="primary" onClick={() => this.handleTip('error')}>error</Button>
                </Card>
                <Card title="信息确认框" className="card-wrap">
                    <Button type="primary" onClick={() => this.handleConfirm('confirm')}>Confirm</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('info')}>Info</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('success')}>Success</Button>
                    <Button type="primary" onClick={() => this.handleConfirm('warning')}>Warning</Button>
                </Card>
                <Modal
                title="Title"
                visible={this.state.showModal1}
                confirmLoading={this.state.confirmLoading}
                onOk={this.handleOk}
                onCancel={()=>{this.setState({showModal1: false})}}
                >
                <p>{this.state.ModalText}</p>
                </Modal>
            </div>
        )
    }
}
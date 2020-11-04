import React from 'react'
import {Card,notification,Button } from 'antd'
import './ui.less'
export default class Notice extends React.Component{
    openNotification=(type, placement)=>{
        notification[type]({placement,
            description:
            'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
          
        })
    }
    render(){
        return (
            <div style={{width:'100%'}}>
                <Card title="Tab页签" className="card-wrap">
                    <Button type="primary" onClick={() => this.openNotification('success','topLeft')}>Success</Button>
                    <Button type="primary" onClick={() => this.openNotification('info','topRight')}>Info</Button>
                    <Button type="primary" onClick={() => this.openNotification('warning','bottomLeft')}>Warning</Button>
                    <Button type="primary" onClick={() => this.openNotification('error','bottomRight')}>Error</Button>
                </Card>
            </div>
        )
    }
}
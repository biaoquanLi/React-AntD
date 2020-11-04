import React from 'react'
import {Card,Spin,Alert,Icon} from 'antd'
import './ui.less'

export default class Loading extends React.Component{
    render(){
        const iconLoading = <Icon type="loading" style={{ fontSize: 24 }} />
        return (
            <div style={{width:'100%'}}>
                <Card title="Spin用法" className="card-wrap">
                    <Spin size="small" />
                    <Spin style={{margin:10}} />
                    <Spin size="large" />
                </Card>
                <Card title="内容遮罩" className="card-wrap">
                    <Alert
                        message="React"
                        description="欢迎来到React高级实战课程"
                        type="info"
                        style={{ marginBottom: 10 }}
                    />
                    <Spin>
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin tip="加载中...">
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="warning"
                            style={{ marginBottom: 10 }}
                        />
                    </Spin>
                    <Spin indicator={iconLoading}>
                        <Alert
                            message="React"
                            description="欢迎来到React高级实战课程"
                            type="warning"
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
import React from 'react'
import { Card, Form, Button, DatePicker, Table, Select,Badge, message } from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
const { Option } = Select
const { RangePicker } = DatePicker
export default class Order extends React.Component {
    state = {
        list: [],
        isLoading:true,
        pagination:null
    }
	getSearchParams = (params) => {
		console.log(params)
    }
    requestList = (current = 1) => {
		axios
			.ajxa({
				url: '/order/list',
				data: {
					params: {
						page: current,
					},
				},
			})
			.then((res) => {
				this.setState({
					list: res.data.list,
					isLoading: false,
					pagination: Utils.pagination(res.data, (current) => {
						this.requestList(current)
					}),
				})
			})
    }
    componentDidMount(){
        this.requestList()
    }
	render() {
        const columns = [
            {
                title:'订单编号',
                dataIndex:'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance){
                    return distance/1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render(value){
                    return value === 1?<Badge status="processing" text="进行中" />:<Badge status="success" text="结束行程" />
                }
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            }
        ]
		return (
			<div style={{ width: '100%' }}>
				<Card>
					<FilterForm getSearchParams={this.getSearchParams} />
				</Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary">订单详情</Button>
                    <Button danger style={{marginLeft:10}}>结束订单</Button>
                </Card>
                <div className="content-wrap">
                    <Table
                        bordered
						loading={this.state.isLoading}
						columns={columns}
						dataSource={this.state.list}
						pagination={this.state.pagination}
						rowKey={(record) => record.order_sn}
                    />
                </div>
			</div>
		)
	}
}

const FilterForm = (props) => {
	const [form] = Form.useForm()
	const search = (values) => {
		const { getSearchParams } = props
		getSearchParams(values)
	}
	const reset = () => {
		form.resetFields()
	}
	return (
		<Form form={form} layout="inline" onFinish={search}>
			<Form.Item label="城市" name="city_id">
				<Select placeholder="全部" style={{ width: 100 }}>
					<Option value="">全部</Option>
					<Option value="1">北京市</Option>
					<Option value="2">天津市</Option>
					<Option value="3">深圳市</Option>
				</Select>
			</Form.Item>
			<Form.Item label="订单时间" name="orderTime">
            <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
			</Form.Item>
			<Form.Item label="订单状态" name="mode">
				<Select placeholder="全部" style={{ width: 120 }}>
					<Option value="">全部</Option>
					<Option value="1">进行中</Option>
					<Option value="2">结束行程</Option>
				</Select>
			</Form.Item>
			<Form.Item>
				<Button
					type="primary"
					style={{ margin: '0 20px' }}
					htmlType="submit"
				>
					查询
				</Button>
				<Button onClick={reset}>重置</Button>
			</Form.Item>
		</Form>
	)
}

import React from 'react'
import {
	Card,
	Button,
	Modal,
	Table,
	Form,
	Input,
	Select,
	message,
	Tree,
	Transfer,
} from 'antd'
import axios from '../../axios/index'
import Utils from '../../utils/utils'
import moment from 'moment'
import menuList from '../../config/menuConfig'
const { Option } = Select
// const { TreeNode } = Tree
export default class Permission extends React.Component {
	addForm = React.createRef()
	setPermissionForm = React.createRef()
	userPermissionForm = React.createRef()
	state = {
		list: [],
		showAddRole: false,
		isLoading: true,
		pagination: null,
		selectItem: null,
		//权限设置
		showSetPermission: false,
		checkedKeys: [],
		menuList,
		//用户授权
		showUserPermission: false,
		mockData: [],
		targetKeys: [],
	}
	componentDidMount() {
		this.requestList()
	}
	requestList = (current = 1) => {
		axios
			.ajxa({
				url: '/role/list',
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
	//创建角色
	addRole = () => {
		this.setState({
			showAddRole: true,
		})
	}
	addRoleSubmit = () => {
		const params = this.addForm.current.getFieldsValue()
		axios
			.ajxa({
				url: '/role/add',
				data: {
					params,
				},
			})
			.then((res) => {
				if (res.code === 200) {
					message.success(res.msg)
					this.setState({
						showAddRole: false,
					})
					this.addForm.current.resetFields()
					this.requestList()
				}
			})
	}
	//设置权限
	setPermission = () => {
		const selectItem = this.state.selectItem
		if (selectItem) {
			this.setState(
				{
					showSetPermission: true,
					checkedKeys: selectItem.menus,
				},
				() => {
					this.setPermissionForm.current.setFieldsValue({
						roleName: selectItem.role_name,
						status: selectItem.status,
					})
				}
			)
		} else {
			Modal.info({
				title: '信息',
				content: (
					<div>
						<p>请先选择一个角色</p>
					</div>
				),
			})
		}
	}
	setPermissionSubmit = () => {
		const role_id = this.state.selectItem.id
		const params = this.setPermissionForm.current.getFieldsValue()
		axios
			.ajxa({
				url: '/permission/edit',
				data: {
					params: {
						role_id,
						...params,
						menus: this.state.checkedKeys,
					},
				},
			})
			.then((res) => {
				if (res.code === 200) {
					message.success(res.msg)
					this.setState({
						showSetPermission: false,
					})
					this.requestList()
				}
			})
	}
	checkTreeNode = (checkedKeys) => {
		this.setState({
			checkedKeys: checkedKeys,
		})
	}
	//用户授权
	userPermission = () => {
		const selectItem = this.state.selectItem
		if (selectItem) {
			this.setState(
				{
					showUserPermission: true,
				},
				() => {
					this.userPermissionForm.current.setFieldsValue({
						roleName: selectItem.role_name,
					})
				}
			)
			axios
				.ajxa({
					url: '/role/userList',
					data: {
						params: {
							role_id: selectItem.id,
						},
					},
				})
				.then((res) => {
					if (res.code === 200) {
						const mockData = []
						const targetKeys = []
						res.data.forEach((item) => {
							const obj = {
								key: item.user_id,
								title: item.user_name,
							}
							if (item.status === 1) {
								targetKeys.push(obj.key)
							}
							mockData.push(obj)
						})
						this.setState({
							mockData,
							targetKeys,
						})
					}
				})
		} else {
			Modal.info({
				title: '信息',
				content: (
					<div>
						<p>请先选择一个角色</p>
					</div>
				),
			})
		}
	}
	userPermissionSubmit = () => {
		const role_id = this.state.selectItem.id
		axios
			.ajxa({
				url: '/role_user_edit',
				data: {
					params: {
						role_id,
						user_ids: this.state.targetKeys,
					},
				},
			})
			.then((res) => {
				if (res.code === 200) {
					message.success(res.msg)
					this.setState({
						showUserPermission: false,
					})
					this.requestList()
				}
			})
	}
	handleChangeUserPermission = (targetKeys) => {
		this.setState({ targetKeys })
	}
	render() {
		const {
			showAddRole,
			isLoading,
			list,
			pagination,
			showSetPermission,
			checkedKeys,
			menuList,
			showUserPermission,
			mockData,
			targetKeys,
		} = this.state
		const allMenuList = [
			{
				title: '平台权限',
				key: 'platform_all',
				children: menuList,
			},
		]
		const columns = [
			{
				title: '角色ID',
				dataIndex: 'id',
			},
			{
				title: '角色名称',
				dataIndex: 'role_name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				render(time) {
					return time
						? moment(time).format('YYYY-MM-DD HH:mm:ss')
						: ''
				},
			},
			{
				title: '使用状态',
				dataIndex: 'status',
				render(status) {
					return status ? '启用' : '停用'
				},
			},
			{
				title: '授权时间',
				dataIndex: 'authorize_time',
				render(time) {
					return time
						? moment(time).format('YYYY-MM-DD HH:mm:ss')
						: ''
				},
			},
			{
				title: '授权人',
				dataIndex: 'authorize_user_name',
			},
		]
		const rowSelection = {
			type: 'radio',
			onSelect: (record) => {
				this.setState({ selectItem: record })
			},
		}
		return (
			<div style={{ width: '100%' }}>
				<Card>
					<Button
						type="primary"
						onClick={this.addRole}
						style={{ marginRight: 10 }}
					>
						创建角色
					</Button>
					<Button
						type="primary"
						onClick={this.setPermission}
						style={{ marginRight: 10 }}
					>
						设置权限
					</Button>
					<Button
						type="primary"
						onClick={this.userPermission}
						style={{ marginRight: 10 }}
					>
						用户授权
					</Button>
				</Card>
				<div className="content-wrap">
					<Table
						bordered
						rowSelection={rowSelection}
						loading={isLoading}
						columns={columns}
						dataSource={list}
						pagination={pagination}
						rowKey={(record) => record.id}
					/>
				</div>
				<Modal
					title="创建角色"
					visible={showAddRole}
					okText="确定"
					cancelText="取消"
					onCancel={() => {
						this.setState({ showAddRole: false })
					}}
					onOk={this.addRoleSubmit}
				>
					<Form
						ref={this.addForm}
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 18 }}
						initialValues={{ status: 1 }}
					>
						<Form.Item
							label="角色名称"
							name="roleName"
							rules={[
								{
									required: true,
									message: '请输入角色名称!',
								},
							]}
						>
							<Input placeholder="请输入角色名称" />
						</Form.Item>
						<Form.Item label="状态" name="status">
							<Select>
								<Option value={1}>开启</Option>
								<Option value={0}>停用</Option>
							</Select>
						</Form.Item>
					</Form>
				</Modal>
				<Modal
					title="权限设置"
					visible={showSetPermission}
					okText="确定"
					cancelText="取消"
					onCancel={() => {
						this.setState({ showSetPermission: false })
					}}
					onOk={this.setPermissionSubmit}
				>
					<Form
						ref={this.setPermissionForm}
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 18 }}
					>
						<Form.Item label="角色名称" name="roleName">
							<Input placeholder="请输入角色名称" disabled />
						</Form.Item>
						<Form.Item label="状态" name="status">
							<Select>
								<Option value={1}>开启</Option>
								<Option value={0}>停用</Option>
							</Select>
						</Form.Item>
						<Tree
							checkable
							checkedKeys={checkedKeys}
							defaultExpandAll
							onCheck={(checkedKeys) => {
								this.checkTreeNode(checkedKeys)
							}}
							treeData={allMenuList}
						></Tree>
					</Form>
				</Modal>
				<Modal
					title="用户授权"
					visible={showUserPermission}
					okText="确定"
					cancelText="取消"
					onCancel={() => {
						this.setState({ showUserPermission: false })
					}}
					onOk={this.userPermissionSubmit}
				>
					<Form
						labelCol={{ span: 4 }}
						wrapperCol={{ span: 18 }}
						ref={this.userPermissionForm}
					>
						<Form.Item label="角色名称" name="roleName">
							<Input placeholder="请输入角色名称" disabled />
						</Form.Item>
						<Form.Item label="选择用户">
							<Transfer
								dataSource={mockData}
								showSearch
								targetKeys={targetKeys}
								onChange={this.handleChangeUserPermission}
								render={(item) => item.title}
							/>
						</Form.Item>
					</Form>
				</Modal>
			</div>
		)
	}
}

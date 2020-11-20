import React from 'react'
import { Input, Form, Select, DatePicker, Button } from 'antd'
import Utils from '../../utils/utils'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
const Password = Input.Password
const FilterForm = (props) => {
	const [form] = Form.useForm()
	const search = (values) => {
		props.handleSearch(values)
	}
	const reset = () => {
		form.resetFields()
	}
	const initForm = () => {
		const { formList } = props
		const FormArray = []
		formList.forEach((item) => {
			const {
				type,
				label,
				name,
				width = 100,
				list,
				placeholder,
				showTime = true,
				format = 'YYYY-MM-DD HH:mm:ss',
			} = item
			if (type === 'Select') {
				const SELECT = (
					<FormItem label={label} name={name} key={name}>
						<Select
							placeholder={placeholder}
							style={{ width: width }}
						>
							{Utils.getOptions(list)}
						</Select>
					</FormItem>
				)
				FormArray.push(SELECT)
			} else if (type === 'Input') {
				const INPUT = (
					<FormItem label={label} name={name} key={name}>
						<Input
							placeholder={placeholder}
							style={{ width: width }}
						/>
					</FormItem>
				)
				FormArray.push(INPUT)
			} else if (type === 'Password') {
				const PASSWORD = (
					<FormItem label={label} name={name} key={name}>
						<Password
							placeholder={placeholder}
							style={{ width: width }}
						/>
					</FormItem>
				)
				FormArray.push(PASSWORD)
			} else if (type === 'RangePicker') {
				const RANGEPICKER = (
					<Form.Item label={label} name={name} key={name}>
						<RangePicker
							showTime={showTime}
							format={format}
							placeholder={placeholder}
						/>
					</Form.Item>
				)
				FormArray.push(RANGEPICKER)
			}
		})
		return FormArray
	}
	const renderChild = (child) => {
		// 控制内容的分发
		if (child.props.left) {
			return <div key="left">{child}</div>
		} else if (child.props.right) {
			return <div key="right">{child}</div>
		} else {
			return ''
		}
	}
	return (
		<Form layout="inline" form={form} onFinish={search}>
			{props.children && Array.isArray(props.children)
				? props.children[0]
				: ''}
			{props.children &&
			!Array.isArray(props.children) &&
			props.children.props.left
				? renderChild(props.children)
				: ''}
			{initForm()}
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
			{props.children && Array.isArray(props.children)
				? props.children[1]
				: ''}
			{props.children &&
			!Array.isArray(props.children) &&
			props.children.props.right
				? renderChild(props.children)
				: ''}
		</Form>
	)
}
export default FilterForm

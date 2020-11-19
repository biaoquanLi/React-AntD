import React from 'react'
import { Input, Form, Select, DatePicker } from 'antd'
import Utils from '../../utils/utils'
const RangePicker = DatePicker.RangePicker
const FormItem = Form.Item
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
			const { type, label, name, width = 100, list, placeholder } = item
			if (type === 'Select') {
				const SELECT = (
					<FormItem label={label} name={name}>
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
					<FormItem label={label} name={name}>
						<Input
							placeholder={placeholder}
							style={{ width: width }}
						/>
					</FormItem>
				)
				FormArray.push(INPUT)
			} else if (type === 'RangePicker') {
				const RANGEPICKER = (
					<Form.Item label={label} name={name}>
						<RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
					</Form.Item>
				)
			}
		})
		return FormArray
	}
	return (
		<Form layout="inline" form={form} onFinish={search}>
			{initForm()}
		</Form>
	)
}
export default FilterForm

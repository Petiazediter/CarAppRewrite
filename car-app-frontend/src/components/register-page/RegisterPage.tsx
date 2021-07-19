import { FunctionComponent, useState } from 'react';
import { FormButton, RegisterContainerSection } from './RegisterPage.styled';

import { Form, Input, message, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { RuleObject } from 'antd/lib/form';
import { useDatabaseContext } from '../../context/DatabaseContext';

const { Option } = Select;

const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$');

const prefixSelector = (
	<Form.Item name="prefix" noStyle>
		<Select
			defaultValue="36"
			style={{
				width: 70,
			}}
		>
			<Option value="36">+36</Option>
		</Select>
	</Form.Item>
);

const emailSuffix = (
	<Form.Item name="emailtype" noStyle>
		<Select defaultValue="gmail" style={{ width: 'auto' }}>
			<Option value="gmail">@gmail.com</Option>
		</Select>
	</Form.Item>
);

type FormValues = {
	username: string;
	password: string;
	password2: string;
	email: string;
	phone: string;
	emailtype: { value: string };
};

const RegisterPage: FunctionComponent = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const databaseContext = useDatabaseContext();

	const onSubmit = async (values: FormValues) => {
		setIsLoading(true);
		const success = await databaseContext.addUser({
			username: values.username,
			password: values.password,
			emailAddress: values.email + '@gmail.com',
			phone: values.phone,
		});
		if (success) {
			message.success('You registered successfully!');
			window.location.href = '/';
			// Add data to cookie
			// Add username and password to local storage.
		} else {
			message.error('Something went wrong!');
		}
		setIsLoading(false);
	};

	return (
		<RegisterContainerSection>
			<h1>
				Register to <b>CardBidApp</b>
			</h1>
			<Form
				layout="vertical"
				onFinish={(values: FormValues) => onSubmit(values)}
			>
				<Form.Item
					name="username"
					label="Username"
					tooltip={{
						title: 'This is going to be your display name.',
						icon: <InfoCircleOutlined />,
					}}
					rules={[
						{
							required: true,
							message: 'Please input your username!',
						},
					]}
				>
					<Input type="text" placeholder="Input your username here."></Input>
				</Form.Item>
				<Form.Item
					name="password"
					label="Password"
					tooltip={{
						title: 'You need to use [A-Za-z0-9] and at least a symbol.',
						icon: <InfoCircleOutlined />,
					}}
					rules={[
						{
							required: true,
							message: 'Please input your password!',
						},
						({ getFieldValue }) => ({
							validator(rule: RuleObject, value: string) {
								if (!value || value === getFieldValue('password2')) {
									if (passwordRegex.test(value)) {
										return Promise.resolve();
									}
									return Promise.reject(
										new Error(
											'Minimum 8 characters. 1 uppercase 1 lowercase 1 number 1 special character.'
										)
									);
								}
								return Promise.reject(
									new Error(
										'Input the same password to password validation field.'
									)
								);
							},
						}),
					]}
				>
					<Input.Password
						type="password"
						placeholder="Input your password here."
					></Input.Password>
				</Form.Item>
				<Form.Item
					label="Password(2x)"
					name="password2"
					tooltip={{
						title: 'Type your previously added password here.',
						icon: <InfoCircleOutlined />,
					}}
					rules={[
						{
							required: true,
							message: 'Please verify your password!',
						},
					]}
				>
					<Input.Password
						type="password"
						placeholder="Verify your password here."
					></Input.Password>
				</Form.Item>
				<Form.Item
					name="email"
					label="E-mail"
					tooltip={{
						title: 'Type your current valid and active e-mail address.',
						icon: <InfoCircleOutlined />,
					}}
					rules={[
						{
							required: true,
							message: 'Please input your e-mail address!',
						},
						({ getFieldValue }) => ({
							validator(rule: RuleObject, value: string) {
								if (!value || !value.includes('@')) {
									return Promise.resolve();
								}
								return Promise.reject(
									new Error(
										"Don't add the part after the @ to the input field."
									)
								);
							},
						}),
					]}
				>
					<Input
						suffix={emailSuffix}
						type="text"
						placeholder="Input your email-address here."
					></Input>
				</Form.Item>
				<Form.Item
					name="phone"
					label="Phone Number"
					rules={[
						{
							required: false,
							message: 'Please input your phone number!',
						},
						({ getFieldValue }) => ({
							validator(rule: RuleObject, value: string) {
								if (!value || Number(value)) {
									return Promise.resolve();
								}
								return Promise.reject(new Error('Only numbers allowed.'));
							},
						}),
					]}
				>
					<Input
						addonBefore={prefixSelector}
						style={{
							width: '100%',
						}}
						maxLength={9}
					/>
				</Form.Item>
				<Form.Item name="submitButton">
					<FormButton
						style={{ width: '100%' }}
						type="primary"
						htmlType="submit"
						loading={isLoading}
					>
						{isLoading ? 'Processing' : 'Register'}
					</FormButton>
				</Form.Item>
			</Form>
		</RegisterContainerSection>
	);
};

export default RegisterPage;

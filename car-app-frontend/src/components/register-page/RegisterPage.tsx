import { FunctionComponent } from 'react';
import { RegisterContainerSection } from './RegisterPage.styled';

import { Button, Form, Input, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Option } = Select;

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

const RegisterPage: FunctionComponent = () => {
	return (
		<RegisterContainerSection>
			<h1>
				Register to <b>CardBidApp</b>
			</h1>
			<Form layout="vertical">
				<Form.Item
					name="username"
					label="Username"
					tooltip={{
						title: 'This is going to be your display name.',
						icon: <InfoCircleOutlined />,
					}}
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
				>
					<Input.Password
						type="password"
						placeholder="Input your password here."
					></Input.Password>
				</Form.Item>
				<Form.Item
					label="Password(2x)"
					name="password_verify"
					tooltip={{
						title: 'Type your previously added password here.',
						icon: <InfoCircleOutlined />,
					}}
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
				>
					<Input
						type="email"
						placeholder="Input your email-address here."
					></Input>
				</Form.Item>
				<Form.Item
					name="phone"
					label="Phone Number"
					rules={[
						{
							required: true,
							message: 'Please input your phone number!',
						},
					]}
				>
					<Input
						addonBefore={prefixSelector}
						style={{
							width: '100%',
						}}
					/>
				</Form.Item>
				<Form.Item name="submitButton">
					<Button type="primary" htmlType="submit">
						Register
					</Button>
				</Form.Item>
			</Form>
		</RegisterContainerSection>
	);
};

export default RegisterPage;

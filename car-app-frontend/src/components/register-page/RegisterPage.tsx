import { FunctionComponent, useContext } from 'react';
import { FormButton, RegisterContainerSection } from './RegisterPage.styled';

import { Form, Input, message, Select } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { RuleObject } from 'antd/lib/form';
import { UserContext } from '../../context/UserContext';
import { gql, useMutation } from '@apollo/client';
import { User } from '../../models/User';

const { Option } = Select;

const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$');

const emailSuffix = (
	<Form.Item name="emailtype" noStyle>
		<Select style={{ width: 'auto' }}>
			<Option value="gmail">@gmail.com</Option>
		</Select>
	</Form.Item>
);

type FormValues = {
	username: string;
	password: string;
	password2: string;
	email: string;
	emailtype: { value: string };
};

const REGISTER_MUTATION = gql`
	mutation RegisterMutation(
		$username: String!
		$password: String!
		$emailAddress: String!
	) {
		register(
			username: $username
			password: $password
			emailAddress: $emailAddress
		) {
			isSuccess
			errorMessage
			token
			payload {
				id
			}
		}
	}
`;

type RegisterResult = {
	register: AuthResult;
};

export type AuthResult = {
	isSuccess: boolean;
	errorMessage: string | null;
	token: string | null;
	payload: User | null;
};

type RegisterVariables = {
	username: string;
	password: string;
	emailAddress: string;
};

const RegisterPage: FunctionComponent = () => {
	const { changeToken } = useContext(UserContext);
	const [register, { loading }] = useMutation<
		RegisterResult,
		RegisterVariables
	>(REGISTER_MUTATION, {
		onCompleted({ register }) {
			if (register) {
				if (register.isSuccess) {
					message.success('You registered successfully!');
					if (register.payload != null && register.token != null) {
						changeToken(register.token);
					}
				} else {
					if (register.errorMessage) {
						message.error(register.errorMessage);
					} else {
						message.error('Unknown error!');
					}
				}
			}
		},
		onError(error: Error) {
			message.error(error.message);
		},
	});

	const onSubmit = async (values: FormValues) => {
		if (values.password !== values.password2) {
			return message.error('Passwords not match!');
		}

		register({
			variables: {
				username: values.username,
				password: values.password,
				emailAddress: values.email + '@gmail.com',
			},
		});
	};

	return (
		<RegisterContainerSection>
			<h1>
				Register to <b>CardBidApp</b>
			</h1>
			<Form
				layout="vertical"
				initialValues={{
					prefix: 36,
					emailtype: 'gmail',
				}}
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
								if (!value || !passwordRegex.test(value)) {
									return Promise.reject(
										new Error(
											'Minimum 8 characters. 1 uppercase 1 lowercase 1 number.'
										)
									);
								}
								return Promise.resolve();
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
						({ getFieldValue }) => ({
							validator(rule: RuleObject, value: string) {
								if (value && value !== getFieldValue('password')) {
									return Promise.reject(
										new Error('Verify your password please!')
									);
								}
								return Promise.resolve();
							},
						}),
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
				<Form.Item name="submitButton">
					<FormButton
						style={{ width: '100%' }}
						type="primary"
						htmlType="submit"
						loading={loading}
					>
						{loading ? 'Processing' : 'Register'}
					</FormButton>
				</Form.Item>
			</Form>
		</RegisterContainerSection>
	);
};

export default RegisterPage;

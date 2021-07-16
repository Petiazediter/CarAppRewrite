import { FunctionComponent } from 'react';
import { RegisterContainerSection } from './RegisterPage.styled';

import { Button, Form, Input } from 'antd';

const RegisterPage: FunctionComponent = () => {
	return (
		<RegisterContainerSection>
			<h1>
				Register to <b>CardBidApp</b>
			</h1>
			<Form>
				<Form.Item>
					<Input
						type="text"
						name="username"
						placeholder="Input your username here."
					></Input>
					<Input
						type="password"
						name="password"
						placeholder="Input your password here."
					></Input>
					<Input
						type="password"
						name="password_verify"
						placeholder="Verify your password here."
					></Input>
					<Input
						type="email"
						name="email"
						placeholder="Input your email-address here."
					></Input>
					<Button type="primary" htmlType="submit">
						Register
					</Button>
				</Form.Item>
			</Form>
		</RegisterContainerSection>
	);
};

export default RegisterPage;

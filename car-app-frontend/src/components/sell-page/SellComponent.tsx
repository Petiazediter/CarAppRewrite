import styled from '@emotion/styled';
import { Form, Steps, Input, Select, Button } from 'antd';
import React, { FunctionComponent, useState } from 'react';
const { Step } = Steps;

const Title = styled.h1({
	marginTop: 10,
	fontFamily: 'Roboto',
	fontWeight: 900,
});

enum Transmission {
	MANUAL = 'Manual',
	AUTOMATIC = 'Automatic',
}

export enum DriveTrain {
	REAR = 'Rear',
	FRONT = 'Front',
}

export enum Body {
	COUPE = 'Coupe',
	CONVERTIBLE = 'Convertible',
	HATCHBACK = 'Hatchback',
	SEDAN = 'Sedan',
	SUV = 'Suv',
	TRUCK = 'Truck',
	VAN = 'Van',
	WAGON = 'Wagon',
}

const SellComponent: FunctionComponent = () => {
	const [page, setPage] = useState<number>(1);

	const onFinishFirstPage = () => {
		console.log('Hey!');
	};

	return (
		<section>
			<Steps size="small" current={page - 1}>
				<Step title="Basic information" />
				<Step title="Images" />
				<Step title="Submit" />
			</Steps>

			<Title>Let's sell your car!</Title>

			{page === 1 && (
				<div>
					<h1>Basic informations about the car</h1>
					<Form onFinish={onFinishFirstPage}>
						<Form.Item
							required
							label="Auction's title"
							style={{ width: '50%' }}
						>
							<Input minLength={3} required />
						</Form.Item>
						<Form.Item required style={{ width: '50%' }} label="Brand">
							<Input minLength={3} required />
						</Form.Item>

						<Form.Item required style={{ width: '50%' }} label="Model">
							<Input minLength={3} required />
						</Form.Item>

						<Form.Item required style={{ width: '50%' }} label="Transmission">
							<Select defaultValue={Transmission.AUTOMATIC.valueOf()}>
								<Select.Option value={Transmission.AUTOMATIC.valueOf()}>
									{Transmission.AUTOMATIC.valueOf()}
								</Select.Option>
								<Select.Option value={Transmission.MANUAL.valueOf()}>
									{Transmission.MANUAL.valueOf()}
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item required style={{ width: '50%' }} label="Drivetrain">
							<Select defaultValue={DriveTrain.REAR.valueOf()}>
								<Select.Option value={DriveTrain.REAR.valueOf()}>
									{DriveTrain.REAR.valueOf()}
								</Select.Option>
								<Select.Option value={DriveTrain.FRONT.valueOf()}>
									{DriveTrain.FRONT.valueOf()}
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item required style={{ width: '50%' }} label="Body type">
							<Select defaultValue={Body.COUPE.valueOf()}>
								<Select.Option value={Body.COUPE.valueOf()}>
									{Body.COUPE.valueOf()}
								</Select.Option>
								<Select.Option value={Body.CONVERTIBLE.valueOf()}>
									{Body.CONVERTIBLE.valueOf()}
								</Select.Option>
								<Select.Option value={Body.HATCHBACK.valueOf()}>
									{Body.HATCHBACK.valueOf()}
								</Select.Option>
								<Select.Option value={Body.SEDAN.valueOf()}>
									{Body.SEDAN.valueOf()}
								</Select.Option>
								<Select.Option value={Body.TRUCK.valueOf()}>
									{Body.TRUCK.valueOf()}
								</Select.Option>
								<Select.Option value={Body.VAN.valueOf()}>
									{Body.VAN.valueOf()}
								</Select.Option>
								<Select.Option value={Body.WAGON.valueOf()}>
									{Body.WAGON.valueOf()}
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item>
							<section
								style={{
									display: 'flex',
									width: '50%',
									justifyContent: 'flex-end',
								}}
							>
								<Button
									htmlType="submit"
									style={{ width: '50%' }}
									type="primary"
								>
									Submit
								</Button>
							</section>
						</Form.Item>
					</Form>
				</div>
			)}
		</section>
	);
};

export default SellComponent;

import { DeleteFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Form, Steps, Input, Select, Button } from 'antd';
import React, { ChangeEvent, FunctionComponent, useState } from 'react';
const { Step } = Steps;

const steps = [
	'Basic informations',
	'Images',
	'Equipments & highlights',
	'Additional informations',
	'Publish',
];

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

const removeItemAt = (array: string[], at: number) => {
	return array.filter(function (_, index, arr) {
		return index !== at;
	});
};

type CarCreate = {
	name: string;
	brand: string;
	model: string;
	minBid: number;
	country: string;
	endDate: string;
	city: string;
	vin: string;
	km: number;
	body: string;
	driveTrain: string;
	transmission: string;
	exterior: string;
	interior: string;
	highlightsTitle: string;
	highlights: string[];
	equipmentsTitle: string;
	equipments: string[];
	ownerShipHistroy: string;
	flaws: string[];
	extraItems: string[];
	exteriorImages: string[];
	interiorImages: string[];
	paperImages: string[];
	videos: string[];
};

const SellComponent: FunctionComponent = () => {
	const [car, setCar] = useState<CarCreate>({
		name: '',
		model: '',
		brand: '',
		minBid: 0,
		endDate: '2-2-2022-8-8-8',
		country: 'Hungary',
		city: 'Budapest',
		vin: '',
		km: 0,
		body: 'Coupe',
		driveTrain: 'Rear',
		transmission: 'Manual',
		exterior: '',
		interior: '',
		highlightsTitle: '',
		highlights: [],
		equipmentsTitle: '',
		equipments: [],
		flaws: [],
		ownerShipHistroy: '',
		extraItems: [],
		exteriorImages: [],
		paperImages: [],
		interiorImages: [],
		videos: [],
	});
	const [page, setPage] = useState<number>(1);

	const onFinishFirstPage = () => {
		setPage((currentPage) => currentPage + 1);
	};

	return (
		<section>
			<Steps size="small" current={page - 1}>
				{steps.map((step, index) => (
					<Step key={index} title={step} />
				))}
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
							<Input
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setCar({ ...car, name: event.currentTarget.value })
								}
								minLength={3}
								required
							/>
						</Form.Item>
						<Form.Item required style={{ width: '50%' }} label="Brand">
							<Input
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setCar({ ...car, brand: event.currentTarget.value })
								}
								minLength={3}
								required
							/>
						</Form.Item>

						<Form.Item required style={{ width: '50%' }} label="Model">
							<Input
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setCar({ ...car, model: event.currentTarget.value })
								}
								minLength={3}
								required
							/>
						</Form.Item>

						<Form.Item required style={{ width: '50%' }} label="Transmission">
							<Select
								onSelect={(value: string) =>
									setCar({ ...car, transmission: value })
								}
								defaultValue={Transmission.AUTOMATIC.valueOf()}
							>
								<Select.Option value={Transmission.AUTOMATIC.valueOf()}>
									{Transmission.AUTOMATIC.valueOf()}
								</Select.Option>
								<Select.Option value={Transmission.MANUAL.valueOf()}>
									{Transmission.MANUAL.valueOf()}
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item required style={{ width: '50%' }} label="Drivetrain">
							<Select
								onSelect={(value: string) =>
									setCar({ ...car, driveTrain: value })
								}
								defaultValue={DriveTrain.REAR.valueOf()}
							>
								<Select.Option value={DriveTrain.REAR.valueOf()}>
									{DriveTrain.REAR.valueOf()}
								</Select.Option>
								<Select.Option value={DriveTrain.FRONT.valueOf()}>
									{DriveTrain.FRONT.valueOf()}
								</Select.Option>
							</Select>
						</Form.Item>
						<Form.Item required style={{ width: '50%' }} label="Body type">
							<Select
								onSelect={(value: string) => setCar({ ...car, body: value })}
								defaultValue={Body.COUPE.valueOf()}
							>
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
			{page === 2 && (
				<div>
					<h1>Images of the car</h1>
					<Form>
						{car.interiorImages.map((url, index) => (
							<Form.Item style={{ width: '50%', display: 'flex' }}>
								<Input
									style={{ width: '90%' }}
									required
									value={url}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										const table = car.interiorImages;
										table[index] = event.currentTarget.value;
										setCar({ ...car, interiorImages: table });
									}}
								/>
								<DeleteFilled
									onClick={() =>
										setCar({
											...car,
											interiorImages: removeItemAt(car.interiorImages, index),
										})
									}
								/>
							</Form.Item>
						))}
						<Form.Item>
							<Button
								onClick={() =>
									setCar({
										...car,
										interiorImages: [...car.interiorImages, ''],
									})
								}
							>
								Add new interior image
							</Button>
						</Form.Item>
					</Form>
				</div>
			)}
		</section>
	);
};

export default SellComponent;

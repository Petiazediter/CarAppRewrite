import { DeleteFilled } from '@ant-design/icons';
import styled from '@emotion/styled';
import { Form, Steps, Input, Select, Button, Divider } from 'antd';
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
		name: 'TOYOTA SUPRA ON SALE',
		model: 'SUPRA',
		brand: 'TOYOTA',
		minBid: 30000,
		endDate: '2-2-2022-8-8-8',
		country: 'Hungary',
		city: 'Budapest',
		vin: 'JZA800016545',
		km: 128000,
		body: 'Coupe',
		driveTrain: 'Rear',
		transmission: 'Automatic',
		exterior: 'WHITE',
		interior: 'BLACK',
		highlightsTitle:
			'THIS... is a 1994 Toyota Supra, finished in white with a black interior.',
		highlights: [
			"This Supra is a Japanese-spec coupe reportedly imported to the United States by the seller in August 2020 and titled in Georgia. It's equipped with a metric instrument cluster, and its odometer displays around 127,900 kilometers, which represents about 79,500 miles.",
			'Factory equipment includes 16-inch wheels, cloth upholstery, and air conditioning.',
		],
		equipmentsTitle: 'TOYOTA SUPRA WITH AUTOMATIC GEAR',
		equipments: ['16-inch wheels', 'Cloth upholstery'],
		flaws: [
			'Faded center caps',
			"Tears in cloth upholstery on driver's seat",
			'Some wear on the steering wheel',
		],
		ownerShipHistroy:
			'The seller imported this Supra in August 2020 and has added approximately 1,600 miles during his ownership.',
		extraItems: [
			'2 keys, 1 key fob, and 1 spare key',
			'Import-related documents',
		],
		exteriorImages: [
			'https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/171ab1e538119e13fa98382f268326fc825fdc20/photos/3qLoBVOE.U7ouxG45G-(edit).jpg?t=163008981387',
		],
		paperImages: [
			'https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/da4b9237bacccdf19c0760cab7aec4a8359010b0/photos/3qLoBVOE.l1S9YkQ3O-(edit).jpg?t=163053203402',
		],
		interiorImages: [
			'https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/171ab1e538119e13fa98382f268326fc825fdc20/photos/3qLoBVOE.9p76rkP9A-(edit).jpg?t=163021223013',
		],
		videos: [
			'https://www.youtube.com/embed/HUVQejvrm6s',
			'https://www.youtube.com/embed/BjCEzPFK9mA',
		],
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
								value={car.name}
								minLength={3}
								required
							/>
						</Form.Item>
						<Form.Item required style={{ width: '50%' }} label="Brand">
							<Input
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setCar({ ...car, brand: event.currentTarget.value })
								}
								value={car.brand}
								minLength={3}
								required
							/>
						</Form.Item>

						<Form.Item required style={{ width: '50%' }} label="Model">
							<Input
								onChange={(event: ChangeEvent<HTMLInputElement>) =>
									setCar({ ...car, model: event.currentTarget.value })
								}
								value={car.model}
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
						<Form.Item required style={{ width: '50%' }} label="VIN">
							<Input
								value={car.vin}
								onChange={(event) =>
									setCar({ ...car, vin: event.currentTarget.value })
								}
							/>
						</Form.Item>
						<Form.Item required style={{ width: '50%' }} label="Minimum bid">
							<Input
								type="number"
								value={car.minBid}
								onChange={(event) =>
									setCar({ ...car, minBid: Number(event.currentTarget.value) })
								}
							/>
						</Form.Item>
						<Form.Item required style={{ width: '50%' }} label="Kilometers">
							<Input
								type="number"
								value={car.km}
								onChange={(event) =>
									setCar({ ...car, km: Number(event.currentTarget.value) })
								}
							/>
						</Form.Item>
						<Form.Item
							required
							style={{ width: '50%' }}
							label="Exterior's color"
						>
							<Input
								value={car.exterior}
								onChange={(event) =>
									setCar({ ...car, exterior: event.currentTarget.value })
								}
							/>
						</Form.Item>
						<Form.Item
							required
							style={{ width: '50%' }}
							label="Interior's color"
						>
							<Input
								value={car.interior}
								onChange={(event) =>
									setCar({ ...car, interior: event.currentTarget.value })
								}
							/>
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
					<Form
						onFinish={() => {
							setPage((page) => page + 1);
						}}
					>
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
						<Divider />
						{car.exteriorImages.map((url, index) => (
							<Form.Item style={{ width: '50%', display: 'flex' }}>
								<Input
									style={{ width: '90%' }}
									required
									value={url}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										const table = car.exteriorImages;
										table[index] = event.currentTarget.value;
										setCar({ ...car, exteriorImages: table });
									}}
								/>
								<DeleteFilled
									onClick={() =>
										setCar({
											...car,
											exteriorImages: removeItemAt(car.exteriorImages, index),
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
										exteriorImages: [...car.exteriorImages, ''],
									})
								}
							>
								Add new exterior image
							</Button>
						</Form.Item>
						<Divider />
						{car.videos.map((url, index) => (
							<Form.Item style={{ width: '50%', display: 'flex' }}>
								<Input
									style={{ width: '90%' }}
									required
									value={url}
									onChange={(event: ChangeEvent<HTMLInputElement>) => {
										const table = car.videos;
										table[index] = event.currentTarget.value;
										setCar({ ...car, videos: table });
									}}
								/>
								<DeleteFilled
									onClick={() =>
										setCar({
											...car,
											videos: removeItemAt(car.videos, index),
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
										videos: [...car.videos, ''],
									})
								}
							>
								Add new video embed link.
							</Button>
						</Form.Item>
						<Divider />
						<Form.Item>
							<section
								style={{
									display: 'flex',
									gap: '10px',
									width: '50%',
									justifyContent: 'flex-end',
								}}
							>
								<Button
									htmlType="button"
									style={{ width: '50%' }}
									type="ghost"
									onClick={() => setPage((page) => page - 1)}
								>
									Back
								</Button>
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
			{page === 3 && <div>HEllo</div>}
		</section>
	);
};

export default SellComponent;

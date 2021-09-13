import { DeleteFilled } from '@ant-design/icons';
import { gql, useMutation } from '@apollo/client';
import styled from '@emotion/styled';
import { Form, Steps, Input, Select, Button, Divider, DatePicker } from 'antd';
import moment from 'moment';
import React, {
	ChangeEvent,
	FunctionComponent,
	useContext,
	useState,
} from 'react';
import { useHistory } from 'react-router';
import { UserContext } from '../../context/UserContext';
const { Step } = Steps;

const steps = [
	'Basic informations',
	'Images',
	'Equipments & highLights',
	'Publish',
];

const Title = styled.h1({
	marginTop: 10,
	fontFamily: 'Roboto',
	fontWeight: 900,
});

enum Transmission {
	MANUAL = 'MANUAL',
	AUTOMATIC = 'AUTOMATIC',
}

export enum DriveTrain {
	REAR = 'REAR',
	FRONT = 'FRONT',
}

export enum Body {
	COUPE = 'COUPE',
	CONVERTIBLE = 'CONVERTIBLE',
	HATCHBACK = 'HATCHBACK',
	SEDAN = 'SEDAN',
	SUV = 'SUV',
	TRUCK = 'TRUCK',
	VAN = 'VAN',
	WAGON = 'WAGON',
}

const removeItemAt = (array: string[], at: number) => {
	return array.filter(function (_, index, arr) {
		return index !== at;
	});
};

type ItemWithDeleteMethodProps = {
	table: string[];
	onChange: (value: string[]) => void;
	onDelete: (value: string[]) => void;
};

const ItemWithDeleteMethod: FunctionComponent<ItemWithDeleteMethodProps> = (
	props
) => {
	return (
		<>
			{props.table.map((value, index) => (
				<Form.Item style={{ width: '50%', display: 'flex' }}>
					<Input
						style={{ width: '90%' }}
						required
						value={value}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							props.table[index] = event.currentTarget.value;
							props.onChange(props.table);
						}}
					/>
					<DeleteFilled
						onClick={() => props.onDelete(removeItemAt(props.table, index))}
					/>
				</Form.Item>
			))}
		</>
	);
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
	highLights: string[];
	equipmentTitle: string;
	equipments: string[];
	ownerShipHistory: string;
	serviceHistory: string;
	flaws: string[];
	extraItems: string[];
	exteriorImages: string[];
	interiorImages: string[];
	paperImages: string[];
	videos: string[];
};

const CAR_PUBLISH_MUTATION = gql`
	mutation PublishMutation(
		$name: String!
		$model: String!
		$brand: String!
		$minBid: Int!
		$endDate: String!
		$country: String!
		$city: String!
		$vin: String!
		$km: Int!
		$body: Body!
		$driveTrain: DriveTrain!
		$transmission: Transmission!
		$exterior: String!
		$interior: String!
		$highlightsTitle: String!
		$highLights: [String!]!
		$equipmentTitle: String!
		$equipments: [String!]!
		$flaws: [String!]!
		$ownerShipHistory: String!
		$serviceHistory: String!
		$extraItems: [String!]!
		$exteriorImages: [String!]!
		$paperImages: [String!]!
		$interiorImages: [String!]!
		$videos: [String!]!
	) {
		createCarV2(
			name: $name
			model: $model
			brand: $brand
			minBid: $minBid
			endDate: $endDate
			country: $country
			city: $city
			vin: $vin
			km: $km
			body: $body
			driveTrain: $driveTrain
			transmission: $transmission
			exterior: $exterior
			interior: $interior
			highlightsTitle: $highlightsTitle
			highLights: $highLights
			equipmentTitle: $equipmentTitle
			equipments: $equipments
			flaws: $flaws
			ownerShipHistory: $ownerShipHistory
			serviceHistory: $serviceHistory
			extraItems: $extraItems
			exteriorImages: $exteriorImages
			paperImages: $paperImages
			interiorImages: $interiorImages
			videos: $videos
		) {
			id
		}
	}
`;

type ReturnValue = {
	createCarV2: {
		id: number;
	};
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
		body: Body.COUPE.valueOf(),
		driveTrain: DriveTrain.REAR.valueOf(),
		transmission: Transmission.AUTOMATIC.valueOf(),
		exterior: 'WHITE',
		interior: 'BLACK',
		highlightsTitle:
			'THIS... is a 1994 Toyota Supra, finished in white with a black interior.',
		highLights: [
			"This Supra is a Japanese-spec coupe reportedly imported to the United States by the seller in August 2020 and titled in Georgia. It's equipped with a metric instrument cluster, and its odometer displays around 127,900 kilometers, which represents about 79,500 miles.",
			'Factory equipment includes 16-inch wheels, cloth upholstery, and air conditioning.',
		],
		equipmentTitle: 'TOYOTA SUPRA WITH AUTOMATIC GEAR',
		equipments: ['16-inch wheels', 'Cloth upholstery'],
		flaws: [
			'Faded center caps',
			"Tears in cloth upholstery on driver's seat",
			'Some wear on the steering wheel',
		],
		ownerShipHistory:
			'The seller imported this Supra in August 2020 and has added approximately 1,600 miles during his ownership.',
		serviceHistory: 'Good :)',
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
	const history = useHistory();
	const [page, setPage] = useState<number>(1);
	const [publishCar, { loading }] = useMutation<ReturnValue, CarCreate>(
		CAR_PUBLISH_MUTATION,
		{
			variables: car,
			onCompleted(data) {
				history.push(`/car/${data.createCarV2.id}`);
			},
			onError(error) {
				console.log(JSON.stringify(error, null, 2));
			},
		}
	);
	const userContext = useContext(UserContext);

	const onFinishFirstPage = () => {
		setPage((currentPage) => currentPage + 1);
	};

	if (!userContext.user) {
		history.push('/sign-in');
	}

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
						<h1>Interior images</h1>
						<ItemWithDeleteMethod
							table={car.interiorImages}
							onChange={(value: string[]) => {
								setCar({ ...car, interiorImages: value });
							}}
							onDelete={(value: string[]) => {
								setCar({ ...car, interiorImages: value });
							}}
						/>
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
						<h1>Exterior images</h1>
						<ItemWithDeleteMethod
							table={car.exteriorImages}
							onChange={(value: string[]) => {
								setCar({ ...car, exteriorImages: value });
							}}
							onDelete={(value: string[]) => {
								setCar({ ...car, exteriorImages: value });
							}}
						/>
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
						<h1>Embed video links</h1>
						<ItemWithDeleteMethod
							table={car.videos}
							onChange={(value: string[]) => {
								setCar({ ...car, videos: value });
							}}
							onDelete={(value: string[]) => {
								setCar({ ...car, videos: value });
							}}
						/>
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
			{page === 3 && (
				<div>
					<Form onFinish={() => setPage((page) => page + 1)}>
						<h1>Extra items</h1>
						<ItemWithDeleteMethod
							table={car.extraItems}
							onChange={(value: string[]) => {
								setCar({ ...car, extraItems: value });
							}}
							onDelete={(value: string[]) => {
								setCar({ ...car, extraItems: value });
							}}
						/>
						<Form.Item>
							<Button
								onClick={() =>
									setCar({
										...car,
										extraItems: [...car.extraItems, ''],
									})
								}
							>
								Add new extra item.
							</Button>
						</Form.Item>
						<Divider />
						<h2>highLights</h2>
						<Form.Item
							required
							style={{ width: '50%' }}
							label={"Highlight's label"}
						>
							<Input
								value={car.highlightsTitle}
								onChange={(event) =>
									setCar({ ...car, highlightsTitle: event.currentTarget.value })
								}
							/>
						</Form.Item>
						<ItemWithDeleteMethod
							table={car.highLights}
							onChange={(value: string[]) => {
								setCar({ ...car, highLights: value });
							}}
							onDelete={(value: string[]) => {
								setCar({ ...car, highLights: value });
							}}
						/>

						<Form.Item>
							<Button
								onClick={() =>
									setCar({
										...car,
										highLights: [...car.highLights, ''],
									})
								}
							>
								Add new highlight
							</Button>
						</Form.Item>
						<Divider />
						<h2>Equipments</h2>
						<Form.Item
							required
							style={{ width: '50%' }}
							label={"Equipment's label"}
						>
							<Input
								value={car.equipmentTitle}
								onChange={(event) =>
									setCar({ ...car, equipmentTitle: event.currentTarget.value })
								}
							/>
						</Form.Item>
						<ItemWithDeleteMethod
							table={car.equipments}
							onChange={(value: string[]) => {
								setCar({ ...car, equipments: value });
							}}
							onDelete={(value: string[]) => {
								setCar({ ...car, equipments: value });
							}}
						/>

						<Form.Item>
							<Button
								onClick={() =>
									setCar({
										...car,
										equipments: [...car.equipments, ''],
									})
								}
							>
								Add new equipment.
							</Button>
						</Form.Item>
						<Divider />
						<h2>Known flaws (be honest)</h2>
						<ItemWithDeleteMethod
							table={car.flaws}
							onChange={(value: string[]) => {
								setCar({ ...car, flaws: value });
							}}
							onDelete={(value: string[]) => {
								setCar({ ...car, flaws: value });
							}}
						/>

						<Form.Item>
							<Button
								onClick={() =>
									setCar({
										...car,
										flaws: [...car.flaws, ''],
									})
								}
							>
								Add new flaw.
							</Button>
						</Form.Item>
						<Divider />
						<h2>Ownership history</h2>
						<Form.Item
							required
							style={{ width: '50%' }}
							label={'Ownership history'}
						>
							<Input.TextArea
								rows={2}
								value={car.ownerShipHistory}
								onChange={(event) =>
									setCar({
										...car,
										ownerShipHistory: event.currentTarget.value,
									})
								}
							/>
						</Form.Item>
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
			{page === 4 && (
				<Form
					onFinish={() => {
						publishCar();
					}}
				>
					<Form.Item style={{ width: '50%' }} label="End date" required>
						<DatePicker
							style={{ marginBottom: '20px' }}
							className="full-width"
							defaultValue={moment(car.endDate, 'DD-MM-YYYY-HH-mm-ss')}
							format={'DD-MM-YYYY-HH-mm-SS'}
							onSelect={(value: moment.Moment) =>
								setCar({ ...car, endDate: value.format('DD-MM-YYYY-HH-mm-ss') })
							}
						/>
					</Form.Item>

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
								loading={loading}
								onClick={() => setPage((page) => page - 1)}
							>
								Back
							</Button>
							<Button
								loading={loading}
								htmlType="submit"
								style={{ width: '50%' }}
								type="primary"
							>
								Publish car
							</Button>
						</section>
					</Form.Item>
				</Form>
			)}
		</section>
	);
};

export default SellComponent;

import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Car } from '../../models/Car';
import {
	CategoriesContainer,
	Category,
	CategoryName,
	FlexContainer,
	HighlightTitle,
	ImageDisplay,
	NoMarginSubTitle,
	NoMarginTitle,
} from './Carpage.styled';
import { Divider, Image } from 'antd';
import {
	CarFilled,
	EnterOutlined,
	PaperClipOutlined,
	VideoCameraFilled,
} from '@ant-design/icons';
import { CarDataTable } from './CarDataTable';
import { TimerDisplayFormat, TimerText } from '../auctions-page/TimerText';
import ExtrasTableComponent from './ExtrasTableComponent';

interface IUrlProps {
	carId: string | undefined;
}

interface IState {
	car: Car | null;
	hook: any;
	imageType: ImageType;
}

enum ImageType {
	EXTERIOR,
	INTERIOR,
	PAPERS,
	VIDEOS,
}

export class CarPage extends React.Component<
	RouteComponentProps<IUrlProps>,
	IState
> {
	constructor(props: any) {
		super(props);
		this.state = {
			car: null,
			hook: props.hook,
			imageType: ImageType.EXTERIOR,
		};
	}

	componentDidMount() {
		const carId: string | undefined = this.props.match.params.carId;
		if (carId !== undefined) {
			try {
				const car = this.state.hook.getCarById(Number(carId));
				this.setState({
					...this.state,
					car: car,
				});
			} catch (e) {
				console.error('Id is not a number.');
			}
		}
	}

	setImageType(imageType: ImageType) {
		this.setState({
			...this.state,
			imageType: imageType,
		});
	}

	render() {
		return (
			<div>
				<NoMarginTitle>{this.state.car?.title}</NoMarginTitle>
				<NoMarginSubTitle>{this.state.car?.seller.username}</NoMarginSubTitle>
				<NoMarginSubTitle>
					Expiration day: {this.state.car?.endDate}
				</NoMarginSubTitle>
				{this.state.car != null ? (
					<NoMarginSubTitle>
						Remaining time:
						<TimerText
							fromDate={this.state.car?.endDate}
							formatType={TimerDisplayFormat.TRADITIONAL_FORMATTED}
						/>
					</NoMarginSubTitle>
				) : (
					<></>
				)}
				<CategoriesContainer>
					<Category
						background={'red'}
						onClick={() => this.setImageType(ImageType.PAPERS)}
					>
						<FlexContainer>
							<PaperClipOutlined />
							<CategoryName className="full-width">Papers</CategoryName>
						</FlexContainer>
					</Category>

					<Category
						background={'orange'}
						onClick={() => this.setImageType(ImageType.EXTERIOR)}
					>
						<FlexContainer>
							<CarFilled />
							<CategoryName className="full-width">Exterior</CategoryName>
						</FlexContainer>
					</Category>

					<Category
						background={'green'}
						onClick={() => this.setImageType(ImageType.INTERIOR)}
					>
						<FlexContainer>
							<EnterOutlined />
							<CategoryName className="full-width">Interior</CategoryName>
						</FlexContainer>
					</Category>

					<Category
						background={'blue'}
						onClick={() => this.setImageType(ImageType.VIDEOS)}
					>
						<FlexContainer>
							<VideoCameraFilled />
							<CategoryName className="full-width">Videos</CategoryName>
						</FlexContainer>
					</Category>
				</CategoriesContainer>
				<ImageDisplay autoplay={this.state.imageType !== ImageType.VIDEOS}>
					{this.state.imageType === ImageType.PAPERS
						? this.state.car?.paperImages.map((imgLink: string) => (
								<Image key={imgLink} alt="Image of car" src={imgLink} />
						  ))
						: this.state.imageType === ImageType.EXTERIOR
						? this.state.car?.exteriorImages.map((imgLink: string) => (
								<Image alt="Car exterior" src={imgLink} />
						  ))
						: this.state.imageType === ImageType.INTERIOR
						? this.state.car?.interiorImages.map((imgLink: string) => (
								<Image alt="Image of car" src={imgLink} />
						  ))
						: this.state.car?.videos.map((videoLink: string) => (
								<iframe
									allowFullScreen={true}
									frameBorder="0"
									height="315"
									src={videoLink}
									width="420"
								></iframe>
						  ))}
				</ImageDisplay>

				{this.state.car != null ? (
					<section>
						<CarDataTable car={this.state.car} />
						<Divider orientation="left">Highlights</Divider>
						<HighlightTitle>{this.state.car.highlightsTitle}</HighlightTitle>
						<ExtrasTableComponent items={this.state.car.highLightsItems} />
						<Divider orientation="left">Equipment</Divider>
						<HighlightTitle>{this.state.car.equipmentTitle}</HighlightTitle>
						<ExtrasTableComponent items={this.state.car.equipmentItems} />
						<Divider orientation="left">Flaws</Divider>
						<ExtrasTableComponent items={this.state.car.flaws} />
						<Divider orientation="left">Service history</Divider>
						<HighlightTitle>{this.state.car.serviceHistory}</HighlightTitle>
						<Divider orientation="left">Extra items</Divider>
						<ExtrasTableComponent items={this.state.car.extraItems} />
					</section>
				) : (
					<span>NO Data </span>
				)}
			</div>
		);
	}
}

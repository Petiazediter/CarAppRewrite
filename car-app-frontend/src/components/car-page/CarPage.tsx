import React from 'react';
import {
	CategoriesContainer,
	Category,
	CategoryName,
	FlexContainer,
	HighlightTitle,
	ImageDisplay,
	NoMarginSubTitle,
	NoMarginTitle,
	TopSection,
} from './Carpage.styled';
import { Divider, Image } from 'antd';
import {
	CarFilled,
	EnterOutlined,
	PaperClipOutlined,
	VideoCameraFilled,
} from '@ant-design/icons';
import { CarDataTable } from './CarDataTable';
import { BidComponentHOC, CarResult } from './HigherOrderComponents';
import { TimerDisplayFormat, TimerText } from '../auctions-page/TimerText';
import ExtrasTableComponent from './ExtrasTableComponent';

interface IState {
	imageType: ImageType;
}

enum ImageType {
	EXTERIOR,
	INTERIOR,
	PAPERS,
	VIDEOS,
}

export class CarPage extends React.Component<{ car: CarResult }, IState> {
	constructor(props: { car: CarResult }) {
		super(props);
		this.state = {
			imageType: ImageType.EXTERIOR,
		};
	}

	setImageType(imageType: ImageType) {
		this.setState({
			imageType: imageType,
		});
	}

	render() {
		return (
			<>
				{this.props.car != null ? (
					<div>
						<NoMarginTitle>{this.props.car.name}</NoMarginTitle>
						<NoMarginSubTitle>
							{this.props.car.seller.username}
						</NoMarginSubTitle>
						<NoMarginSubTitle>
							Expiration day: {this.props.car.endDate}
						</NoMarginSubTitle>
						<NoMarginSubTitle>
							Remaining time:
							<TimerText
								fromDate={this.props.car.endDate}
								formatType={TimerDisplayFormat.TRADITIONAL_FORMATTED}
							/>
						</NoMarginSubTitle>
						<BidComponentHOC car={this.props.car} />
						<CategoriesContainer>
							<Category
								background={
									'linear-gradient(to right, #FF416C 0%, #FC6767 100%)'
								}
								onClick={() => this.setImageType(ImageType.PAPERS)}
							>
								<FlexContainer>
									<PaperClipOutlined />
									<CategoryName className="full-width">Papers</CategoryName>
								</FlexContainer>
							</Category>

							<Category
								background={
									'linear-gradient(to right, #EC008C 0%, #FC6767 100%)'
								}
								onClick={() => this.setImageType(ImageType.EXTERIOR)}
							>
								<FlexContainer>
									<CarFilled />
									<CategoryName className="full-width">Exterior</CategoryName>
								</FlexContainer>
							</Category>

							<Category
								background={
									'linear-gradient(to right, #12C2E9 0%, #C471ED 100%)'
								}
								onClick={() => this.setImageType(ImageType.INTERIOR)}
							>
								<FlexContainer>
									<EnterOutlined />
									<CategoryName className="full-width">Interior</CategoryName>
								</FlexContainer>
							</Category>

							<Category
								background={
									'linear-gradient(to right, #52A0FD 0%, #00E2FA 80%, #00E2FA 100%)'
								}
								onClick={() => this.setImageType(ImageType.VIDEOS)}
							>
								<FlexContainer>
									<VideoCameraFilled />
									<CategoryName className="full-width">Videos</CategoryName>
								</FlexContainer>
							</Category>
						</CategoriesContainer>
						<TopSection>
							<ImageDisplay
								autoplay={this.state.imageType !== ImageType.VIDEOS}
							>
								{this.state.imageType === ImageType.PAPERS
									? this.props.car.paperImages.map(({ url }, index: number) => (
											<Image key={index} alt="Image of car" src={url} />
									  ))
									: this.state.imageType === ImageType.EXTERIOR
									? this.props.car.exteriorImages.map(
											({ url }, index: number) => (
												<Image key={index} alt="Car exterior" src={url} />
											)
									  )
									: this.state.imageType === ImageType.INTERIOR
									? this.props.car.interiorImages.map(
											({ url }, index: number) => (
												<Image key={index} alt="Image of car" src={url} />
											)
									  )
									: this.props.car?.videos.map(({ url }, index: number) => (
											<iframe
												key={index}
												title="video about the car"
												allowFullScreen={true}
												frameBorder="0"
												height="315"
												src={url}
												width="420"
											></iframe>
									  ))}
							</ImageDisplay>
							<CarDataTable car={this.props.car} />
						</TopSection>
						<section>
							<Divider orientation="left">
								<h1>Highlights</h1>
							</Divider>

							<HighlightTitle>{this.props.car.highlightsTitle}</HighlightTitle>
							<ExtrasTableComponent
								items={this.props.car.highlightsItems.map(
									(highlight) => highlight.highlight
								)}
							/>
							<Divider orientation="left">
								<h1>Equipment</h1>
							</Divider>
							<HighlightTitle>{this.props.car.equipmentTitle}</HighlightTitle>
							<ExtrasTableComponent
								items={this.props.car.equipmentItems.map(
									(equipment) => equipment.equipment
								)}
							/>
							<Divider orientation="left">
								<h1>Flaws</h1>
							</Divider>
							<ExtrasTableComponent
								items={this.props.car.flaws.map((flaw) => flaw.flaw)}
							/>
							<Divider orientation="left">
								<h1>Service history</h1>
							</Divider>
							<HighlightTitle>{this.props.car.serviceHistory}</HighlightTitle>
							<Divider orientation="left">Extra items</Divider>
							<ExtrasTableComponent
								items={this.props.car.extraItems.map(
									(extraItem) => extraItem.extraItem
								)}
							/>
						</section>
					</div>
				) : (
					<span>NO Data </span>
				)}
			</>
		);
	}
}

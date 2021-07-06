import React from 'react';
import { RouteComponentProps } from 'react-router';
import {Car} from '../../models/Car'
import {ImageDisplay,NoMarginTitle,
        NoMarginSubTitle, Category,FlexContainer,
        CategoryName, CategoriesContainer,HighlightTitle}
    from "./Carpage.styled";
import {Col, Image, Row, Divider} from "antd";
import {PaperClipOutlined, CarFilled, EnterOutlined, VideoCameraFilled} from "@ant-design/icons";
import {CarDataTable} from "./CarDataTable";

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
    VIDEOS
}

export class CarPage extends React.Component<RouteComponentProps<IUrlProps>,IState>{

    constructor(props: any){
        super(props);
        this.state = {
            car: null,
            hook: props.hook,
            imageType: ImageType.EXTERIOR
        }
    }

    componentDidMount() {
        const carId: string|undefined = this.props.match.params.carId;
        if ( carId !== undefined){
            try{
                const car = this.state.hook.getCarById(Number(carId));
                this.setState({
                    car: car,
                    hook: this.state.hook,
                    imageType: this.state.imageType
                })
            }catch (e) {
                console.error('Id is not a number.')
            }
        }
    }

    setImageType( imageType: ImageType){
        this.setState({
            car:this.state.car,
            hook: this.state.hook,
            imageType: imageType
        })
    }

    render(){
        return (
            <div>
                <NoMarginTitle>{this.state.car?.title}</NoMarginTitle>
                <NoMarginSubTitle>{this.state.car?.seller.username}</NoMarginSubTitle>
                <NoMarginSubTitle>Expiration day: {this.state.car?.endDate}</NoMarginSubTitle>

                <Row className="full-width">
                    <Col flex={1}>
                        <CategoriesContainer>
                            <Category background={"red"} onClick={() => this.setImageType(ImageType.PAPERS)}>
                                <FlexContainer>
                                    <PaperClipOutlined />
                                    <CategoryName className="full-width">Papers</CategoryName>
                                </FlexContainer>
                            </Category>

                            <Category background={"orange"} onClick={() => this.setImageType(ImageType.EXTERIOR)}>
                                <FlexContainer>
                                    <CarFilled />
                                    <CategoryName className="full-width">Exterior</CategoryName>
                                </FlexContainer>
                            </Category>

                            <Category background={"green"} onClick={() => this.setImageType(ImageType.INTERIOR)}>
                                <FlexContainer>
                                    <EnterOutlined />
                                    <CategoryName className="full-width">Interior</CategoryName>
                                </FlexContainer>
                            </Category>

                            <Category background={"blue"} onClick={() => this.setImageType(ImageType.VIDEOS)}>
                                <FlexContainer>
                                    <VideoCameraFilled />
                                    <CategoryName className="full-width">Videos</CategoryName>
                                </FlexContainer>
                            </Category>
                        </CategoriesContainer>
                    </Col>
                    <Col flex={1}>
                        <ImageDisplay autoplay={true}>

                            { this.state.imageType === ImageType.PAPERS ?
                                    this.state.car?.paperImages.map((imgLink:string) =>
                                        <Image alt="Image of car" src={imgLink} />)
                                :
                                this.state.imageType === ImageType.EXTERIOR ?
                                    this.state.car?.exteriorImages.map((imgLink:string) =>
                                        <Image  alt="Car exterior" src={imgLink} />)
                                :
                                this.state.imageType === ImageType.INTERIOR ?
                                    this.state.car?.interiorImages.map((imgLink:string) =>
                                        <Image  alt="Image of car" src={imgLink} />)
                                :
                                <h2>Video format not supported yet</h2>
                            }
                        </ImageDisplay>
                    </Col>
                </Row>

                {this.state.car != null ?
                    <section>
                        <CarDataTable car={this.state.car} />
                        <Divider orientation="left">Highlights</Divider>
                        <HighlightTitle>{this.state.car.highlightsTitle}</HighlightTitle>
                        <ul>
                            {this.state.car.highLightsItems.map((item:string) =>
                                <li>{item}</li>
                            )}
                        </ul>
                        <Divider orientation="left">Equipment</Divider>
                        <HighlightTitle>{this.state.car.equipmentTitle}</HighlightTitle>
                        <ul>
                            {this.state.car.equipmentItems.map((item:string) =>
                                <li>{item}</li>
                            )}
                        </ul>
                        <Divider orientation="left">Flaws</Divider>
                        <ul>
                            {this.state.car.flaws.map((item:string) =>
                                <li>{item}</li>
                            )}
                        </ul>
                    </section>
                : <span>NO Data </span>}
            </div>
        )
    }
}


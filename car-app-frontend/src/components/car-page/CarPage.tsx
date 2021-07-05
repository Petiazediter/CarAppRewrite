import React from 'react';
import { RouteComponentProps } from 'react-router';
import {Car} from '../../models/Car'
import {ImageDisplay,NoMarginTitle,NoMarginSubTitle, Category, CategoriesContainer} from "./Carpage.styled";
import {Col, Image, Row} from "antd";

interface IUrlProps {
    carId: string | undefined;
}
interface IState {
    car: Car | null;
    hook: any;
}

export class CarPage extends React.Component<RouteComponentProps<IUrlProps>,IState>{

    constructor(props: any){
        super(props);
        this.state = {
            car: null,
            hook: props.hook
        }
    }

    componentDidMount() {
        const carId: string|undefined = this.props.match.params.carId;
        if ( carId !== undefined){
            try{
                const car = this.state.hook.getCarById(Number(carId));
                this.setState({
                    car: car,
                    hook: this.state.hook
                })
            }catch (e) {
                console.error('Id is not a number.')
            }
        }
    }

    render(){
        return (
            <div>
                <NoMarginTitle>{this.state.car?.title}</NoMarginTitle>
                <NoMarginSubTitle>{this.state.car?.seller.username}</NoMarginSubTitle>
                <NoMarginSubTitle>Expiration day: {this.state.car?.endDate}</NoMarginSubTitle>

                <Row className="full-width" gutter={[8, 8]}>
                    <Col span={12}>
                        <ImageDisplay autoplay={true}>
                            { this.state.car?.exteriorImages.map(imgLink =>
                                <Image alt="Image of car" src={imgLink} />
                            )}
                        </ImageDisplay>
                    </Col>
                    <Col span={12}>
                        <CategoriesContainer>
                            <Category background={"red"}>
                                Hello world
                            </Category>

                            <Category background={"red"}>
                                Hello world
                            </Category>

                            <Category background={"red"}>
                                Hello world
                            </Category>
                        </CategoriesContainer>
                    </Col>
                </Row>
            </div>
        )
    }
}


import React from 'react';
import { RouteComponentProps } from 'react-router';
import {Car} from '../../models/Car'
import {CarPageHOC} from "./CarPageHOC";
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
                <h1>{this.state.car?.title}</h1>
                <h2>{this.state.car?.seller.username}</h2>
                <h3>Expiration day: {this.state.car?.endDate}</h3>
            </div>
        )
    }
}

export default CarPageHOC;

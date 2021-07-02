import React from 'react';
import { RouteComponentProps } from 'react-router';
import {Car} from '../../models/Car'
import {useGetCars} from "../../context/DatabaseContext";
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
                <h1>Hello there!</h1>
                <h2>Car id: {this.state.car?.id}</h2>
            </div>
        )
    }
}

export default CarPageHOC;

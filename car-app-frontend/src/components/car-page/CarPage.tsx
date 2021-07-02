import React from 'react';
import { RouteComponentProps } from 'react-router';

interface IUrlProps {
    carId: string | undefined;
}
interface IState {
    carId : number;
}

export class CarPage extends React.Component<RouteComponentProps<IUrlProps>,IState>{

    constructor(props: any){
        super(props);
        this.state = {
            carId: -1
        }
    }

    componentDidMount() {
        const carId: string|undefined = this.props.match.params.carId;
        if ( carId !== undefined){
            try{
                this.setState({
                    carId: Number(carId)
                });
            }catch (e) {
                console.error('Id is not a number.')
            }
        }
    }

    render(){
        return (
            <div>
                <h1>Hello there!</h1>
                <h2>Car id: {this.state.carId}</h2>
            </div>
        )
    }
}

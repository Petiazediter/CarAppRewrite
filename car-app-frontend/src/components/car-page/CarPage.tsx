import React from 'react';
import { RouteComponentProps } from 'react-router';

interface IUrlProps {
    carId: string | undefined;
}
interface IState {
    carId : string;
}

export class CarPage extends React.Component<RouteComponentProps<IUrlProps>,IState>{

    render(){
        return (
            <div>
                <h1>Hello there!</h1>
                <h2>Car id: {this.props.match.params.carId}</h2>
            </div>
        )
    }
}

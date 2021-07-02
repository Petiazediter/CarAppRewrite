import React from 'react';

export class CarPage extends React.Component{

    constructor(props: {carId: number}) {
        super(props);
        this.state = {
            carId: props.carId
        }
    }

    componentDidUpdate(prevProps: Readonly<{carId: number}>, prevState: Readonly<{}>, snapshot?: any) {

    }
}

import React from 'react';
import { Car } from '../../models/Car';

export type BidComponentProps = {
	car: Car;
};

export default class BidComponent extends React.Component<BidComponentProps> {
	render() {
		return <h1>Hello bid component</h1>;
	}
}

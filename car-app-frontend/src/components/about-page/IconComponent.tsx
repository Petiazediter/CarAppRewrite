import { Component } from 'react';
import { IconElement } from './IconComponent.styled';

export type IconComponentProps = {
	title: string;
	description: string;
	icon: any;
};

type IconComponentState = {};

export default class IconComponent extends Component<
	IconComponentProps,
	IconComponentState
> {
	render() {
		return (
			<IconElement>
				{this.props.icon}
				<h2>{this.props.title}</h2>
				<p>{this.props.description}</p>
			</IconElement>
		);
	}
}

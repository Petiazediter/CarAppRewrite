import React, { Component, ReactElement } from 'react';

export type IconComponentProps = {
	title: string;
	description: string;
	icon: ReactElement;
};

type IconComponentState = {};

export default class IconComponent extends Component<
	IconComponentProps,
	IconComponentState
> {
	constructor(props: IconComponentProps) {
		super(props);
	}

	render() {
		return (
			<div>
				{this.props.icon}
				<h2>{this.props.title}</h2>
				<p>{this.props.description}</p>
			</div>
		);
	}
}

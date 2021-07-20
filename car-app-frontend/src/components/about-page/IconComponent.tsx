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
				<h1>{this.props.title}</h1>
			</div>
		);
	}
}

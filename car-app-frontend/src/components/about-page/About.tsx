import { FunctionComponent } from 'react';
import IconComponent from './IconComponent';
import {
	Arrow,
	Car,
	Check,
	Container,
	IconComponentContainer,
} from './IconComponent.styled';

export const About: FunctionComponent = () => {
	return (
		<div>
			<h1>What's CarBidApp?</h1>
			<IconComponentContainer>
				<IconComponent
					title="Low fees"
					icon={<Arrow />}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quisquam totam."
				/>
				<IconComponent
					title="Verified car data"
					icon={<Car />}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quisquam totam."
				/>
				<IconComponent
					title="More information"
					icon={<Container />}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quisquam totam."
				/>
				<IconComponent
					title="Easy to use"
					icon={<Check />}
					description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quisquam totam."
				/>
			</IconComponentContainer>
		</div>
	);
};

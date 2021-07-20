import {
	ArrowDownOutlined,
	CarOutlined,
	CheckOutlined,
	ContainerOutlined,
} from '@ant-design/icons';
import IconComponent from './IconComponent';

export function About() {
	return (
		<div>
			<h1>What's CarBidApp?</h1>
			<IconComponent
				title="Low fees"
				icon={<ArrowDownOutlined />}
				description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quisquam totam."
			/>
			<IconComponent
				title="Verified car data"
				icon={<CarOutlined />}
				description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quisquam totam."
			/>
			<IconComponent
				title="More information"
				icon={<ContainerOutlined />}
				description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quisquam totam."
			/>
			<IconComponent
				title="Easy to use"
				icon={<CheckOutlined />}
				description="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quisquam totam."
			/>
		</div>
	);
}

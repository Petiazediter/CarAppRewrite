import styled from '@emotion/styled';
import { Carousel } from 'antd';

export const NoMarginTitle = styled.h1({
	margin: 0,
	padding: 0,
	fontFamily: 'sans-serif',
});

export const NoMarginSubTitle = styled.h2({
	margin: 0,
	padding: 0,
	fontFamily: 'sans-serif',
});

export const CategoriesContainer = styled.div({
	position: 'relative',
	display: 'flex',
	justifyContent: 'center',
});

interface ICategoryProps {
	background: string;
}

export const Category = styled.section<ICategoryProps>(
	{
		cursor: 'pointer',
		margin: '1em',
		width: '80px',
		aspectRatio: '1/1',
		display: 'flex',
		justifyContent: 'center',
		alignContent: 'center',
		color: 'white',
		position: 'relative',
	},
	(props) => ({
		background: `${props.background}`,
	})
);

export const FlexContainer = styled.div({
	display: 'flex',
	flexWrap: 'wrap',
	justifyContent: 'center',
	alignContent: 'center',
	color: 'white',
	textAlign: 'center',
	position: 'relative',
});

export const CategoryName = styled.h2({
	color: 'white',
	fontSize: 'large',
});

export const HighlightTitle = styled.h1({
	width: '100%',
	padding: '1em',
	boxSizing: 'border-box',
	background: 'linear-gradient(to right, #FF416C 0%, #FC6767 100%)',
	color: 'white',
	fontWeight: 'bold',
	borderRadius: '22px',
});

export const TopSection = styled.section({
	display: 'initial',
	width: '100%',
});

export const ImageDisplay = styled(Carousel)({
	position: 'relative',
	width: '100%',
	background: 'black',
});

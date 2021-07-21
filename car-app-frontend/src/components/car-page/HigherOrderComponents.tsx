import { FunctionComponent, useContext } from 'react';
import { useDatabaseContext } from '../../context/DatabaseContext';
import { MyThemeContext } from '../../context/ThemeContext';
import { Car } from '../../models/Car';
import BidComponent from './BidComponent';

export const CarPageHOC = (Component: any) => {
	const getCarHook = useDatabaseContext();
	return (props: any) => {
		return <Component hook={getCarHook} {...props} />;
	};
};

export const BidComponentHOC: FunctionComponent<{ car: Car }> = (props) => {
	const { isDark } = useContext(MyThemeContext);
	return <BidComponent isDark={isDark} car={props.car} />;
};

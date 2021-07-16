import { AutoComplete, Dropdown, Input, Menu, Row } from 'antd';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../../utils/WindowSize';
import { MenuOutlined, SwitcherOutlined } from '@ant-design/icons';
import {
	IS_HIGHLIGHTED,
	LeftAlignedH1,
	NavbarLink,
	NavbarMenuCol,
	StyledNav,
	TitleLink,
} from './Navbar.styled';
import { FunctionComponent, useContext, useState } from 'react';
import { useDatabaseContext } from '../../../context/DatabaseContext';
import { Car } from '../../../models/Car';
import { MyThemeContext } from '../../../context/ThemeContext';

const { Search } = Input;

const menu = (
	<Menu>
		<Menu.Item key="0">
			<Link to="/">Auctions</Link>
		</Menu.Item>
		<Menu.Item key="1">
			<Link to="/sell">Sell a car</Link>
		</Menu.Item>
		<Menu.Item key="2">
			<Link to="/about">About</Link>
		</Menu.Item>
		<Menu.Divider />
		<Menu.Item key="3">
			<Link to="/sign-in">Sign in</Link>
		</Menu.Item>
	</Menu>
);

const onSearch = (term: string) => {
	console.log(term);
};

const searchStyle = {
	width: '100%',
	height: '100%',
	padding: '5px',
};

const renderTitle = (title: string) => (
	<span>
		{title}
		<Link
			to={'/brands'}
			style={{
				float: 'right',
			}}
		>
			more
		</Link>
	</span>
);

const renderItem = (title: string) => ({
	value: title,
	label: (
		<div
			style={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			{title}
		</div>
	),
});

const getOptionsBySearch = (searchTerm: string, cars: Car[]): OptionType[] => {
	return [
		{
			label: renderTitle('Bids'),
			options: cars.map((value) => renderItem(value.title)),
		},
		{
			label: renderTitle('Users'),
			options: [renderItem('User1'), renderItem('User2')],
		},
	];
};

export type ItemType = {
	value: string;
	label: JSX.Element;
};

export type OptionType = {
	label: JSX.Element;
	options: ItemType[];
};

export const Navbar: FunctionComponent = () => {
	const { width } = useWindowDimensions();
	const [searchTerm, setSearchTerm] = useState('');
	const initial: OptionType[] = [];
	const [options, setOptions] = useState(initial);
	const initialTable: Car[] = [];
	const [filterCars, setFilterCars] = useState(initialTable);
	const getCarFromDatabase = useDatabaseContext().getCarBySearchTerm;
	const { toggleTheme } = useContext(MyThemeContext);

	const onSearchChange = (value: string) => {
		setSearchTerm(value);
		setOptions(getOptionsBySearch(searchTerm, filterCars));
		setFilterCars(getCarFromDatabase(searchTerm));
	};

	return width >= 800 ? (
		<StyledNav>
			<Row>
				<NavbarMenuCol flex={1}>
					<TitleLink to="/">
						<LeftAlignedH1>CarBidApp</LeftAlignedH1>
					</TitleLink>
				</NavbarMenuCol>
				<NavbarMenuCol flex={1}>
					<NavbarLink to="/auctions">Auctions</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol highlight={IS_HIGHLIGHTED} flex={1}>
					<NavbarLink highlight={IS_HIGHLIGHTED} to="/sell">
						Sell a car
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol flex={1}>
					<NavbarLink to="/about">About us</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol flex={4}>
					<AutoComplete
						className="full-width"
						dropdownClassName="certain-category-search-dropdown"
						dropdownMatchSelectWidth={500}
						options={options}
					>
						<Search
							placeholder="Search for cars"
							onChange={(event) => {
								onSearchChange(event.target.value);
							}}
							onSearch={onSearch}
							style={searchStyle}
						/>
					</AutoComplete>
				</NavbarMenuCol>
				<NavbarMenuCol highlight={IS_HIGHLIGHTED} flex={1}>
					<NavbarLink highlight={IS_HIGHLIGHTED} to="/sign-in">
						Sign in
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol style={{ padding: '1em' }}>
					<SwitcherOutlined onClick={toggleTheme} />
				</NavbarMenuCol>
			</Row>
		</StyledNav>
	) : (
		<StyledNav>
			<Row>
				<NavbarMenuCol flex={1}>
					<TitleLink to="/">
						<LeftAlignedH1>CarBidApp</LeftAlignedH1>
					</TitleLink>
				</NavbarMenuCol>
				<NavbarMenuCol flex={3}>
					<Search
						placeholder="Search for cars"
						onSearch={onSearch}
						style={searchStyle}
					/>
				</NavbarMenuCol>
				<NavbarMenuCol flex={1}>
					<Dropdown overlay={menu} trigger={['click']}>
						<MenuOutlined onClick={(e) => e.preventDefault()} />
					</Dropdown>
				</NavbarMenuCol>
			</Row>
		</StyledNav>
	);
};

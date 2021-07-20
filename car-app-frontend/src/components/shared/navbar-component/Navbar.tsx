import { AutoComplete, Dropdown, Input, Menu, Row } from 'antd';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../../customHooks/useWindowDimensions';
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
import { UserContext } from '../../../context/UserContext';

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

const onSearch = (term: string) => {};

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
	const { toggleTheme, isDark } = useContext(MyThemeContext);

	const { user } = useContext(UserContext);

	const onSearchChange = (value: string) => {
		setSearchTerm(value);
		setOptions(getOptionsBySearch(searchTerm, filterCars));
		setFilterCars(getCarFromDatabase(searchTerm));
	};

	return width >= 800 ? (
		<StyledNav isDark={isDark}>
			<Row>
				<NavbarMenuCol isDark={isDark} flex={1}>
					<TitleLink to="/">
						<LeftAlignedH1>CarBidApp</LeftAlignedH1>
					</TitleLink>
				</NavbarMenuCol>
				<NavbarMenuCol isDark={isDark} flex={1}>
					<NavbarLink isDark={isDark} to="/">
						Auctions
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol isDark={isDark} highlight={IS_HIGHLIGHTED} flex={1}>
					<NavbarLink isDark={isDark} highlight={IS_HIGHLIGHTED} to="/sell">
						Sell a car
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol isDark={isDark} flex={1}>
					<NavbarLink isDark={isDark} to="/about">
						About us
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol isDark={isDark} flex={4}>
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
				<NavbarMenuCol isDark={isDark} highlight={IS_HIGHLIGHTED} flex={1}>
					<NavbarLink isDark={isDark} highlight={IS_HIGHLIGHTED} to="/sign-in">
						{user === undefined ? 'Sign in' : 'Profile'}
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol isDark={isDark} style={{ padding: '1em' }}>
					<SwitcherOutlined
						color={isDark ? 'white' : 'black'}
						onClick={toggleTheme}
					/>
				</NavbarMenuCol>
			</Row>
		</StyledNav>
	) : (
		<StyledNav isDark={isDark}>
			<Row>
				<NavbarMenuCol isDark={isDark} flex={1}>
					<TitleLink to="/">
						<LeftAlignedH1>CarBidApp</LeftAlignedH1>
					</TitleLink>
				</NavbarMenuCol>
				<NavbarMenuCol isDark={isDark} flex={3}>
					<Search
						placeholder="Search for cars"
						onSearch={onSearch}
						style={searchStyle}
					/>
				</NavbarMenuCol>
				<NavbarMenuCol isDark={isDark} flex={1}>
					<Dropdown overlay={menu} trigger={['click']}>
						<MenuOutlined onClick={(e) => e.preventDefault()} />
					</Dropdown>
				</NavbarMenuCol>
			</Row>
		</StyledNav>
	);
};

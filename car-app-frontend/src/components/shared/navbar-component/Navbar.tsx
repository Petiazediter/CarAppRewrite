import { AutoComplete, Dropdown, Input, Menu, Row } from 'antd';
import { Link } from 'react-router-dom';
import useWindowDimensions from '../../../customHooks/useWindowDimensions';
import { MenuOutlined, SwitcherOutlined } from '@ant-design/icons';
import {
	IS_DARK,
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
import { gql, useQuery } from '@apollo/client';
import { UserContext } from '../../../context/UserContext';

const { Search } = Input;

const menuItems: { title: string; link: string }[] = [
	{
		title: 'Auctions',
		link: '/',
	},
	{
		title: 'Sell a car',
		link: '/sell',
	},
	{
		title: 'About',
		link: '/about',
	},
	{
		title: 'Sign in',
		link: '/sign-in',
	},
];

const menu = (
	<Menu>
		{menuItems.map((item, index) => (
			<Menu.Item key={index}>
				<Link to={item.link}>{item.title}</Link>
			</Menu.Item>
		))}
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

export const ME_QUERY = gql`
	query MeQuery {
		me {
			id
			username
		}
	}
`;

export const Navbar: FunctionComponent = () => {
	const { width } = useWindowDimensions();
	const [searchTerm, setSearchTerm] = useState('');
	const initial: OptionType[] = [];
	const [options, setOptions] = useState(initial);
	const initialTable: Car[] = [];
	const [filterCars, setFilterCars] = useState(initialTable);
	const getCarFromDatabase = useDatabaseContext().getCarBySearchTerm;
	const { toggleTheme, isDark } = useContext(MyThemeContext);
	//const { data } = useQuery<{ id: number; username: string }>(ME_QUERY);
	const { user } = useContext(UserContext);

	const onSearchChange = (value: string) => {
		setSearchTerm(value);
		setOptions(getOptionsBySearch(searchTerm, filterCars));
		setFilterCars(getCarFromDatabase(searchTerm));
	};

	return width >= 800 ? (
		<StyledNav isdark={isDark ? IS_DARK : ''}>
			<h1>{isDark}</h1>
			<Row>
				<NavbarMenuCol isdark={isDark ? IS_DARK : ''} flex={1}>
					<TitleLink to="/">
						<LeftAlignedH1 isdark={isDark ? IS_DARK : ''}>
							CarBidApp
						</LeftAlignedH1>
					</TitleLink>
				</NavbarMenuCol>
				<NavbarMenuCol isdark={isDark ? IS_DARK : ''} flex={1}>
					<NavbarLink isdark={isDark ? IS_DARK : ''} to="/">
						Auctions
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol
					isdark={isDark ? IS_DARK : ''}
					highlight={IS_HIGHLIGHTED}
					flex={1}
				>
					<NavbarLink
						isdark={isDark ? IS_DARK : ''}
						highlight={IS_HIGHLIGHTED}
						to="/sell"
					>
						Sell a car
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol isdark={isDark ? IS_DARK : ''} flex={1}>
					<NavbarLink isdark={isDark ? IS_DARK : ''} to="/about">
						About us
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol isdark={isDark ? IS_DARK : ''} flex={4}>
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
				<NavbarMenuCol
					isdark={isDark ? IS_DARK : ''}
					highlight={IS_HIGHLIGHTED}
					flex={1}
				>
					<NavbarLink
						isdark={isDark ? IS_DARK : ''}
						highlight={IS_HIGHLIGHTED}
						to={user !== undefined ? `/user/me` : '/sign-in'}
					>
						{user === undefined ? 'Sign in' : 'Profile'}
					</NavbarLink>
				</NavbarMenuCol>
				<NavbarMenuCol
					isdark={isDark ? IS_DARK : ''}
					style={{ padding: '1em' }}
				>
					<SwitcherOutlined
						color={isDark ? 'white' : 'black'}
						onClick={toggleTheme}
					/>
				</NavbarMenuCol>
			</Row>
		</StyledNav>
	) : (
		<StyledNav isdark={isDark ? IS_DARK : ''}>
			<Row>
				<NavbarMenuCol isdark={isDark ? IS_DARK : ''} flex={1}>
					<TitleLink to="/">
						<LeftAlignedH1 isdark={isDark ? IS_DARK : ''}>
							CarBidApp
						</LeftAlignedH1>
					</TitleLink>
				</NavbarMenuCol>
				<NavbarMenuCol isdark={isDark ? IS_DARK : ''} flex={3}>
					<Search
						placeholder="Search for cars"
						onSearch={onSearch}
						style={searchStyle}
					/>
				</NavbarMenuCol>
				<NavbarMenuCol isdark={isDark ? IS_DARK : ''} flex={1}>
					<Dropdown overlay={menu} trigger={['click']}>
						<MenuOutlined onClick={(e) => e.preventDefault()} />
					</Dropdown>
				</NavbarMenuCol>
			</Row>
		</StyledNav>
	);
};

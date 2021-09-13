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
import { MyThemeContext } from '../../../context/ThemeContext';
import { UserContext } from '../../../context/UserContext';
import { gql, useLazyQuery } from '@apollo/client';

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

const renderItem = (title: string, id: number) => ({
	value: title,
	label: (
		<div
			key={id}
			style={{
				display: 'flex',
				justifyContent: 'space-between',
			}}
		>
			<Link to={`/car/${id}`}>{title}</Link>
		</div>
	),
});

const getOptionsBySearch = (
	searchTerm: string,
	cars: { carByTitle: { id: number; name: string }[] } | undefined
): OptionType[] => {
	if (cars) {
		return [
			{
				label: renderTitle('Auctions'),
				options: cars.carByTitle.map((car) => renderItem(car.name, car.id)),
			},
		];
	}
	return [];
};

export type ItemType = {
	value: string;
	label: JSX.Element;
};

export type OptionType = {
	label: JSX.Element;
	options: ItemType[];
};

const CAR_FILTER_QUERY = gql`
	query CarFilter($titleFragment: String!) {
		carByTitle(titleFragment: $titleFragment) {
			id
			name
		}
	}
`;

export const Navbar: FunctionComponent = () => {
	const { width } = useWindowDimensions();
	const [searchTerm, setSearchTerm] = useState('');
	const initial: OptionType[] = [];
	const [options, setOptions] = useState(initial);
	const { toggleTheme, isDark } = useContext(MyThemeContext);
	const { user } = useContext(UserContext);

	const [findByTitle, { data: cars }] = useLazyQuery<{
		carByTitle: { id: number; name: string }[];
	}>(CAR_FILTER_QUERY, {
		variables: {
			titleFragment: searchTerm,
		},
	});

	const onSearchChange = (value: string) => {
		setSearchTerm(value);
		findByTitle();
		setOptions(getOptionsBySearch(searchTerm, cars));
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

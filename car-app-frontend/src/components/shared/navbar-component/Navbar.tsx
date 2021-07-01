import { Row, Menu, AutoComplete, Dropdown, Input } from "antd"
import { Link } from 'react-router-dom'
import useWindowDimensions from '../../../utils/WindowSize'
import { MenuOutlined, CarFilled } from '@ant-design/icons'
import { StyledNav, NavbarLink, NavbarMenuCol, TitleLink, LeftAlignedH1 } from "./Navbar.styled";

const { Search } = Input;

const menu = (
    <Menu>
        <Menu.Item key="0">
            <Link to="/auctions">Auctions</Link>
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
    console.log(term)
}

const searchStyle = {
    width:'100%',
    height:'100%',
    padding:'5px',
}

const renderTitle = (title:string) => (
    <span>
      {title}
      <a
        style={{
          float: 'right',
        }}
        href="/brands"
        rel="noopener noreferrer"
      >
        more
      </a>
    </span>
);

  const renderItem = (title:string) => ({
    value: title,
    label: (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        {title}
        <span>
            <CarFilled /> {10}
        </span>
      </div>
    ),
});

const options = [
    {
      label: renderTitle('Brands'),
      options: [renderItem('Audi'), renderItem('BMW')],
    }
];

export function Navbar() {
    const { width } = useWindowDimensions();

    return width >= 800 ? (
    <StyledNav>
        <Row>
            <NavbarMenuCol flex={1}>
                <TitleLink to="/"><LeftAlignedH1>CarBidApp</LeftAlignedH1></TitleLink>
            </NavbarMenuCol>
            <NavbarMenuCol flex={1}>
                <NavbarLink to="/auctions">Auctions</NavbarLink>
            </NavbarMenuCol>
            <NavbarMenuCol highlight={true} flex={1}>
                <NavbarLink highlight={true} to="/sell">Sell a car</NavbarLink>
            </NavbarMenuCol>

            <NavbarMenuCol flex={1}>
                <NavbarLink to="/about">About us</NavbarLink>
            </NavbarMenuCol>
            <NavbarMenuCol flex={4}>
            <AutoComplete
                className="full-width"
                dropdownClassName="certain-category-search-dropdown"
                dropdownMatchSelectWidth={500}
                options={ options }>
                <Search placeholder="Search for cars" onSearch={onSearch} style={searchStyle} />
            </AutoComplete>
            </NavbarMenuCol>
            <NavbarMenuCol highlight={true} flex={1}>
                <NavbarLink highlight={true} to="/sign-in">Sign in</NavbarLink>
            </NavbarMenuCol>
        </Row>
    </StyledNav>) : 
    (<StyledNav>
        <Row>
            <NavbarMenuCol flex={1}>
                <TitleLink to="/"><LeftAlignedH1>CarBidApp</LeftAlignedH1></TitleLink>
            </NavbarMenuCol>
            <NavbarMenuCol flex={3}>
                <Search placeholder="Search for cars" onSearch={onSearch} style={searchStyle} />
            </NavbarMenuCol>
            <NavbarMenuCol flex={1}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <MenuOutlined onClick={e => e.preventDefault()}/>
                </Dropdown>
            </NavbarMenuCol>
        </Row>
    </StyledNav>)
}

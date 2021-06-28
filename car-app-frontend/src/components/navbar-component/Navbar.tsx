import styled from "@emotion/styled"
import { Row, Col, Menu, Dropdown, Input } from "antd"
import { Link } from 'react-router-dom'
import useWindowDimensions from '../../hooks/WindowSize'
import { MenuOutlined } from '@ant-design/icons'

const { Search } = Input;
export const navbarHeight: string = '60px';

interface NavbarMenuColProps{
    isHighlighted?: boolean;
}

const NavbarMenuCol = styled(Col)<NavbarMenuColProps>`
    background: ${(p: NavbarMenuColProps) => p.isHighlighted ? '#676CE1' : 'none'};
    color: ${(p: NavbarMenuColProps) => p.isHighlighted ? 'white' : 'black'};
    border-radius: 15px;
    font-weight:bolder;
    text-align:center;
    display:flex;
    align-items: center;
    justify-content: center;
    position:relative;
    &:hover{
        background: ${(p:NavbarMenuColProps) => p.isHighlighted ? '#6065DB' : 'none'};
    }
`

const StyledNav = styled('nav')`
    box-shadow: 0 1px 0 0 rgba(100,100,100,.2);
    height: ${navbarHeight};
    position:fixed;
    background:white;
    width:100%;
    left:0;
    top:0;
    padding-top:.5em;
    @media only screen and ( min-width: 800px) {
        left:50%;
        transform:translateX(-50%);
        width:85.1%;
        margin:auto;
    }
`

const NavbarLink = styled(Link)<NavbarMenuColProps>`
    color:${(p: NavbarMenuColProps) => p.isHighlighted ? '#eee' : 'grey'};
    &:hover{
        background: ${(p:NavbarMenuColProps) => p.isHighlighted ? '#6065DB' : 'none'};
        color:${(p: NavbarMenuColProps) => p.isHighlighted ? 'white' : 'black'};
    }
`

const TitleLink = styled(Link)`
    position:relative;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
`

const LeftAlignedH1 = styled('h1')`
    position:relative;
    width:100%;
    padding:0;
    margin:0;
    text-align:left;
`

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

const searchStyle ={
    width:'100%',
    height:'100%',
    padding:'5px'
}

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
            <NavbarMenuCol isHighlighted flex={1}>
                <NavbarLink isHighlighted to="/sell">Sell a car</NavbarLink>
            </NavbarMenuCol>

            <NavbarMenuCol flex={1}>
                <NavbarLink to="/about">About us</NavbarLink>
            </NavbarMenuCol>
            <NavbarMenuCol flex={4}>
            <Search placeholder="Search for cars" onSearch={onSearch} style={searchStyle} />
            </NavbarMenuCol>
            <NavbarMenuCol isHighlighted flex={1}>
                <NavbarLink isHighlighted to="/sign-in">Sign in</NavbarLink>
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
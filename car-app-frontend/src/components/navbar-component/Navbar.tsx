import styled from "@emotion/styled"
import { Row, Col, Menu, Dropdown } from "antd"
import { Link } from 'react-router-dom'
import useWindowDimensions from '../../hooks/WindowSize'
import { MenuOutlined } from '@ant-design/icons'

interface NavbarMenuColProps{
    isHighlighted?: boolean;
}

const NavbarMenuCol = styled(Col)<NavbarMenuColProps>`
    background: ${(p: NavbarMenuColProps) => p.isHighlighted ? '#676CE1' : 'none'};
    color: ${(p: NavbarMenuColProps) => p.isHighlighted ? 'white' : 'black'};
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
    margin-bottom: 1em;
    box-shadow: 0px 1px 0px rgba(100,100,100,.2);
    padding-bottom: 5px;
`

const FilledRowInput = styled('input')`
    position:relative;
    width:100%;
    height:100%;
    outline:none;
    border:none;
    font-weight:bold;
    background:#FCFCFC;
    padding:1em;
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
            <Link to="/about">About</Link>
        </Menu.Item>
        <Menu.Item key="1">
            <Link to="/sell">Sell a car</Link>
        </Menu.Item>
        <Menu.Item key="2">
            <Link to="/auctions">Auctions</Link>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="3">
            <Link to="/sign-in">Sign in</Link>
        </Menu.Item>
  </Menu>
);

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
                <FilledRowInput type="text" placeholder="search"/>
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
                <FilledRowInput type="text" placeholder="search"/>
            </NavbarMenuCol>
            <NavbarMenuCol flex={1}>
                <Dropdown overlay={menu} trigger={['click']}>
                    <MenuOutlined onClick={e => e.preventDefault()}/>
                </Dropdown>
            </NavbarMenuCol>
        </Row>
    </StyledNav>)
}
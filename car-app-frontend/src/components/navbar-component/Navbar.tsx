import styled from "@emotion/styled"
import { Row, Col } from "antd"
import { Link,BrowserRouter } from 'react-router-dom'

interface NavbarMenuColProps{
    isHighlighted?: boolean;
}

const NavbarMenuCols = styled(Col)<NavbarMenuColProps>`
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

const LeftAlignedH1 = styled('h1')`
    width:100%;
    text-align:left;
    margin:0;
    padding:0;
`

const FilledRowInput = styled('input')`
    position:relative;
    width:100%;
    height:100%;
    outline:none;
    border:none;
    font-weight:bold;
    background:#FCFCFC;
    padding:1em 0 1em 0;
`

const NavbarLink = styled(Link)<NavbarMenuColProps>`
    color:${(p: NavbarMenuColProps) => p.isHighlighted ? '#eee' : 'grey'};
    &:hover{
        background: ${(p:NavbarMenuColProps) => p.isHighlighted ? '#6065DB' : 'none'};
        color:${(p: NavbarMenuColProps) => p.isHighlighted ? 'white' : 'black'};
    }
`

export function Navbar() {
    return (
    <StyledNav>
        <Row>
            <NavbarMenuCols flex={1}>
                <Link to="/"><LeftAlignedH1>CarBidApp</LeftAlignedH1></Link>
            </NavbarMenuCols>
            <NavbarMenuCols flex={1}>
                <NavbarLink to="/about">About us</NavbarLink>
            </NavbarMenuCols>
            <NavbarMenuCols isHighlighted flex={1}>
                <NavbarLink isHighlighted to="/sell">Sell a car</NavbarLink>
            </NavbarMenuCols>
            <NavbarMenuCols flex={1}>
                <NavbarLink to="/auctions">Auctions</NavbarLink>
            </NavbarMenuCols>
            <NavbarMenuCols flex={4}>
                <FilledRowInput type="text" placeholder="search"/>
            </NavbarMenuCols>
            <NavbarMenuCols isHighlighted flex={1}>
                <NavbarLink isHighlighted to="/sign-in">Sign in</NavbarLink>
            </NavbarMenuCols>
        </Row>
    </StyledNav>)
}
import styled from "@emotion/styled";
import {Col} from "antd";
import {Link} from "react-router-dom";

export const navbarHeight: string = '60px';

interface NavbarMenuColProps{
    highlight?: boolean;
}
/*
export const NavbarMenuCol = styled(Col)<NavbarMenuColProps>`
    background: ${(p: NavbarMenuColProps) => p.highlight ? '#fc5c65' : 'none'};
    color: ${(p: NavbarMenuColProps) => p.highlight ? 'white' : 'black'};
    font-weight:bolder;
    text-align:center;
    display:flex;
    align-items: center;
    justify-content: center;
    position:relative;
    &:hover{
        background: ${(p:NavbarMenuColProps) => p.highlight ? '#eb3b5a' : 'none'};
    }
`
 */

export const NavbarMenuCol = styled(Col)<NavbarMenuColProps>(props => ({
    background: `${props.highlight ? '#fc5c65' : 'none'}`,
    color: props.highlight ? 'white' : 'black',
    fontWeight: 'bolder',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    ['&:hover']: {
        background: props.highlight ? '#eb3b5a': 'none'
    }
}))

export const StyledNav = styled('nav')`
    z-index:10;
    box-shadow: 0 1px 0 0 rgba(100,100,100,.2);
    height: ${navbarHeight};
    position:fixed;
    background:white;
    width:100%;
    left:0;
    top:0;
    margin:0;
    padding-top:.5em;
    @media only screen and ( min-width: 800px) {
        left:50%;
        transform:translateX(-50%);
        width:90.1%;
    }

      @media only screen and (min-width:1500px){
        width:70.1%;
      }
`

export const NavbarLink = styled(Link)<NavbarMenuColProps>`
    color:${(p: NavbarMenuColProps) => p.highlight ? '#eeeeee' : 'grey'};
    &:hover{
        color:${(p: NavbarMenuColProps) => p.highlight ? 'white' : 'black'};
    }
`

export const TitleLink = styled(Link)`
    position:relative;
    width:100%;
    display:flex;
    align-items: center;
    justify-content: center;
`

export const LeftAlignedH1 = styled('h1')`
    position:relative;
    width:100%;
    padding:0;
    margin:0;
    text-align:left;
`

import styled from "@emotion/styled";
import {Button, Col} from "antd";

export const SortRow = styled(Col)`
    display:flex;
`

export const FlexCol = styled(Col)`
    position:relative;
    width:0;
    display:flex;
    flex-wrap:wrap;
    overflow:hidden;
`

export const NewsCol = styled(Col)`
    position:relative;
    display:none;
    @media only screen and (min-width:800px){
        display:initial;
    }
`

export const PrimaryButton = styled(Button)`
    background:#fc5c65;
    color:white;
    &:hover, &:active, &:focus{
        background:#eb3b5a;
        border-color:#eb3b5a;
        color:white;
    }
`

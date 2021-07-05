import styled from "@emotion/styled";
import {Carousel} from "antd";

export const NoMarginTitle = styled('h1')`
  margin:0;
  padding:0;
  font-family: 'sans-serif';
`

export const NoMarginSubTitle = styled('h2')`
  margin:0;
  padding:0;
  font-family: 'sans-serif';
`

export const ImageDisplay = styled(Carousel)`
  position: relative;
`

export const CategoriesContainer = styled('div')`
  position:relative;
  background:blue;
`

interface ICategoryProps {
    background: string;
}

export const Category = styled('section')<ICategoryProps>`
  background: ${props => props.background};
`

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
  width: 50%;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
`

export const CategoriesContainer = styled('div')`
  position: relative;
  display:flex;
  justify-content: center;
`

interface ICategoryProps {
    background: string;
}

export const Category = styled('section')<ICategoryProps>`
  cursor:pointer;
  margin:1em;
  background: ${props => props.background};
  width: 80px;
  aspect-ratio: 1/1;
  display:flex;
  justify-content: center;
  align-content: center;
  color:white;
  position: relative;
`
export const FlexContainer = styled('div')`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  color:white;
  text-align: center;
  position: relative;
`

export const CategoryName = styled('h2')`
  color:white;
  font-size: large;
`

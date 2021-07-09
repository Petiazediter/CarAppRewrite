import styled from "@emotion/styled";
import {Carousel} from "antd";

/*
export const NoMarginTitle = styled('h1')`
  margin:0;
  padding:0;
  font-family: 'sans-serif';
`*/

export const NoMarginTitle = styled.h1({
    margin: 0,
    padding: 0,
    fontFamily: 'sans-serif'
})

/*
export const NoMarginSubTitle = styled('h2')`
  margin:0;
  padding:0;
  font-family: 'sans-serif';
` */

export const NoMarginSubTitle = styled.h2({
    margin: 0,
    padding: 0,
    fontFamily: 'sans-serif'
})

/*
export const ImageDisplay = styled(Carousel)`
  position: relative;
  width: 100%;
  display: flex;
  left: 50%;
  transform: translateX(-50%);
  justify-content: center;
  background: black;
`
*/

export const ImageDisplay = styled(Carousel)({
    position: 'relative',
    width: '100%',
    display: 'flex',
    left: '50%',
    transform : 'translateX(-50%)',
    justifyContent: 'center',
    background: 'black'
})

/*
export const CategoriesContainer = styled('div')`
  position: relative;
  display:flex;
  justify-content: center;
`*/

export const CategoriesContainer = styled.div({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
})

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

export const HighlightTitle = styled('h1')`
  width:100%;
  padding:1em;
  box-sizing: border-box;
  background: #fc5c65;
  color:white;
  font-style: italic;
`

export const TableList = styled('ul')`
  list-style: none;
  font-weight: bolder;
  padding:0;
  margin:0;
  font-family: sans-serif;
  li {
    padding: 1em;
    background: #C8CDD9;
  }
  li:nth-child(even){
    background: #D7DCE7;
  }
`

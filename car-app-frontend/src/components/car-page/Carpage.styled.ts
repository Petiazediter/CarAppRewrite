import styled from "@emotion/styled";
import {Carousel} from "antd";

export const NoMarginTitle = styled.h1({
    margin: 0,
    padding: 0,
    fontFamily: 'sans-serif'
})

export const NoMarginSubTitle = styled.h2({
    margin: 0,
    padding: 0,
    fontFamily: 'sans-serif'
})

export const ImageDisplay = styled(Carousel)({
    position: 'relative',
    width: '100%',
    display: 'flex',
    left: '50%',
    transform : 'translateX(-50%)',
    justifyContent: 'center',
    background: 'black'
})

export const CategoriesContainer = styled.div({
    position: 'relative',
    display: 'flex',
    justifyContent: 'center'
})

interface ICategoryProps {
    background: string;
}

export const Category = styled.section<ICategoryProps>(
    {
        cursor: "pointer",
        margin: "1em",
        width: "80px",
        aspectRatio: "1/1",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
        color: "white",
        position: "relative"
    },
    props => ({
        background: `${props.background}`
    })
)

export const FlexContainer = styled.div({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
    color: "white",
    textAlign: "center",
    position: "relative"
})

export const CategoryName = styled.h2({
    color: "white",
    fontSize: "large"
})


export const HighlightTitle = styled.h1({
    width: '100%',
    padding: '1em',
    boxSizing: 'border-box',
    background: '#fc5c65',
    color: 'white',
    fontStyle: 'italic'
})


export const TableList = styled.ul({
    listStyle: 'none',
    fontWeight: 'bolder',
    padding: 0,
    margin: 0,
    fontFamily: 'sans-serif',
    'li': {
        padding: '1em',
        background: '#c8cdd9'
    },
    'li:nth-of-type(even)': {
        background: '#d7dce7'
    }
})

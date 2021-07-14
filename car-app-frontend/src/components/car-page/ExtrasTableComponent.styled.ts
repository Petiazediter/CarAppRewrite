import styled from "@emotion/styled";

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
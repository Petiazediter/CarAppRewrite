import styled from '@emotion/styled'

/*
export const DataTable = styled('table')`
  width: 100%;
  table-layout: fixed;
  text-align: left;
  
  tr{
    padding:1em;
    box-sizing: border-box;
    border-bottom: 1px solid #F6F7F7;
    td{
      text-align: right;
    }
  }
`
*/

export const DataTable = styled.table({
    width: '100%',
    tableLayout: 'fixed',
    textAlign: 'left',
    ['tr']: {
        padding: '1em',
        boxSizing: 'border-box',
        borderBottom: '1px solid #f6f7f7',
        ['td']:{
            textAlign: 'right'
        }
    }
})

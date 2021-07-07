import styled from "@emotion/styled";

export const CarComponentWrapper = styled('div')`
    position:relative;
    width:100%;
    @media only screen and ( min-width: 800px){
        width:50%;
        padding:1em;
    }
    @media only screen and ( min-width: 1200px){
        width:33%;
    }
`

export const BidSpan = styled('span')`
    position:absolute;
    top:0;
    left:0;
    background:rgba(40,40,40,1);
    color:white;
    padding:.2em 1em .2em 1em;
    border-radius:8px;
    margin:1.5em 0 0 .5em;
`

export const ImageDiv = styled('div')`
    position:relative;
`

export const LabelSpan = styled('span')`
    color:grey;
`

export const Title = styled('h2')`
  color:black;
  padding:0;
  margin:0;

  &:hover{
    color: #fc5c65;
    transform: scale(1.02);
  }
`

export const CarName = styled(Title)``

export const SellerName = styled(Title)`
  color:black;
  padding:0;
  margin:0;
  font-size: medium;
`

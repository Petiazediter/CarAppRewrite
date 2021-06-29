import { Row, Col } from 'antd';
import styled from '@emotion/styled'

const StyledUl = styled('ul')`
  list-style: none;
`

const TitleLi = styled('li')`
  color:grey;
`

export function Footer() { 
    return (      
    <div style={{background: "#EEEEF0", width: '100vw', left:0,bottom:0, margin:0}}>
        <Row>
        <Col flex={1}>
            <h1>CarsBidApp</h1>
        </Col>
        <Col flex={1}>
            <StyledUl>
            <TitleLi>About us</TitleLi>
            <li>Sell a car</li>
            <li>Buy a car</li>
            <li>Place a bid</li>
            </StyledUl>
        </Col>
        <Col flex={1}>
            <StyledUl>
                <TitleLi>Guarantee</TitleLi>
                <li>Terms and agreements</li>
                <li>Report a scam</li>
                <li>Contact us</li>
            </StyledUl>
        </Col>
        <Col flex={1}>
            <StyledUl>
                <TitleLi>Social Media</TitleLi>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
            </StyledUl>
        </Col>
        </Row>
  </div>)
}
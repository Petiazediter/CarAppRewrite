import styled from "@emotion/styled"
import {Tag, Carousel} from "antd"
import { Car } from "../../models/Car";

const CarComponentWrapper = styled('div')`
    width:100%;
    position:relative;
    @media only screen and ( min-width: 800px){
        width:calc(33% - .2em);
    }
`

const BidSpan = styled('span')`
    position:absolute;
    top:0;
    left:0;
    background:rgba(40,40,40,1);
    color:white;
    padding:.2em 1em .2em 1em;
    border-radius:8px;
    margin:1.5em 0 0 .5em;
`

const ImageDiv = styled('div')`
    position:relative;
`

const LabelSpan = styled('span')`
    color:grey;
`


export function CarDisplay( {car} : {car: Car}) {
    return (
    <CarComponentWrapper>
        <ImageDiv>
            <Carousel autoplay>
                {car.imgLinks.map((item) => <img src={item} alt="Image of the car"/>)}
            </Carousel>
            <BidSpan><LabelSpan>Bid:</LabelSpan> ${car.bid} | <LabelSpan>Time:</LabelSpan> </BidSpan>
        </ImageDiv>
        <h2>{car.name}</h2>
        {
        car.tags.map((item) => 
                <Tag>{item}</Tag>
            )
        }
        <p>{car.city},{car.country}</p>
    </CarComponentWrapper>)
}
import styled from "@emotion/styled"
import {Tag, Carousel, Statistic} from "antd"
import { Car } from "../../models/Car";

const { Countdown } = Statistic; 

const CarComponentWrapper = styled('div')`
    width:100%;
    position:relative;
    @media only screen and ( min-width: 800px){
        width:33%;
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
                <img
                src="https://media.carsandbids.com/cdn-cgi/image/width=712,height=468,quality=70/7a0a3c6148108c9c64425dd85e0181fa3cccb652/photos/3R06APaX.hGgqDLbGi-(edit).jpg?t=162370774158"
                alt="Primary image of the car"/>
                        <img
                src="https://media.carsandbids.com/cdn-cgi/image/width=712,height=468,quality=70/7a0a3c6148108c9c64425dd85e0181fa3cccb652/photos/3R06APaX.hGgqDLbGi-(edit).jpg?t=162370774158"
                alt="Primary image of the car"/>
                            <img
                src="https://media.carsandbids.com/cdn-cgi/image/width=712,height=468,quality=70/7a0a3c6148108c9c64425dd85e0181fa3cccb652/photos/3R06APaX.hGgqDLbGi-(edit).jpg?t=162370774158"
                alt="Primary image of the car"/>
                            <img
                src="https://media.carsandbids.com/cdn-cgi/image/width=712,height=468,quality=70/7a0a3c6148108c9c64425dd85e0181fa3cccb652/photos/3R06APaX.hGgqDLbGi-(edit).jpg?t=162370774158"
                alt="Primary image of the car"/>
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
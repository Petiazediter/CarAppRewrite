import styled from "@emotion/styled"
import {Tag, Carousel} from "antd"

const CarComponentWrapper = styled('div')`

`

export function CarDisplay( {carName, tags, highestBid} : {carName: string, tags: string[], highestBid: number}) {
    return (
    <CarComponentWrapper>
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
        <h2>{carName}</h2>
        {
        tags.map((item) => 
                <Tag>{item}</Tag>
            )
        }
        <span>${highestBid}</span>
    </CarComponentWrapper>)
}
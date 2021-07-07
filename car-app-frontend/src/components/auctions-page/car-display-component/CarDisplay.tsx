import {Carousel} from "antd"
import {Link} from "react-router-dom";
import {Car} from "../../../models/Car";
import {CarComponentWrapper, ImageDiv, BidSpan, LabelSpan, CarName, SellerName} from "./CarDisplay.styled";
import moment from 'moment'
import {convertToMoment} from "../../../context/DatabaseContext";
import {FunctionComponent} from "react";
import {TimerText} from "../TimerText";

setInterval(() => {
    const timerElements: NodeListOf<Element> = document.querySelectorAll('.timer');
    timerElements.forEach((element: Element) => {
        const currentText = element.innerHTML;
        // [days,hours,minutes]
        const dateArray = currentText.split(':');

        // Start the loop from seconds to days.
        for ( let index = dateArray.length -1; index >= 0; index--  ){
            // In this example the index is the last element so we check the seconds at this time.
            // Get the seconds by the index and decrease it by one.
            let newValue = Number(dateArray[index]) - 1;
            if ( newValue > 0){
                dateArray[index] = newValue.toString();
                // If the second is greater than 0 that means we want to decrease only the second
                // And not mocking the minutes , hours or days. So we break the loop.
                break;
                // We will not continue the loop to the minutes, so we will not decreasing it.
            } else {
                // If the second is reached the zero, that means we want to decrease the minutes too.
                // So we'll not break the loop, and that means the next loop the minutes will decrease by one
                // We only had to set the seconds back to 59
                if ( index >= (dateArray.length - 2)){
                    // If we checking the seconds or minutes at the moment:
                    dateArray[index] = '59'
                    // Set the seconds ( or minutes ) back to 59
                } else if ( index === 1) {
                    // If we checking the hours and it's reached zero set it back to 23
                    dateArray[index] = '23'
                }
                // We don't need to check the days.
            }
        }

        /*if ( Number(dateArray[0]) > 0){
            element.innerHTML = `${dateArray[0]} days`
        } else if ( Number(dateArray[1]) > 0) {
            element.innerHTML = `${dateArray[1]} hours`
        }else{ */
            element.innerHTML = dateArray.join(':')
        //}
        console.log(dateArray.join(':'));
    })
}, 1000)


export const CarDisplay: FunctionComponent<{ car: Car }> = (props) => {
    const getTimeLeft = (endDate: string): string => {
        const now = moment();
        const carDate = convertToMoment(endDate.replace('/', '-'));
        const differenceBetweenDatesInSeconds = carDate.diff(now, 'seconds');
        const daysLeft = Math.floor(differenceBetweenDatesInSeconds / 86400); // 26686 / 86400 = 0
        const hoursLeft = Math.floor((differenceBetweenDatesInSeconds % 86400) / 3600); // 26686 / 3600 = 7
        const minutesLeft = Math.floor(((differenceBetweenDatesInSeconds % 86400) % 3600) / 60); // 26686 % 3600 = 24
        const secondsLeft = Math.floor((((differenceBetweenDatesInSeconds % 86400) % 3600) % 60));
        return `${daysLeft}:${hoursLeft}:${minutesLeft}:${secondsLeft}`;
    }

    return (
        <CarComponentWrapper>
            <Link to={`/car/${props.car.id}`}>
                <ImageDiv>
                    <Carousel autoplay>
                        {props.car.exteriorImages.map((item, index) =>
                            <img key={index} style={{borderRadius: "10px", overflow: "hidden"}} src={item}
                                 alt="The car"/>)}
                    </Carousel>
                    <BidSpan>
                        <LabelSpan>Bid: </LabelSpan>
                        ${props.car.bids[props.car.bids.length - 1].bid}
                        <LabelSpan> | Time: </LabelSpan>
                         <TimerText fromDate={props.car.endDate}/>
                    </BidSpan>
                </ImageDiv>
                <CarName>{props.car.title}</CarName>
            </Link>
            <Link to={`/user/${props.car.seller.id}`}>
                <SellerName>{props.car.seller.username}</SellerName>
            </Link>
            <p>{props.car.city},{props.car.country}</p>

        </CarComponentWrapper>
    )
}

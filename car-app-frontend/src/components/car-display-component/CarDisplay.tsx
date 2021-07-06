import {Carousel} from "antd"
import {Link} from "react-router-dom";
import {Car} from "../../models/Car";
import {CarComponentWrapper, ImageDiv, BidSpan, LabelSpan, CarName, SellerName} from "./CarDisplay.styled";
import moment from 'moment'
import {convertToMoment} from "../../context/DatabaseContext";
import {FunctionComponent} from "react";

setInterval(() => {
    const timerElements: NodeListOf<Element> = document.querySelectorAll('.timer');
    timerElements.forEach((element: Element) => {
        const currentText = element.innerHTML;
        // [days,hours,minutes]
        const dateArray = currentText.split(':');
        for (let i = dateArray.length - 1; i >= 0; i--) {
            const newValue: number = (Number(dateArray[i]) - 1);
            dateArray[i] = newValue.toString();
            if (newValue !== 0) {
                break;
            } else {
                if (i === 0) {
                    break;
                }
                if (i === 1) {
                    dateArray[i] = '23'
                } else {
                    dateArray[i] = '59'
                }
            }
        }
        element.innerHTML = dateArray.join(':')
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
                        <span className="timer">{getTimeLeft(props.car.endDate)}</span>
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

import {Carousel} from "antd"
import {Link} from "react-router-dom";
import {Car} from "../../../models/Car";
import {BidSpan, CarComponentWrapper, CarName, ImageDiv, LabelSpan, SellerName} from "./CarDisplay.styled";
import {FunctionComponent} from "react";
import {TimerDisplayFormat, TimerText} from "../TimerText";


export const CarDisplay: FunctionComponent<{ car: Car }> = (props) => {

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
                         <TimerText fromDate={props.car.endDate} formatType={TimerDisplayFormat.SHORT_NAME}/>
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

import { Carousel} from "antd"
import { Link } from "react-router-dom";
import { Car } from "../../models/Car";
import { CarComponentWrapper, ImageDiv, BidSpan, LabelSpan} from "./CarDisplay.styled";

export function CarDisplay( {car} : {car: Car}) {
    return (
        <CarComponentWrapper>
            <Link to={`/car/${car.id}`}>
                <ImageDiv>
                    <Carousel autoplay>
                        {car.exteriorImages.map((item,index) => <img key={index} style={{borderRadius: "10px", overflow: "hidden"}} src={item} alt="The car"/>)}
                    </Carousel>
                    <BidSpan><LabelSpan>Bid:</LabelSpan> ${car.minBid} | <LabelSpan>Time:</LabelSpan> </BidSpan>
                </ImageDiv>
                <h2>{car.title}</h2>
                <p>{car.city},{car.country}</p>
            </Link>
        </CarComponentWrapper>
    )
}

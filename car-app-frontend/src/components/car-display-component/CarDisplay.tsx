import { Carousel} from "antd"
import { Link } from "react-router-dom";
import { Car } from "../../models/Car";
import { CarComponentWrapper, ImageDiv, BidSpan, LabelSpan, CarName,SellerName } from "./CarDisplay.styled";


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
                </Link>
                <Link to={`/car/${car.id}`}>
                    <CarName>{car.title}</CarName>
                </Link>
                <Link to={`/user/${car.seller.id}`}>
                    <SellerName>{car.seller.username}</SellerName>
                </Link>
                <p>{car.city},{car.country}</p>

        </CarComponentWrapper>
    )
}

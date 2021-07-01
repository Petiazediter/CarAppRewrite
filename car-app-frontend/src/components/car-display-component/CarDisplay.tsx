import { Carousel, Image} from "antd"
import { Link } from "react-router-dom";
import { Car } from "../../models/Car";
import { CarComponentWrapper, ImageDiv, BidSpan, LabelSpan, CarName,SellerName } from "./CarDisplay.styled";


setInterval(() => {
    const timerElements : NodeListOf<Element> =
        document.querySelectorAll('.timer');
    timerElements.forEach((element: Element) => {
        element.innerHTML = `${Number(element.innerHTML) - 1}`
    })
}, 1000)


export function CarDisplay( {car} : {car: Car}) {
    return (
        <CarComponentWrapper>
                <ImageDiv>
                    <Carousel autoplay>
                        {car.exteriorImages.map((item,index) =>
                            <Image key={index} style={{borderRadius: "10px", overflow: "hidden"}} src={item} alt="The car"/>)}
                    </Carousel>
                    <BidSpan>
                        <LabelSpan>Bid: </LabelSpan>
                        ${car.bids[car.bids.length-1].bid}
                        <LabelSpan> | Time: </LabelSpan>
                        <span className="timer">10000</span>
                    </BidSpan>
                </ImageDiv>
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

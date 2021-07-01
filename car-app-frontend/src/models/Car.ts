import {Bid} from "./Bid";
import {User} from "./User";

export interface Car{
    id: number,
    title: string,
    brand: string,
    model: string,
    seller: User,
    minBid: number,
    country: string,
    city: string,
    vin: string,
    km: number,
    body: number,
    engine: string,
    drivetrain: number,
    transmission: number,
    exterior: string,
    interior: string,
    highlightsTitle: string,
    highLightsItems: string[],
    equipmentTitle: string,
    equipmentItems: string[],
    flaws: string[],
    serviceHistory: string,
    extraItems: string[],
    ownerShipHistory: string,
    videos: string[],
    exteriorImages: string[],
    interiorImages: string[],
    paperImages: string[],
    bids: Bid[]
}

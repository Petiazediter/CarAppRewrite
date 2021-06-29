import { useState } from "react";
import { Bid } from "../models/Bid";
import { Car } from "../models/Car";
import { User } from "../models/User";

interface DatabaseInterface
{
    cars : Car[],
    bids : Bid[],
    users: User[]
}

const getDatabase = (): DatabaseInterface => {
    return {
        // User table placeholder
        users: [
            {
                id: 0,
                username: "bmwsellerguy",
                emailAddress: "bmwsellerguy@gmail.com",
                password: "",
                type: 0
            },
            {
                id: 1,
                username: "bmwbuyerguy",
                emailAddress: "bmwbuyerguy@gmail.com",
                password: "",
                type: 0
            },
            {
                id: 2,
                username: "evenmorebmwbuyerguy",
                emailAddress: "evenmorebmwbuyerguy@gmail.com",
                password: "",
                type: 0
            },
        ],
        // Bids table placeholder
        bids: [
            {
                buyerId: 1,
                carId: 0,
                bid: 1000
            },
            {
                buyerId: 2,
                carId: 0,
                bid: 1500
            },
            {
                buyerId: 1,
                carId: 0,
                bid: 2000
            }
        ],
        // Cars table placeholder
        cars: [
            {
                id: 0,
                title: "2005 BMW Alpina B5",
                brand: "BMW",
                model: "Alpina B5",
                sellerId: 0,
                minBid: 0,
                country: "Hungary",
                city: "Budapest",
                vin: "WAPB544005RH10096",
                km: 148000,
                body: 1,
                engine: "4.4L Supercharged V8",
                drivetrain: 1,
                transmission: 2,
                exterior: "Onyx Blue",
                interior: "Smoke White",
                highlightsTitle: "THIS... is a 2005 BMW Alpina B5, finished in Onyx Blue with a Smoke White interior.",
                highLightsItems: [
                    "This B5 is a European-spec sedan sold new in Germany and titled in Florida. Imported from Russia in 2012 by Maryland-based J.K. Technologies, it's fitted with a metric instrument cluster, though its odometer displays miles.",
                    "The attached Carfax history report starts in 2012 and lists no accidents since.",
                    "This B5 is equipped with 19-inch wheels, leather upholstery, heated and power-adjustable front seats, heated rear seats, a CD player, a navigation system, and a head-up display, according to a build sheet shown in the gallery. The seller reports no modifications.",
                    "Service records and logs detail some of the repairs and maintenance performed on this B5, though some are written in German or in Russian. The seller states the engine oil and filter, the brake fluid, the front thrust arms, and the cabin air filter were changed in March 2021.",
                    "Alpina waded into the horsepower war brewing on the Autobahn when it released the original B5 in 2005. Based on the E60-generation 5 Series, it outgunned the Audi RS6 and the Mercedes-Benz E55 AMG thanks to a V8 fed by a supercharger. Alpina later explained the E60's engine bay was too small for a V8 and two turbos. The B5 was never officially sold in America, but its engine made it across the pond under the hood of the E65-based B7.",
                    "Alpina made 428 units of the B5 sedan from February 2005 to September 2007, according to its archives department, and a numbered plaque identifies this car as number 96.",
                    "Power comes from a supercharged 4.4-liter V8, rated at 493 horsepower and 516 lb-ft of torque. Related to BMW's N62 engine but developed and built by Alpina, it spins the rear wheels via a 6-speed automatic transmission linked to shift buttons on the steering wheel."
                ],
                equipmentTitle: "A build sheet is shown in the gallery, and a partial list of notable equipment includes:",
                equipmentItems: [
                    "19-inch alloy wheels",
                    "Alpina-specific body kit",
                    "Adaptive xenon headlights",
                    "White turn signal lenses",
                    "Sunroof",
                    "Leather upholstery",
                    "Heated and power-adjustable front sport seats",
                    "Memory function for the driver",
                    "Heated rear seats",
                    "Rear sunshades",
                    "Alcantara headliner",
                    "CD player",
                    "Logic7 sound system",
                    "Navigation system",
                    "Head-up display",
                    "Front and rear parking sensors"
                ],
                flaws: [
                    "Chips on the front bumper",
                    "Dent in the rear bumper (shown in the gallery)",
                    "Tear in the rear passenger-side tire's sidewall",
                    "Some wear on the driver's seat's outer bolster",
                    "Crease in the driver's seat cushion",
                    "Plastic door sills cracked"
                ],
                serviceHistory: "Service records and stamps in the factory maintenance booklet detail some of the repairs and maintenance performed on this B5 since it was new. The seller notes some of the records are written in German or in Russian. He adds that the engine oil, the engine oil filter, the brake fluid, the front thrust arms, and the cabin air filter were replaced in March 2021.",
                extraItems: [
                    "2 keys",
                    "2 wheel keys",
                    "Owner's manuals",
                    "Available service records",
                    "Import-related documentation"
                ],
                ownerShipHistory: "The seller purchased this B5 in 2019. He adds that it's titled in his father's name.",
                videos: [
                    "https://youtu.be/BXNcyR26Zd4",
                    "https://youtu.be/inbXloKrMXk"
                ],
                exteriorImages: [
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/KPDGxNGo.Zd9uVd6ab-(edit).jpg?t=162340098145",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/KPDGxNGo.Ub2Fs34WT-(edit).jpg?t=162340104862",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/7a0a3c6148108c9c64425dd85e0181fa3cccb652/photos/KPDGxNGo.kq71zO4Vx-(edit).jpg?t=162371324135",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/KPDGxNGo.iBfqyTS_C-(edit).jpg?t=162340120892",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/s-SIzdol1jV.jpg?t=162109213702",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/s-Z1jiL7uCH-.jpg?t=162109213702"
                ],
                interiorImages: [
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/s-P3QZ_G-_zec.jpg?t=162109213702",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-aG0WFABDNls.JPG?t=162259844503",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/s-6WjeF0KIHoW.jpg?t=162109213702",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-8dG5uuJaLZ8.jpeg?t=162343048807",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/s-FZN6tiKeej.jpg?t=162109213702",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-GkU7t5N_5Xb.JPG?t=162259847372"
                ],
                paperImages: [
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-sfTkxNrfJp4.JPG?t=162259849594",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-94ylphW5M79.JPG?t=162259849594",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-IAiRzuMpFmH.JPG?t=162259850152",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-POas5O6JPjC.JPG?t=162259841015",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-WVSlJigVW88.JPG?t=162259841745",
                    "https://media.carsandbids.com/cdn-cgi/image/width=1607.2727272727273,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/alpina-page-001.nbYnZ-fjY.jpg?t=162368684201",
                    "https://media.carsandbids.com/cdn-cgi/image/width=1607.2727272727273,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/alpina-page-002.psGKK8nfkK.jpg?t=162368684259",
                    "https://media.carsandbids.com/cdn-cgi/image/width=1607.2727272727273,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/alpina-page-003.KxGuNOvav2.jpg?t=162368684202",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-Vl2gDnoKP9.JPG?t=162259838657",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-Ufto0EMlI6.JPG?t=162259838864",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-yNurjYmHqmN.JPG?t=162259845928",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-RDiT679ss5v.JPG?t=162259840087",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/alpina-redact-1.KZxyQVLGI.jpg?t=162340189787",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/alpina-redact-2.8GuguXBexl.jpg?t=162340189694",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c51905b0000b639a185eeb080dd879bf007f5604/photos/alpina-redact-3.bZvNvpGLR9.jpg?t=162340189697",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-KqBsuTl620p.JPG?t=162259839292",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-N62aJeaC1wW.JPG?t=162259839376",
                    "https://media.carsandbids.com/cdn-cgi/image/width=2080,quality=80/c4611fbfec320634914d3912d22f298d5b699853/photos/KPDGxNGo-bd1vU412EMr.JPG?t=162259846103"
                ]
            }
        ]
    }
}

export default function useDatabase(){
    const [connection] = useState(getDatabase());
    return connection;
}
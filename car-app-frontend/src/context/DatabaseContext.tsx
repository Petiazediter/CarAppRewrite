import React, { ReactElement } from "react";
import { Car } from "../models/Car";
import data from '../placeholder_database.json';

const getCarsTable = (transmission: number = 0,
                      bodyParts: number = 0): Car[] => {
    const returnArray: Car[] = [];
    data.cars.forEach((car: Car) => {
        if ( car.transmission === transmission || transmission === 0){
            if ( car.body === bodyParts || bodyParts === 0){
                returnArray.push(car);
            }
        }
    });
    return returnArray;
}

export function useGetCars(){
    return getCarsTable
}

export const GetUsersTableContext = React.createContext(getCarsTable);

export function DatabaseProvider({children} : {children: ReactElement}) {
    return (
        <GetUsersTableContext.Provider value={getCarsTable} >
            {children}
        </GetUsersTableContext.Provider>
    )
}

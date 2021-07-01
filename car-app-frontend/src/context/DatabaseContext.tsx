import React, {ReactElement, useContext} from "react";
import { Car } from "../models/Car";
import data from '../placeholder_database.json';
import moment from 'moment'

export interface CarFilters {
    bodyStyle: number;
    transmission: number;
    country: string;
    maxPrice: number;
    minPrice: number;
    endDate: string;
}

const getCarsTable = (filters: CarFilters): Car[] => {
    const returnArray: Car[] = [];
    data.data.forEach(car => {
        if ( filters.bodyStyle === 0 || filters.bodyStyle === car.body){
            if ( filters.transmission === 0 || filters.transmission === car.transmission){
                if ( filters.country === 'all' || filters.country === '' || filters.country === car.country){
                    const date = filters.endDate;
                    if ( date === '' || isValidDate(date,car.endDate)){
                        returnArray.push(car);
                    }
                }
            }
        }
    })
    return returnArray;
}

function fixURLDate(value: string): string{
    // Fix the date because january is the 0th month in the URL.
    let array: string[] = value.split('-');
    array[1] = (Number(array[1]) + 1).toString();
    return array.join('-')
}

function isValidDate(urlDate: string, carDate: string):boolean {
    urlDate = fixURLDate(urlDate);
    const moment1 = convertToMoment(urlDate);
    const moment2 = convertToMoment(carDate);
    // IF the date from the URL is before the expire date then return true
    return moment.min([moment1,moment2]) === moment1;
}

function convertToMoment(dateInString: string): moment.Moment{
    // Split the date by the separator
    // Then format the string to Moment type.
    const array = dateInString.split('-');
    const formattedDate: moment.MomentInput = {
        year: Number(array[2]),
        month: Number(array[1] ) -1,
        day: Number(array[0])
    }
    return moment(formattedDate);
}

export function useGetCars(){
    return useContext(GetUsersTableContext);
}

export const GetUsersTableContext = React.createContext(getCarsTable);

export function DatabaseProvider({children} : {children: ReactElement}) {
    return (
        <GetUsersTableContext.Provider value={getCarsTable} >
            {children}
        </GetUsersTableContext.Provider>
    )
}

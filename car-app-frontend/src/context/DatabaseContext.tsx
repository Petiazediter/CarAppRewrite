import React, { ReactElement, useContext} from "react";
import { Car } from "../models/Car";
import data from '../placeholder_database.json';

const getCarsTable = (): Car[] => {
    return data.cars;
}

export function useGetCars(){
    return useContext(GetUsersTableContext)
}

export const GetUsersTableContext = React.createContext(getCarsTable);

export function DatabaseProvider({children} : {children: ReactElement}) {
    return (
        <GetUsersTableContext.Provider value={getCarsTable} >
            {children}
        </GetUsersTableContext.Provider>
    )
}

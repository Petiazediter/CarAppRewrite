import React, { ReactElement, useContext} from "react";
import { Car } from "../models/Car";
import data from '../placeholder_database.json';

const getUsersTable = (): Car[] => {
    return data.cars;
}

export function useGetCars(){
    return useContext(GetUsersTableContext)
};

export const GetUsersTableContext = React.createContext(getUsersTable);

export function DatabaseProvider({children} : {children: ReactElement}) {
    return (
        <GetUsersTableContext.Provider value={getUsersTable} >
            {children}
        </GetUsersTableContext.Provider>
    )
}
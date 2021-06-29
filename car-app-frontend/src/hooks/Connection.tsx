import { useState } from "react";
import { Bid } from "../models/Bid";
import { Car } from "../models/Car";
import { User } from "../models/User";
import data from '../placeholder_database.json';

interface DatabaseInterface
{
    cars : Car[],
    bids : Bid[],
    users: User[]
}

const getDatabase = (): DatabaseInterface => {
    return data;
}

export default function useDatabase(){
    const [connection] = useState(getDatabase());
    return connection;
}
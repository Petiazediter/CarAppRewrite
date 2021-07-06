import {FunctionComponent} from "react";
import {Car} from "../../models/Car";
import { DataTable } from "./CarDataTable.styled";

export const CarDataTable: FunctionComponent<{car: Car}> = (props) => {
    return (
        <DataTable>
            <tr>
                <th>Brand</th>
                <td>{props.car.model} {props.car.brand}</td>
            </tr>
            <tr>
                <th>Engine</th>
                <td>{props.car.engine}</td>
            </tr>
            <tr>
                <th>Kilometers</th>
                <td>{props.car.km} km</td>
            </tr>
            <tr>
                <th>Location</th>
                <td>{props.car.city}, {props.car.country}</td>
            </tr>
            <tr>
                <th>Model</th>
                <td>{props.car.model}</td>
            </tr>
            <tr>
                <th>VIN</th>
                <td>{props.car.vin}</td>
            </tr>
        </DataTable>
    )
}

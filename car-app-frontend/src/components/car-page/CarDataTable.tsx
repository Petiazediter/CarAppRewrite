import { FunctionComponent } from 'react';
import { DataTable } from './CarDataTable.styled';
import { CarResult } from './HigherOrderComponents';

export const CarDataTable: FunctionComponent<{ car: CarResult }> = (props) => {
	return (
		<DataTable>
			<tbody>
				<tr>
					<th>Brand</th>
					<td>{props.car.brand}</td>
				</tr>
				<tr>
					<th>Engine</th>
					<td>Unknown</td>
				</tr>
				<tr>
					<th>Kilometers</th>
					<td>{props.car.km} km</td>
				</tr>
				<tr>
					<th>Location</th>
					<td>
						{props.car.city}, {props.car.country}
					</td>
				</tr>
				<tr>
					<th>Model</th>
					<td>{props.car.model}</td>
				</tr>
				<tr>
					<th>VIN</th>
					<td>{props.car.vin}</td>
				</tr>
			</tbody>
		</DataTable>
	);
};

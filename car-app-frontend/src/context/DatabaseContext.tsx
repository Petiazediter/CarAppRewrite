import React, { ReactElement, useContext } from 'react';
import { Car } from '../models/Car';
import data from '../placeholder_database.json';
import moment from 'moment';

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
	data.data.forEach((car) => {
		if (filters.bodyStyle === 0 || filters.bodyStyle === car.body) {
			if (
				filters.transmission === 0 ||
				filters.transmission === car.transmission
			) {
				if (
					filters.country === 'all' ||
					filters.country === '' ||
					filters.country === car.country
				) {
					const date = filters.endDate;
					if (date === '' || isValidDate(date, car.endDate)) {
						if (
							(filters.minPrice <= car.bids[car.bids.length - 1].bid &&
								filters.maxPrice >= car.bids[car.bids.length - 1].bid) ||
							filters.maxPrice <= filters.minPrice
						) {
							const now = moment();
							const momentOfCarEndDate = convertToMoment(
								car.endDate.replace('/', '-')
							);
							if (moment.min(momentOfCarEndDate, now) === now) {
								returnArray.push(car);
							}
						}
					}
				}
			}
		}
	});
	return returnArray;
};

const getCarById = (id: number): Car | undefined => {
	return data.data.find((car) => car.id === id);
};

const getCarBySearchTerm = (term: string): Car[] => {
	return data.data.filter((value) =>
		value.title.toLowerCase().includes(term.toLowerCase())
	);
};

function isValidDate(urlDate: string, carDate: string): boolean {
	const moment1 = convertToMoment(urlDate);
	const moment2 = convertToMoment(carDate);
	// IF the date from the URL is before the expire date then return true
	return moment.min([moment2, moment1]) === moment2;
}

export function convertToMoment(dateInString: string): moment.Moment {
	// Split the date by the separator
	// Then format the string to Moment type.
	const array = dateInString.split('-');
	const formattedDate: moment.MomentInput = {
		year: Number(array[2]),
		month: Number(array[1]) - 1,
		day: Number(array[0]),
		hours: Number(array[3]),
		minutes: Number(array[4]),
		seconds: Number(array[5]),
		millisecond: 0,
	};
	return moment(formattedDate);
}

export function useDatabaseContext() {
	return useContext(GetUsersTableContext);
}

export const GetUsersTableContext = React.createContext({
	getCarsTable: getCarsTable,
	getCarById: getCarById,
	getCarBySearchTerm: getCarBySearchTerm,
});

export function DatabaseProvider({ children }: { children: ReactElement }) {
	return (
		<GetUsersTableContext.Provider
			value={{
				getCarsTable: getCarsTable,
				getCarById: getCarById,
				getCarBySearchTerm: getCarBySearchTerm,
			}}
		>
			{children}
		</GetUsersTableContext.Provider>
	);
}

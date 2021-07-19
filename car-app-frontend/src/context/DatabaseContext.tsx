import React, { ReactElement, useContext } from 'react';
import { Car } from '../models/Car';
import data from '../placeholder_database.json';
import moment from 'moment';
import { isValidDate, convertToMoment } from '../utils/Moment';

export interface CarFilters {
	bodyStyle: number;
	transmission: number;
	country: string;
	maxPrice: number;
	minPrice: number;
	endDate: string;
}

export type UserForm = {
	username: string;
	password: string;
	emailAddress: string;
	phone: string | undefined;
};

export type User = {
	id: number;
	username: string;
	password: string;
	emailAddress: string;
	phone: string | undefined;
};

export type SuccessOrError = {
	isSuccess: boolean;
	errorMessage: string;
};

const users: User[] = [
	{
		id: 0,
		username: 'username',
		password: 'password',
		emailAddress: 'pverebes74@gmail.com',
		phone: undefined,
	},
];

const addUser = async (user: UserForm): Promise<boolean> => {
	// If username or email taken return false
	if (
		users.filter(
			(value) =>
				value.username === user.username ||
				value.emailAddress === user.emailAddress
		).length > 0
	) {
		return false;
	}
	// Add user to database
	users.push({
		id: users.length,
		username: user.username,
		password: user.password,
		emailAddress: user.emailAddress,
		phone: user.phone,
	});

	return true;
};

const login = async (user: UserForm): Promise<SuccessOrError> => {
	const filteredList = users.filter((value) => {
		if (value.username === user.username && value.password === user.password) {
			return value;
		}
	});
	return {
		isSuccess: filteredList.length > 0,
		errorMessage: 'Username or password invalid.',
	};
};

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

export function useDatabaseContext() {
	return useContext(GetUsersTableContext);
}

export const GetUsersTableContext = React.createContext({
	getCarsTable: getCarsTable,
	getCarById: getCarById,
	getCarBySearchTerm: getCarBySearchTerm,
	addUser: addUser,
});

export function DatabaseProvider({ children }: { children: ReactElement }) {
	return (
		<GetUsersTableContext.Provider
			value={{
				getCarsTable: getCarsTable,
				getCarById: getCarById,
				getCarBySearchTerm: getCarBySearchTerm,
				addUser: addUser,
			}}
		>
			{children}
		</GetUsersTableContext.Provider>
	);
}

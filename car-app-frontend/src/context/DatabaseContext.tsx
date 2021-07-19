import React, { ReactElement, useContext } from 'react';
import { Car } from '../models/Car';
import data from '../placeholder_database.json';
import moment from 'moment';
import { isValidDate, convertToMoment } from '../utils/Moment';

const PANTRY_ID = '0250e17a-0ba7-4d72-b46b-3d56e74fb9c6';

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
	user: User | null;
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

const addUser = async (user: UserForm): Promise<SuccessOrError> => {
	// If username or email taken return false
	const usertTable: User[] = await getUsers();
	const dbUser = usertTable.find(
		(value) =>
			value.username === user.username ||
			value.emailAddress === user.emailAddress
	);
	// Add user to database
	const newUser: User = {
		id: users.length,
		username: user.username,
		password: user.password,
		emailAddress: user.emailAddress,
		phone: user.phone,
	};

	addUserToPantry(newUser);
	return {
		isSuccess: dbUser === undefined,
		errorMessage: 'Username or email has been already taken.',
		user: newUser,
	};
};

async function addUserToPantry(user: User) {
	const header = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ [user.id]: user }),
	};
	fetch(
		`https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/users`,
		header
	)
		.then((data) => data.json())
		.then(
			(result) => {
				console.log('RESULT: ');
				console.log(result);
			},
			(error) => console.error(error)
		);
}

async function getUsers(): Promise<User[]> {
	const result = await fetch(
		`https://getpantry.cloud/apiv1/pantry/${PANTRY_ID}/basket/users`
	)
		.then((response) => response.json())
		.then(
			(response) => {
				return response;
			},
			(error) => {
				return error;
			}
		);
	const userTable: User[] = [];
	for (let id in result) {
		if (result.hasOwnProperty(id)) {
			userTable.push(result[id]);
		}
	}
	return userTable;
}

const login = async (user: UserForm): Promise<SuccessOrError> => {
	const users = await getUsers();
	const dbUser = users.find(
		(value) =>
			user.username === value.username && user.password === value.password
	);
	return {
		user: dbUser !== undefined ? dbUser : null,
		isSuccess: dbUser !== undefined,
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

const initialValues = {
	getCarsTable: getCarsTable,
	getCarById: getCarById,
	getCarBySearchTerm: getCarBySearchTerm,
	addUser: addUser,
	login: login,
};

export const GetUsersTableContext = React.createContext(initialValues);

export function DatabaseProvider({ children }: { children: ReactElement }) {
	return (
		<GetUsersTableContext.Provider value={initialValues}>
			{children}
		</GetUsersTableContext.Provider>
	);
}

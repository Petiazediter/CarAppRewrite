import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const getValueFromLocalStorage = (
	key: string,
	initialValue: string
): string => {
	const value = localStorage.getItem(key);
	if (value != null) {
		return JSON.parse(value);
	}
	return initialValue;
};

const useLocalStorage = (
	key: string,
	initialValue: string
): [string, Dispatch<SetStateAction<string>>] => {
	const [value, setValue] = useState<string>(() => {
		return getValueFromLocalStorage(key, initialValue);
	});

	useEffect(() => {
		if (value === '') {
			localStorage.removeItem(key);
			return;
		}
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};

export default useLocalStorage;

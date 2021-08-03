import { Dispatch, SetStateAction, useEffect, useState } from 'react';

function getValueFromLocalStorage(key: string, initialValue: string): string {
	const value = localStorage.getItem(key);
	if (value != null) {
		return JSON.parse(value);
	}
	return initialValue;
}

export default function useLocalStorage(
	key: string,
	initialValue: string
): [string, Dispatch<SetStateAction<string>>] {
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
}

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
	const [value, setValue]: [string, Dispatch<SetStateAction<string>>] =
		useState<string>(() => {
			return getValueFromLocalStorage(key, initialValue);
		});
	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value]);
	return [value, setValue];
}

import { useEffect, useState } from 'react';

function getValueFromLocalStorage(key: string, initialValue: string): string {
	const value = JSON.stringify(localStorage.getItem(key));
	if (value) {
		return value;
	}
	return initialValue;
}

export default function useLocalStorage(key: string, initialValue: string) {
	const [value, setValue] = useState<string>(() => {
		return getValueFromLocalStorage(key, initialValue);
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [value]);

	return [value, setValue];
}

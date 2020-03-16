import React from 'react';

type Storage = {
	key: string;
	initialValue: any;
}

export const useLocalStorage = (key: string, initialValue: any = ''): [any, Function] => {
	const [storedValue, setStoredValue] = React.useState<Storage>(() => {
		try {
			const item = localStorage.getItem(key);

			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	});

	const setStorage = (value: any) => {
		try {
			const valueToStore = value instanceof Function ? value(value) : value;
			setStoredValue(valueToStore);
			localStorage.setItem(key, JSON.stringify(valueToStore))
		} catch (error) {
			console.log(error)
		}
	};

	return [storedValue, setStorage];
}
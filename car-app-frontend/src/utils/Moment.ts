import moment from 'moment';

export function isValidDate(urlDate: string, carDate: string): boolean {
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

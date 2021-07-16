import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import { convertToMoment } from '../../utils/Moment';

export enum TimerDisplayFormat {
	TRADITIONAL_UNFORMATTED,
	TRADITIONAL_FORMATTED,
	SHORT_NAME,
}

export const TimerText: FunctionComponent<{
	fromDate: string;
	formatType: TimerDisplayFormat;
}> = (props) => {
	const getTimeLeft = (endDate: string): string => {
		const now = moment();
		const carDate = convertToMoment(endDate.replace('/', '-'));
		const differenceBetweenDatesInSeconds = carDate.diff(now, 'seconds');
		const daysLeft = Math.floor(differenceBetweenDatesInSeconds / 86400); // 26686 / 86400 = 0
		const hoursLeft = Math.floor(
			(differenceBetweenDatesInSeconds % 86400) / 3600
		); // 26686 / 3600 = 7
		const minutesLeft = Math.floor(
			((differenceBetweenDatesInSeconds % 86400) % 3600) / 60
		); // 26686 % 3600 = 24
		const secondsLeft = Math.floor(
			((differenceBetweenDatesInSeconds % 86400) % 3600) % 60
		);
		return `${daysLeft}:${hoursLeft}:${minutesLeft}:${secondsLeft}`;
	};

	const [currentDate, setCurrentDate] = useState(getTimeLeft(props.fromDate));

	const decreaseTimer = useCallback((): void => {
		setTimeout(() => {
			const arrayOfDateElements: string[] = currentDate.split(':');
			// Start the loop from seconds to days.
			for (let index = arrayOfDateElements.length - 1; index >= 0; index--) {
				// In this example the index is the last element so we check the seconds at this time.
				// Get the seconds by the index and decrease it by one.
				let newValue = Number(arrayOfDateElements[index]) - 1;
				if (newValue > 0) {
					arrayOfDateElements[index] = newValue.toString();
					// If the second is greater than 0 that means we want to decrease only the second
					// And not mocking the minutes , hours or days. So we break the loop.
					break;
					// We will not continue the loop to the minutes, so we will not decreasing it.
				} else {
					// If the second is reached the zero, that means we want to decrease the minutes too.
					// So we'll not break the loop, and that means the next loop the minutes will decrease by one
					// We only had to set the seconds back to 59
					if (index >= arrayOfDateElements.length - 2) {
						// If we checking the seconds or minutes at the moment:
						arrayOfDateElements[index] = '59';
						// Set the seconds ( or minutes ) back to 59
					} else if (index === 1) {
						// If we checking the hours and it's reached zero set it back to 23
						arrayOfDateElements[index] = '23';
					}
					// We don't need to check the days.
				}
			}
			setCurrentDate(arrayOfDateElements.join(':'));
		}, 1000);
	}, [currentDate]);

	const getCurrentDate = (): string => {
		let formattedText = '';
		const dateArray = currentDate.split(':');
		switch (props.formatType) {
			case TimerDisplayFormat.SHORT_NAME:
				if (Number(dateArray[0]) > 0) {
					// If at least a day remaining display just the days
					formattedText = `${dateArray[0]} days`;
				} else if (Number(dateArray[1]) > 0) {
					// If at least a hour remaining display just the hour.
					formattedText = `${dateArray[1]} hours`;
				} else {
					// Else display the minutes and seconds
					formattedText = `${dateArray[2]}:${dateArray[3]}`;
				}
				break;
			case TimerDisplayFormat.TRADITIONAL_FORMATTED:
				formattedText = currentDate;
				break;
			case TimerDisplayFormat.TRADITIONAL_UNFORMATTED:
				formattedText = currentDate;
				break;
		}
		return formattedText;
	};

	useEffect(() => {
		decreaseTimer();
	});

	return <span>{getCurrentDate()}</span>;
};

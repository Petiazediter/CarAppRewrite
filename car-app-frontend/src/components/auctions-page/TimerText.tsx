import {FunctionComponent, useEffect, useState} from "react";

export const TimerText: FunctionComponent<{ fromDate: string }> = (props) => {

    const [currentDate, setCurrentDate] = useState(props.fromDate)

    const decreaseTimer = (): void => {
        setCurrentDate('Hello world');
    const getTimeLeft = (endDate: string): string => {
        const now = moment();
        const carDate = convertToMoment(endDate.replace('/', '-'));
        const differenceBetweenDatesInSeconds = carDate.diff(now, 'seconds');
        const daysLeft = Math.floor(differenceBetweenDatesInSeconds / 86400); // 26686 / 86400 = 0
        const hoursLeft = Math.floor((differenceBetweenDatesInSeconds % 86400) / 3600); // 26686 / 3600 = 7
        const minutesLeft = Math.floor(((differenceBetweenDatesInSeconds % 86400) % 3600) / 60); // 26686 % 3600 = 24
        const secondsLeft = Math.floor((((differenceBetweenDatesInSeconds % 86400) % 3600) % 60));
        return `${daysLeft}:${hoursLeft}:${minutesLeft}:${secondsLeft}`;
    }

    const [currentDate, setCurrentDate] = useState(getTimeLeft(props.fromDate))
    const getCurrentDate = (): string => {
        return currentDate;
    }

    useEffect( () => {
        setInterval(() => {
            decreaseTimer()
        }, 1000)
    }, [])

    return (
    <span>
        {getCurrentDate()}
    </span>)
}

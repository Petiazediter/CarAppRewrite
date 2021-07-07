import {FunctionComponent, useEffect, useState} from "react";

export const TimerText: FunctionComponent<{ fromDate: string }> = (props) => {

    const [currentDate, setCurrentDate] = useState(props.fromDate)

    const decreaseTimer = (): void => {
        setCurrentDate('Hello world');
    }

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

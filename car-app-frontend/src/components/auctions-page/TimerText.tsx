import {FunctionComponent, useEffect, useState} from "react";

export const TimerText: FunctionComponent<{ fromDate: string }> = (props) => {

    const [currentDate, setCurrentDate] = useState(props.fromDate)

    const decreaseTimer = () => {
        setCurrentDate('Hello world');
    }

    useEffect( () => {
        setInterval(() => {
            decreaseTimer()
        }, 1000)
    }, [])

    return (
    <span>
        {currentDate}
    </span>)
}

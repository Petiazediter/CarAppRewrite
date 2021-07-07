import {FunctionComponent} from "react";

export const TimerText: FunctionComponent<{ fromDate: string }> = (props) => {
    return (
    <span>
        {props.fromDate}
        Hello world!
    </span>)
}

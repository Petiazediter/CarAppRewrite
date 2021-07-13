import {useDatabaseContext} from "../../context/DatabaseContext";

export const CarPageHOC = (Component: any) => {
    const getCarHook = useDatabaseContext();
    return (props: any) => {
        return <Component hook={getCarHook} {...props} />
    }
}

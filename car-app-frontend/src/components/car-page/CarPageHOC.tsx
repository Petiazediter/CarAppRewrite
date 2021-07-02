import {useGetCars} from "../../context/DatabaseContext";

export const CarPageHOC = (Component: any) => {
    const getCarHook = useGetCars();
    return (props: any) => {
        return <Component hook={getCarHook} {...props} />
    }
}

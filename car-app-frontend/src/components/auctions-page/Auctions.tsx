import {Row, Col, Slider, DatePicker,Select } from 'antd';
import { FilterFilled } from '@ant-design/icons'
import { CarDisplay } from '../car-display-component/CarDisplay';
import { Car } from '../../models/Car';
import moment from 'moment';
import { useGetCars} from '../../context/DatabaseContext';
import { SortRow, PrimaryButton, NewsCol, FlexCol } from "./Auctions.styled";
import {useEffect, useState} from "react";

const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

enum Filter{
    TRANSMISSION = "transmission",
    BODY_STYLE = "body_type",
    PRICE_RANGE = "price_range",
    TIME_RANGE = "time_range",
    COUNTRY = "country"
}

export function Auctions() {
    const cars = useGetCars();
    const [carsList, setCarsList] = useState(useGetCars());

    // Get parameter from URL by key, with a filter's value.
    const getParamFromUrl = (filter: Filter,defaultValue: number): number => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlParam = urlParams.get(filter.valueOf())
        if ( urlParam != null) return Number(urlParam);
        return defaultValue
    }
    // Assign filter to bodyStyle.
    const applyBodyStyle = (value: number) => {
        // Add filters to URL
        addFilterToURL(Filter.BODY_STYLE, [value]);
    }
    // Assign filter to transmission.
    const applyTransmission = (value: number) => {
        // Add filters to URL
        addFilterToURL(Filter.TRANSMISSION, [value]);
    }
    // Get url key by filter's value.
    const getUrlStrings = (filter: Filter): string[] => {
        let urlStrings: string[] = [];
        switch (filter){
            case Filter.PRICE_RANGE:
                urlStrings.push("price_min");
                urlStrings.push("price_max");
                break;
            default:
                urlStrings.push(filter.valueOf())
                break;
        }
        return urlStrings;
    }
    // Add key and value pair to the URL without refreshing the page
    const addFilterToURL = (filter: Filter, values: number[]): void => {
        const urlStrings: string[] = getUrlStrings(filter);
        const urlParams: string = window.location.search;
        let newUrl = window.location.search;
        let noParam = false;
        if ( urlParams === ""){
            // If there's no param in url yet
            noParam = true;
        }
        for ( let i = 0; i < urlStrings.length; i++){
            const urlString = urlStrings[i];
            const value = values[i];
            if ( noParam ){
                newUrl = `${newUrl}?${urlString}=${value}`
                noParam = false;
            } else {
                const urlParams = new URLSearchParams(window.location.search);
                const urlParam = urlParams.get(urlString)
                if ( urlParam !== null) {
                    // If already there
                    // Delete first
                    newUrl = deleteParamFromUrl(newUrl,urlString);
                    if ( !newUrl.includes('?')){
                        // If that was the only parameter, then set noParam to true again.
                        noParam = true
                    }
                }
                // If the new value is 0 then skip the append
                if ( value !== 0) {
                    if ( noParam) {
                        newUrl = `${newUrl}?${urlString}=${value}`
                        noParam = false;
                    } else {
                        newUrl = `${newUrl}&${urlString}=${value}`
                    }
                }
            }
        }
        // window.location.href = newUrl;
        const new_url = '/' + newUrl;
        window.history.pushState('data', "Hello world!", new_url);
        onFilterChange()
    }
    // Callback function when new there are new URL params.
    const onFilterChange = (): void => {
        let parameters = {
            bodyStyle : 0,
            transmission : 0
        };
        const urlSearchParams = new URLSearchParams(window.location.search);
        Array.from(urlSearchParams.keys()).forEach((key: string) => {
            switch (key){
                case Filter.BODY_STYLE.valueOf():
                    parameters.bodyStyle = Number(urlSearchParams.get(key));
                    break;
                case Filter.TRANSMISSION.valueOf():
                    parameters.transmission = Number(urlSearchParams.get(key));
                    break;
            }
        })
        setCarsList(cars(parameters.transmission,parameters.bodyStyle));
    }

    useEffect(() => {
        onFilterChange();
    },[]);

    // Delete a parameter from url.
    const deleteParamFromUrl = (href: string, key: string): string => {
        let rtn = href.split("?")[0],
            param,
            params_arr = [],
            queryString = (href.indexOf("?") !== -1) ? href.split("?")[1] : "";
        if (queryString !== "") {
            params_arr = queryString.split("&");
            for (let i = params_arr.length - 1; i >= 0; i -= 1) {
                param = params_arr[i].split("=")[0];
                if (param === key) {
                    params_arr.splice(i, 1);
                }
            }
            if (params_arr.length) rtn = rtn + "?" + params_arr.join("&");
        }
        return rtn;
    }

    return (
        <>
            <Row className="full-width" justify='center' style={{width:'100%'}}>
                <SortRow flex={1}>
                        <Col flex={1}>
                            <label>Transmission
                                <Select onSelect={applyTransmission} defaultValue={getParamFromUrl(Filter.TRANSMISSION,0)} className="full-width">
                                    <Option value={0}>All</Option>
                                    <Option value={1}>Manual</Option>
                                    <Option value={2}>Automatic</Option>
                                </Select>
                            </label>
                        </Col>
                        <Col flex={1}>
                            <label>Body style
                                <Select onSelect={applyBodyStyle} defaultValue={getParamFromUrl(Filter.BODY_STYLE,0)} className="full-width">
                                    <Option value={0}>All</Option>
                                    <Option value={1}>Coupe</Option>
                                    <Option value={2}>Convertible</Option>
                                    <Option value={3}>Hatchback</Option>
                                    <Option value={4}>Sedan</Option>
                                    <Option value={5}>SUV/Crossover</Option>
                                    <Option value={6}>Truck</Option>
                                    <Option value={7}>Van/Minivan</Option>
                                    <Option value={8}>Wagon</Option>
                                </Select>
                            </label>
                        </Col>
                </SortRow>
            </Row>
            <Row style={{marginTop:"1em"}}>
                <FlexCol flex={9}>
                    { carsList.length === 0 && <h1>Sadly, none of the cars met the requirements.</h1>}
                    { carsList.map((item: Car) => <CarDisplay key={item.id} car={item} />
                    )}
                </FlexCol>
                <NewsCol flex={1}>
                    <h2>Advanced filters</h2>
                    <label>Ends until<br/>
                        <DatePicker style={{marginBottom:"20px"}} className="full-width" defaultValue={moment('2021/12/31', dateFormat)} format={dateFormat} />
                    </label>
                    <label>Price range<br/>
                        <Slider style={{marginBottom:"20px"}} step={500} range defaultValue={[0,100000]} min={0} max={100000} />
                    </label>
                    <label>Country<br/>
                    <Select style={{marginBottom:"20px"}} defaultValue="all" className="full-width">
                        <Option value="all">All</Option>
                        <Option value="hu">Hungary</Option>
                        <Option value="de">Germany</Option>
                    </Select>
                    </label>
                    <PrimaryButton className="full-width" icon={<FilterFilled />}>Apply filters</PrimaryButton>
                </NewsCol>
            </Row>
        </>
    )
}

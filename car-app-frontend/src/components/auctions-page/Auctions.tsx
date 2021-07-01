import {Row, Col, Slider, DatePicker,Select } from 'antd';
import { ClearOutlined } from '@ant-design/icons'
import { CarDisplay } from '../car-display-component/CarDisplay';
import { Car } from '../../models/Car';
import { useGetCars} from '../../context/DatabaseContext';
import { SortRow, PrimaryButton, NewsCol, FlexCol } from "./Auctions.styled";
import { useEffect, useState} from "react";
import {addParameterToURL} from "../../utils/URLHandler";
import moment from 'moment';

const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

enum Filter{
    TRANSMISSION = "transmission",
    BODY_STYLE = "body_type",
    TIME_RANGE = "ends_until",
    COUNTRY = "country",
    MIN_PRICE = "min_price",
    MAX_PRICE = "max_price"
}

export function Auctions() {
    const cars = useGetCars();
    const [carsList, setCarsList] = useState(cars);

    // Get parameter from URL by key, with a filter's value.
    const getParamFromUrl = (filter: Filter,defaultValue: string): string => {
        const urlParams = new URLSearchParams(window.location.search);
        const urlParam = urlParams.get(filter.valueOf())
        if ( urlParam != null) return urlParam;
        return defaultValue
    }

    const applyFilter = (filter: Filter, value: string):void => {
        addParameterToURL(filter.valueOf(), value, value === "0");
        onFilterChange()
    }

    // Advanced filters
    const applyEndDateFilter = (value: moment.Moment): void => {
        console.log(value);
        const dateAsString = `${value.date()}-${value.month()}-${value.year()}`;
        addParameterToURL(Filter.TIME_RANGE.valueOf(), dateAsString, false);
    }

    const applyPriceRangeFilter = (min: number, max: number): void => {
        addParameterToURL(Filter.MIN_PRICE.valueOf(), min.toString(), false);
        addParameterToURL(Filter.MAX_PRICE.valueOf(), max.toString(), false);
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

    return (
        <>
            <Row className="full-width" justify='center' style={{width:'100%'}}>
                <SortRow flex={1}>
                        <Col flex={1}>
                            <label>Transmission
                                <Select
                                    onSelect={value => applyFilter(Filter.TRANSMISSION,value.toString())}
                                    defaultValue={Number(getParamFromUrl(Filter.TRANSMISSION,'0'))}
                                    className="full-width">
                                    <Option value={0}>All</Option>
                                    <Option value={1}>Manual</Option>
                                    <Option value={2}>Automatic</Option>
                                </Select>
                            </label>
                        </Col>
                        <Col flex={1}>
                            <label>Body style
                                <Select
                                    onSelect={(value) => applyFilter(Filter.BODY_STYLE,value.toString())}
                                    defaultValue={Number(getParamFromUrl(Filter.BODY_STYLE,'0'))}
                                    className="full-width">
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
                        <DatePicker
                            style={{marginBottom:"20px"}}
                            className="full-width"
                            defaultValue={moment('2021/12/31', dateFormat)}
                            format={dateFormat}
                            onSelect={(value) => applyEndDateFilter(value)}
                        />
                    </label>
                    <label>Price range<br/>
                        <Slider
                            style={{marginBottom:"20px"}}
                            step={500}
                            range
                            defaultValue={[0,100000]}
                            min={0}
                            max={100000}
                            onAfterChange={(values => { applyPriceRangeFilter(values[0], values[1]) })}
                        />
                    </label>
                    <label>Country<br/>
                    <Select style={{marginBottom:"20px"}}
                            defaultValue="all"
                            className="full-width"
                            onSelect={value => applyFilter(Filter.COUNTRY, value)}
                    >
                        <Option value="all">All</Option>
                        <Option value="hu">Hungary</Option>
                        <Option value="de">Germany</Option>
                    </Select>
                    </label>
                    <PrimaryButton className="full-width" icon={<ClearOutlined />}>Clear filters</PrimaryButton>
                </NewsCol>
            </Row>
        </>
    )
}

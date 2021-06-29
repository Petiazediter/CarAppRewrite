import {Row, Col, Slider, Button, DatePicker,Select } from 'antd';
import styled from '@emotion/styled';
import { FilterFilled } from '@ant-design/icons'
import { CarDisplay } from '../car-display-component/CarDisplay';
import { Car } from '../../models/Car';
import moment from 'moment';
import { useGetCars } from '../../context/DatabaseContext';

const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

const SortRow = styled(Col)`
    display:flex;
`

const FlexCol = styled(Col)`
    position:relative;
    width:0;
    display:flex;
    flex-wrap:wrap;
    overflow:hidden;
`

const NewsCol = styled(Col)`
    position:relative;
    display:none;
    @media only screen and (min-width:800px){
        display:initial;
    }
`

const PrimaryButton = styled(Button)`
    background:#fc5c65;
    color:white;
    &:hover, &:active, &:focus{
        background:#eb3b5a;
        border-color:#eb3b5a;
        color:white;
    }
`

enum Filter{
    TRANSMISSION = "transmission",
    BODY_STYLE = "body_type",
    PRICE_RANGE = "price_range",
    TIME_RANGE = "time_range",
    COUNTRY = "country"
}

const getParamFromUrl = (filter: Filter,defaultValue: number): number => {
    const urlParams = new URLSearchParams(window.location.search);
    const urlParam = urlParams.get(filter.valueOf())
    if ( urlParam != null) return Number(urlParam);
    return defaultValue
}
export function Auctions() {

    const getCars = useGetCars();

    const yearsMenu = (<Menu>
        <Menu.Item>
            <Slider style={{width:'100%'}} range={{ draggableTrack: true }} min={1980} max={2021} defaultValue={[1980, 2021]} />
        </Menu.Item>
    </Menu>)

    return (
        <div>
        <Row className="full-width" justify='center' style={{width:'100%'}}>
            <SortRow flex={1}>
                    <Col flex={1}>
                        <label>Transmission
                            <Select defaultValue={0} className="full-width">
                                <Option value={0}>All</Option>
                                <Option value={1}>Manual</Option>
                                <Option value={2}>Automatic</Option>
                            </Select>
                        </label>
                    </Col>
                    <Col flex={1}>
                        <label>Body style
                            <Select defaultValue={0} className="full-width">
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
                { getCars().map((item: Car) => <CarDisplay car={item} />
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
        </div>
    )
}

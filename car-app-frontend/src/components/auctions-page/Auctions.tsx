import useWindowDimensions from '../../hooks/WindowSize'
import {Row, Col, Slider, Menu, Dropdown, Button, DatePicker,Select } from 'antd';
import styled from '@emotion/styled';
import { DownOutlined } from '@ant-design/icons'
import { CarDisplay } from '../car-display-component/CarDisplay';
import { Car } from '../../models/Car';
import moment from 'moment';

const { Option } = Select;

const dateFormat = 'YYYY/MM/DD';

const SortRow = styled(Col)`
    display:flex;
    align-items:bottom;
`

const cars: Car[] = [
    {
        id: 0,
        name: "BMW2",
        city: "Budapest",
        country: "Hungary",
        tags: ["Tag1","Tag2","Tag3","Tag4"],
        bid: 12000,
        imgLinks: ["https://media.carsandbids.com/cdn-cgi/image/width=712,height=468,quality=70/7a0a3c6148108c9c64425dd85e0181fa3cccb652/photos/3R06APaX.hGgqDLbGi-(edit).jpg?t=162370774158"]
    },
    {
        id: 1,
        name: "BMW2",
        city: "Budapest",
        country: "Hungary",
        tags: ["Tag1","Tag2","Tag3","Tag4"],
        bid: 12000,
        imgLinks: ["https://media.carsandbids.com/cdn-cgi/image/width=712,height=468,quality=70/7a0a3c6148108c9c64425dd85e0181fa3cccb652/photos/3R06APaX.hGgqDLbGi-(edit).jpg?t=162370774158"]
    },
    {
        id: 2,
        name: "BMW2",
        city: "Budapest",
        country: "Hungary",
        tags: ["Tag1","Tag2","Tag3","Tag4"],
        bid: 12000,
        imgLinks: ["https://media.carsandbids.com/cdn-cgi/image/width=712,height=468,quality=70/7a0a3c6148108c9c64425dd85e0181fa3cccb652/photos/3R06APaX.hGgqDLbGi-(edit).jpg?t=162370774158"]
    },
    {
        id: 3,
        name: "BMW2",
        city: "Budapest",
        country: "Hungary",
        tags: ["Tag1","Tag2","Tag3","Tag4"],
        bid: 12000,
        imgLinks: ["https://media.carsandbids.com/cdn-cgi/image/width=712,height=468,quality=70/7a0a3c6148108c9c64425dd85e0181fa3cccb652/photos/3R06APaX.hGgqDLbGi-(edit).jpg?t=162370774158"]
    },
]

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

export function Auctions() {
    const { width } = useWindowDimensions();

    const transmissionMenu = (
    <Menu>
        <Menu.Item>All</Menu.Item>
        <Menu.Item>Automatic</Menu.Item>
        <Menu.Item>Manual</Menu.Item>
    </Menu>)

    const bodyStyleMenu = (
        <Menu>
            <Menu.Item>All</Menu.Item>
            <Menu.Item>Coupe</Menu.Item>
            <Menu.Item>Convertible</Menu.Item>
            <Menu.Item>Hatchback</Menu.Item>
            <Menu.Item>Sedan</Menu.Item>
            <Menu.Item>SUV/Crossover</Menu.Item>
            <Menu.Item>Truck</Menu.Item>
            <Menu.Item>Van/Minivan</Menu.Item>
            <Menu.Item>Wagon</Menu.Item>
        </Menu>
    )

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
                    <Dropdown className="full-width" overlay={transmissionMenu} placement="bottomLeft" arrow>
                        <Button icon={<DownOutlined />}>Transmission</Button>
                    </Dropdown></Col>
                    <Col flex={1}>
                    <Dropdown className="full-width" overlay={bodyStyleMenu} placement="bottomLeft" arrow>
                        <Button icon={<DownOutlined />}>BodyStyle</Button>
                    </Dropdown></Col>
                    <Col flex={1}>
                    <Dropdown className="full-width" overlay={yearsMenu} placement="bottomLeft" arrow>
                        <Button icon={<DownOutlined />}>Years</Button>
                    </Dropdown></Col>
            </SortRow>
        </Row>
        <Row style={{marginTop:"1em"}}>
            <FlexCol flex={9}>
                { cars.map((item: Car) => <CarDisplay car={item} />
                )}
            </FlexCol>
            <NewsCol flex={1}>
                <h2>Advanced filters</h2>
                <label>Ends until<br></br>
                    <DatePicker style={{marginBottom:"20px"}} className="full-width" defaultValue={moment('2021/12/31', dateFormat)} format={dateFormat} />
                </label>
                <label>Price range<br></br>
                    <Slider style={{marginBottom:"20px"}} step={500} range defaultValue={[0,100000]} min={0} max={100000} />
                </label>
                <label>Country<br></br>
                <Select style={{marginBottom:"20px"}} defaultValue="all" className="full-width">
                    <Option value="all">All</Option>
                    <Option value="hu">Hungary</Option>
                    <Option value="de">Germany</Option>
                </Select>
                </label>
            </NewsCol>
        </Row>
        </div>
    )
}
import useWindowDimensions from '../../hooks/WindowSize'
import {Row, Col, Slider, Menu, Dropdown, Button } from 'antd';
import styled from '@emotion/styled';
import { DownOutlined } from '@ant-design/icons'
import { CarDisplay } from '../car-display-component/CarDisplay';


const SortRow = styled(Col)`
    display:flex;
    align-items:bottom;
    width:100%;
    max-width:100vw;
`

const CarDisplayContainer = styled('div')`
    display:flex;
    flex-basis: 1;
    gap:.5em;
    flex-wrap:wrap;

    @media only screen and (min-width:800px){
        flex-basis: 33.3333%;
        flex-basis: 1;
        gap:.5em;
        flex-wrap:wrap;
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
        <CarDisplayContainer style={ {marginTop: '1em'}}>
            <CarDisplay city="Budapest" country="Hungary" carName="Bmw1" tags={["tag1","tag2","tag3"]} highestBid={12000}/>
            <CarDisplay city="Budapest" country="Hungary" carName="Bmw2" tags={["tag1","tag2","tag3"]} highestBid={12000}/>
            <CarDisplay city="Budapest" country="Hungary" carName="Bmw3" tags={["tag1","tag2","tag3"]} highestBid={12000}/>
        </CarDisplayContainer>
        </div>
    )
}
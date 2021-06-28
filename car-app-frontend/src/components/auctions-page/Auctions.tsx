import useWindowDimensions from '../../hooks/WindowSize'
import {Row, Col, Slider, Menu, Dropdown, Button } from 'antd';
import styled from '@emotion/styled';
import { DownOutlined } from '@ant-design/icons'


const SortRow = styled(Col)`
    display:flex;
    align-items:bottom;
    width:100%;
    max-width:100vw;
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
        <Row className="full-width" justify='center' style={{width:'100%',background:'red'}}>
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
    )
}
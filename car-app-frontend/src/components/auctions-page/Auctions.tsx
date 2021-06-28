import useWindowDimensions from '../../hooks/WindowSize'
import { Row, Col, Slider, Divider, Space, Menu, Dropdown, Button } from 'antd';
import styled from '@emotion/styled';

const SortRow = styled(Col)`
    display:flex;
    align-items:center;
`

const BoldH1 = styled('h1')`
font-weight:700`

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

    return (<Row>
        <SortRow flex={1}>
            <BoldH1>Auctions</BoldH1>
            <Space split={<Divider type="vertical" />}>
                <Slider style={{width:'100px'}} range={{ draggableTrack: true }} min={1980} max={2021} defaultValue={[1980, 2021]} />
                <Dropdown overlay={transmissionMenu} placement="bottomCenter" arrow>
                    <Button>Transmission</Button>
                </Dropdown>
                <Dropdown overlay={bodyStyleMenu} placement="bottomCenter" arrow>
                    <Button>BodyStyle</Button>
                </Dropdown>
            </Space>
        </SortRow>
    </Row>)
}
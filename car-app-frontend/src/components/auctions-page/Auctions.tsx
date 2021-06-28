import useWindowDimensions from '../../hooks/WindowSize'
import { Row, Col, Slider, Menu, Dropdown, Button } from 'antd';
import styled from '@emotion/styled';
import { DownOutlined } from '@ant-design/icons'

const SortRow = styled(Col)`
    display:flex;
    align-items:bottom;
`

const BoldH1 = styled('h1')`
    font-weight:700;
    padding:0;
    margin:0;
    margin-right:20px;
    font-size:1em;
    box-sizing: border-box;
    width:100%;
    text-align:bottom;
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
            <Slider style={{width:'100px'}} range={{ draggableTrack: true }} min={1980} max={2021} defaultValue={[1980, 2021]} />
        </Menu.Item>
    </Menu>)

    return (<Row>
        <SortRow flex={1}>
                <Col flex={1}><BoldH1>Auctions</BoldH1></Col>
                <Col flex={1}>
                <Dropdown overlay={transmissionMenu} placement="bottomCenter" arrow>
                    <Button icon={<DownOutlined />}>Transmission</Button>
                </Dropdown></Col>
                <Col flex={1}>
                <Dropdown overlay={bodyStyleMenu} placement="bottomCenter" arrow>
                    <Button icon={<DownOutlined />}>BodyStyle</Button>
                </Dropdown></Col>
                <Col flex={1}>
                <Dropdown overlay={yearsMenu} placement="bottomCenter" arrow>
                    <Button icon={<DownOutlined />}>Years</Button>
                </Dropdown></Col>
        </SortRow>
    </Row>)
}
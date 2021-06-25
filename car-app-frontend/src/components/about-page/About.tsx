import styled from "@emotion/styled"
import { Layout } from 'antd'

const AboutHeader = styled('h1')({
    width: 'fit-content',
    fontFamily: 'sans-serif',
    borderBottom: '10px solid #676CE1',
    fontSize: 'xx-large',
    color: '#353535'
})

const Content = styled(Layout)({
    padding: '2em',
    boxSizing: 'border-box',
    display: 'inline-block',
    position: 'relative',
    width: '100%'
})

export function About() {
    return (
    <Content>
        <AboutHeader>Let us introduce ourself</AboutHeader>
    </Content>)
}
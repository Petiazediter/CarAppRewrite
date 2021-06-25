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

const DescriptionWithIconStyled = styled('div')({

})

export function About() {
    return (
    <Content>
        <AboutHeader>Let us introduce ourself</AboutHeader>
        <DescriptionWithIcon title="Test" description="Ex adipisicing laborum est velit id do deserunt. Aute officia laboris qui mollit proident. Consectetur do excepteur ex ullamco et dolore dolore sit ullamco do. Qui officia excepteur aliquip reprehenderit officia excepteur. Est ipsum quis voluptate Lorem labore nostrud."/>
    </Content>)
}

function DescriptionWithIcon({title, description} : { title: string, description: string}) {
    return ( 
        <DescriptionWithIconStyled>
            <h1>{title}</h1>
            <p>{description}</p>
        </DescriptionWithIconStyled>
    )
}
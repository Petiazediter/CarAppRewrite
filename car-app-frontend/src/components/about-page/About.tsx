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
        <FixedContent>
            <h1>Fixed</h1>
        </FixedContent>
        <PageContent>
            <AboutHeader>Let us introduce ourself</AboutHeader>
            <TestData/>
        </PageContent>
   </Content>)
}

function TestData(){
    let rows = []
    for (var i = 0; i < 20; i++) {
        rows.push(
            <DescriptionWithIcon title="title" description="Ipsum duis nulla ut aliqua velit Lorem dolore amet eiusmod veniam elit. Duis irure cillum fugiat consectetur dolor sit irure eiusmod magna. Laboris aliqua nostrud voluptate elit pariatur deserunt in reprehenderit velit." />
        )
    } 
    return <div>{rows}</div>
}

function DescriptionWithIcon({title, description} : { title: string, description: string}) {
    return ( 
        <div>
            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}
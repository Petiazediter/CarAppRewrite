import { thisExpression } from "@babel/types"
import styled from "@emotion/styled"
import { Layout } from 'antd'
import { useState } from "react"

const AboutHeader = styled('h1')({
    padding:0,
    margin:0,
    width: 'fit-content',
    fontFamily: 'sans-serif',
    borderBottom: '10px solid #676CE1',
    fontSize: 'xx-large',
    color: '#353535'
})

const Content = styled(Layout)({
    width:'100%',
    display: 'flex',
    justifyContent:'space-around',
    padding: '0 2em 0 2em',
    boxSizing: 'border-box'
})

const FixedContent = styled(Layout)({
    left:0,
    position:"fixed",
    maxWidth: 'none',
    background: '#FCFCFC',
})

const PageContent = styled(Layout)({
    position:'relative',
    alignSelf:'center',
    width:'50%'
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
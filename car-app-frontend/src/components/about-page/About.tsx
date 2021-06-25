import styled from "@emotion/styled"
import { Layout } from 'antd'
import 'antd/dist/antd.css';
import '../../index.css'

const AboutHeader = styled('h1')({
    padding:'0 0 10px 0',
    margin:0,
    width: 'fit-content',
    fontFamily: 'sans-serif',
    borderBottom: '10px solid #676CE1',
    fontSize: 'xx-large',
    color: 'black',
    fontWeight: 'bolder'
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
    display:'block',
    top:'0',
    position:"fixed",
    maxWidth: 'none',
    padding:0,
    margin:0
})

const SideMenuLink = styled('a')({
    textAlign:'left',
    color: 'black',
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    padding:'1em'
})

const PageContent = styled(Layout)({
    position:'relative',
    alignSelf:'center',
    maxWidth:'750px'
})

export function About() {
    
    return (
    <Content>
        <FixedContent className="side-menu">
            <ol>
                <li><SideMenuLink href="#aboutus">About us</SideMenuLink></li>
                <li><SideMenuLink href="#sell">Selling information</SideMenuLink></li>
                <li><SideMenuLink href="#sell">Bidding information</SideMenuLink></li>
                <li><SideMenuLink href="#sell">Buying information</SideMenuLink></li>
            </ol>
        </FixedContent>
        <PageContent>
            <AboutHeader id="aboutus">Let us introduce ourself</AboutHeader>
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
            <h1 className="bold">{title}</h1>
            <p className="bold">{description}</p>
        </div>
    )
}
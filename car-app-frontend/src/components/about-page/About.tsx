import styled from "@emotion/styled"

const AboutHeader = styled('h1')({
    width: 'fit-content',
    fontFamily: 'sans-serif',
    borderBottom: '10px solid #676CE1',
})

export function About() {
    return (
    <div>
        <AboutHeader>Hello world</AboutHeader>
    </div>)
}
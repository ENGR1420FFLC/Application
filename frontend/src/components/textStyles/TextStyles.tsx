import styled from "styled-components";

export const Heading = styled.div`
    font-family: ${p => p.theme.headingFontFamily};
`

export const Header = styled.div`
    font-family: ${p => p.theme.headingFontFamily};
    font-weight: 800;
    text-align: center;
    font-size: 2em;
    margin-right: auto;
`

export const HeaderWrapper = styled.div`
    position: relative;
    font-family: ${p => p.theme.bodyFontFamily};
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 15px;
`
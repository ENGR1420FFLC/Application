import styled from "styled-components";

const HeaderWrapper = styled.div`
    font-family: ${p => p.theme.bodyFontFamily};
    text-transform: uppercase;
    display: grid;
    grid-template-columns: 120px auto 150px 150px;
    grid-gap: 5px;
    padding: 0 10px;
    font-weight: 800;
    color: ${p => p.theme.darkenedNeutralColor};
    font-size: 0.8em;
`

const DayTableHeader = () => <HeaderWrapper>
    <div>Name</div>
    <div>Description</div>
    <div>Origin</div>
    <div>Destination</div>
</HeaderWrapper>

export default DayTableHeader
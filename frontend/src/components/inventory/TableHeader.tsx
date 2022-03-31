import styled from "styled-components";

const HeaderWrapper = styled.div`
    font-family: ${p => p.theme.bodyFontFamily};
    text-transform: uppercase;
    display: grid;
    grid-template-columns: 75px 100px 150px 75px auto 125px 75px 50px;
    grid-gap: 5px;
    padding: 0 10px;
    font-weight: 800;
    color: ${p => p.theme.darkenedNeutralColor};
    font-size: 0.8em;
    margin-bottom: 10px;
`

const TableHeader = () => <HeaderWrapper>
    <div></div>
    <div>LOCATION</div>
    <div>NAME</div>
    <div>QTY.</div>
    <div>DESC</div>
    <div>EXPIRY</div>
    <div>STATUS</div>
</HeaderWrapper>

export default TableHeader
import styled from "styled-components";

const HeaderWrapper = styled.div`
    font-family: ${p => p.theme.bodyFontFamily};
    text-transform: uppercase;
    display: grid;
    grid-template-columns: 150px 250px 150px 150px 200px 50px;
    grid-gap: 5px;
    padding: 0 10px;
    font-weight: 800;
    color: ${p => p.theme.darkenedNeutralColor};
    font-size: 0.8em;
`

const TableHeader = () => <HeaderWrapper>
    <div>Name</div>
    <div>Description</div>
    <div>Origin</div>
    <div>Destination</div>
    <div>Repeat</div>
</HeaderWrapper>

export default TableHeader
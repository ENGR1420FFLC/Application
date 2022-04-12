import styled from "styled-components";
import ConnectionConstructor from "../../services/models/ConnectionConstructor";
import { RRule } from 'rrule'
import Location from "../../services/models/Location";

const Wrapper = styled.div`
    border: 1px solid ${p => p.theme.complementColor};
    padding: 10px;
    font-family: ${p => p.theme.bodyFontFamily};
    display: grid;
    grid-template-columns: 100px auto 150px 150px 250px;
    grid-gap: 5px;
`

const ConnectionRow = ({ connectionConstructor, locations }: { connectionConstructor: ConnectionConstructor, locations: Location[] }) => <Wrapper>
    <div>{connectionConstructor.name}</div>
    <div>{connectionConstructor.description}</div>
    <div>{locations.find(l => l.id === connectionConstructor.fromId)?.name || "Unknown"}</div>
    <div>{locations.find(l => l.id === connectionConstructor.toId)?.name || "Unknown"}</div>
    <div>{RRule.fromText(connectionConstructor.rrule).toText()}</div>
</Wrapper>

export default ConnectionRow
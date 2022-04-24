import styled from "styled-components";
import ConnectionConstructor from "../../services/models/ConnectionConstructor";
import { RRule } from 'rrule'
import Location from "../../services/models/Location";
import Button from "../UI/button/Button";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import LocationPopup from "../map/LocationPopup";

const Wrapper = styled.div`
    border: 1px solid ${p => p.theme.complementColor};
    padding: 10px;
    font-family: ${p => p.theme.bodyFontFamily};
    display: grid;
    align-items: center;
    grid-template-columns: 150px 250px 150px 150px 200px 50px;
    grid-gap: 5px;

    & > div {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
`

const Clickable = styled.div`
    color: ${p => p.theme.accentColor};
    cursor: pointer;
    text-decoration: underline;
`

// TODO: Implement deleting
const ConnectionRow = ({ connectionConstructor, locations, connectionConstructors, setLocations }: { connectionConstructor: ConnectionConstructor, locations: Location[], connectionConstructors: ConnectionConstructor[], setLocations: React.Dispatch<Location[]> }) => {

    const from = locations.find(l => l.id === connectionConstructor.fromId)
    const to = locations.find(l => l.id === connectionConstructor.toId)

    const [showToPopup, setShowToPopup] = useState(false)
    const [showFromPopup, setShowFromPopup] = useState(false)
    return <>
        <Wrapper>
            <div>{connectionConstructor.name}</div>
            <div>{connectionConstructor.description}</div>
            {from ? <Clickable onClick={() => setShowFromPopup(true)}>{from.name}</Clickable> : <div>Unknown</div>}
            {to ? <Clickable onClick={() => setShowToPopup(true)}>{to.name}</Clickable> : <div>Unknown</div>}
            <div>{RRule.fromText(connectionConstructor.rrule).toText()}</div>
            <Button content={<FaTrash />} onClick={() => null}/>
        </Wrapper>
        {from && <LocationPopup location={from} show={showFromPopup} setShow={setShowFromPopup} connectionConstructors={connectionConstructors} locations={locations} setLocations={setLocations}/>}
        {to && <LocationPopup location={to} show={showToPopup} setShow={setShowToPopup} connectionConstructors={connectionConstructors} locations={locations} setLocations={setLocations}/>}
    </>
}

export default ConnectionRow
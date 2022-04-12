import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import { useState } from "react";
import Connection from "../../../services/models/Connection";
import Location from "../../../services/models/Location";
import LocationPopup from "../../map/LocationPopup";
import Button from "../../UI/button/Button";

const Wrapper = styled.div`
    border: 1px solid ${p => p.theme.complementColor};
    padding: 10px;
    font-family: ${p => p.theme.bodyFontFamily};
    display: grid;
    font-size: 0.9em;
    align-items: center;
    grid-template-columns: 120px auto 150px 150px;
    grid-gap: 5px;
`

const Clickable = styled.div`
    color: ${p => p.theme.accentColor};
    cursor: pointer;
    text-decoration: underline;
`

// TODO: Implement deleting
const DayConnectionRow = ({ connection, locations }: { connection: Connection, locations: Location[] }) => {

    const from = locations.find(l => l.id === connection.fromId)
    const to = locations.find(l => l.id === connection.toId)

    const [showToPopup, setShowToPopup] = useState(false)
    const [showFromPopup, setShowFromPopup] = useState(false)
    
    return <>
        <Wrapper>
            <div>{connection.name}</div>
            <div>{connection.description}</div>
            {from ? <Clickable onClick={() => setShowFromPopup(true)}>{from.name}</Clickable> : <div>Unknown</div>}
            {to ? <Clickable onClick={() => setShowToPopup(true)}>{to.name}</Clickable> : <div>Unknown</div>}
        </Wrapper>
        {from && <LocationPopup location={from} show={showFromPopup} setShow={setShowFromPopup} />}
        {to && <LocationPopup location={to} show={showToPopup} setShow={setShowToPopup} />}
    </>
}

export default DayConnectionRow
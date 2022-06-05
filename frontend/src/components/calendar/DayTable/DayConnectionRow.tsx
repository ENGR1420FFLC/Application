import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import React, { useState } from "react";
import Connection from "../../../services/models/Connection";
import Location from "../../../services/models/Location";
import LocationPopup from "../../map/LocationPopup";
import Button from "../../UI/button/Button";
import ConnectionConstructor from "../../../services/models/ConnectionConstructor";
import { dataType } from "../../../App";

const Wrapper = styled.div`
    border: 1px solid ${p => p.theme.complementColor};
    padding: 10px;
    font-family: ${p => p.theme.bodyFontFamily};
    display: grid;
    font-size: 0.9em;
    align-items: center;
    grid-template-columns: 200px 250px 150px 150px;
    grid-gap: 10px;

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
const DayConnectionRow = ({ connection, allData, setAllData }: { connection: Connection, allData: dataType, setAllData: React.Dispatch<dataType> }) => {

    const from = allData.locations.find(l => l.id === connection.fromId)
    const to = allData.locations.find(l => l.id === connection.toId)

    const [showToPopup, setShowToPopup] = useState(false)
    const [showFromPopup, setShowFromPopup] = useState(false)
    
    return <>
        <Wrapper>
            <div>{connection.name}</div>
            <div>{connection.description}</div>
            {from ? <Clickable onClick={() => setShowFromPopup(true)}>{from.name}</Clickable> : <div>Unknown</div>}
            {to ? <Clickable onClick={() => setShowToPopup(true)}>{to.name}</Clickable> : <div>Unknown</div>}
        </Wrapper>
        {from && <LocationPopup allData={allData} setAllData={setAllData} location={from} show={showFromPopup} setShow={setShowFromPopup} />}
        {to && <LocationPopup allData={allData} setAllData={setAllData} location={to} show={showToPopup} setShow={setShowToPopup}/>}
    </>
}

export default DayConnectionRow
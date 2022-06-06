import styled from "styled-components";
import ConnectionConstructor from "../../services/models/ConnectionConstructor";
import { RRule } from 'rrule'
import Location from "../../services/models/Location";
import Button from "../UI/button/Button";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import LocationPopup from "../map/LocationPopup";
import axios from "axios";
import { dataType } from "../../App";

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
const ConnectionRow = ({ allData, setAllData, connectionConstructor }: { allData: dataType, setAllData: React.Dispatch<dataType>, connectionConstructor: ConnectionConstructor }) => {

    const from = allData.locations.find(l => l.id === connectionConstructor.fromId)
    const to = allData.locations.find(l => l.id === connectionConstructor.toId)

    return <>
        <Wrapper>
            <div>{connectionConstructor.name}</div>
            <div>{connectionConstructor.description}</div>
            {from ? <div>{from.name}</div> : <div>Unknown</div>}
            {to ? <div>{to.name}</div> : <div>Unknown</div>}
            <div>{RRule.fromText(connectionConstructor.rrule).toText()}</div>
            <Button content={<FaTrash />} onClick={() => {
                if (window.confirm("Are you sure you want to delete this event?")) {
                    axios.delete(`/api/events/${connectionConstructor.id}`)
                    setAllData({...allData, connectionConstructors: allData.connectionConstructors.filter(c => c.id !== connectionConstructor.id)})
                }
            }}/>
        </Wrapper>
    </>
}

export default ConnectionRow
import React, { useState } from "react";
import styled from "styled-components";
import DayPopup from "./DayPopup";
import Connection from "../../services/models/Connection";
import Location from "../../services/models/Location";

const DayWrapper = styled.div(({ theme, isToday, offset }: { theme: any, isToday: boolean, offset: number }) => `
    flex: 0 0 14%;
    border: 1px solid ${isToday ? theme.accentColor : theme.complementColor};
    box-sizing: border-box;
    height: 130px;
    padding: 5px;
    padding-top: 30px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 2px;

    flex-shrink: 0;
    font-size: 0.75em;
    overflow: hidden;

    &:before {
        z-index: 0;
        content:'';
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        background: linear-gradient(to top, ${theme.neutralColor} 5px, transparent 20px);
    }

    &:hover {
        border: 1px solid ${theme.accentColor};
        cursor: pointer;
    }

    ${offset ? "grid-column-start: " + (offset + 1) + ";" : ""}
`)

const DayBubble = styled.div(({ theme, isToday }: { theme: any, isToday: boolean }) => `
    background-color: ${isToday ? theme.accentColor : "none"};
    color: ${isToday ? theme.invertedTextColor : theme.textColor};
    font-weight: 800;
`)

type PropTypes = { 
    day: Date, 
    offset?: number, 
    isToday: boolean, 
    connections: Connection[],
    locations: Location[]
}

const Row = styled.div`
`

const Num = styled.div(({ theme, isToday }: { theme: any, isToday: boolean }) => `
    color: ${isToday ? theme.invertedTextColor : theme.darkenedNeutralColor};
`)

const DayHeader = styled.div(({ theme, isToday }: { theme: any, isToday: boolean }) => `
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    font-size: 0.7rem;
    display: flex;
    justify-content: space-between;
    padding: 5px;
    align-items: center;
    background-color: ${isToday ? theme.accentColor : theme.complementColor};
`)

const Day = ({ day, offset = 0, isToday, connections, locations }: PropTypes) => {

    const [showPopup, setShowPopup] = useState(false)

    return (
        <>
            <DayWrapper offset={offset} isToday={isToday} onClick={() => setShowPopup(true)}>
                <DayHeader isToday={isToday}>
                    <DayBubble isToday={isToday}>{day.getDate()}</DayBubble>
                    <Num isToday={isToday}>{
                        connections.length === 0 ? "No events" :
                        connections.length === 1 ? "1 event" :
                        `${connections.length} events`
                    }</Num>
                </DayHeader>

                {connections.map(connection => <Row key={connection.name + connection.date.toString()}>
                    - {connection.name}
                </Row>)}
            </DayWrapper>

            <DayPopup day={day} locations={locations} connections={connections} show={showPopup} setShow={setShowPopup}/>
        </>
    )
}

export default Day
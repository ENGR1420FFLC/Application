import React from "react";
import styled from "styled-components";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import Connection from "../../services/models/Connection";
import DayConnectionRow from "./DayTable/DayConnectionRow";
import Location from "../../services/models/Location";
import DayTableHeader from "./DayTable/DayTableHeader";
import ConnectionConstructor from "../../services/models/ConnectionConstructor";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

type PropTypes = { 
    day: Date, 
    connections: Connection[], 
    locations: Location[]
    show: boolean, 
    setShow: React.Dispatch<boolean> 
    connectionConstructors: ConnectionConstructor[]
    setLocations: React.Dispatch<Location[]>
}

const DayPopup = (
    { day, connections, locations, show, setShow, connectionConstructors, setLocations }: PropTypes) => 
    <PopupMsg title={
        `${day.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
    } content={
    <Wrapper>
            
            {connections.length > 0 ? <><DayTableHeader />{connections.map(connection => <DayConnectionRow 
                setLocations={setLocations}
                connectionConstructors={connectionConstructors}
                key={connection.name + connection.date.toString()}
                connection={connection}
                locations={locations}
                />)}</> : "No events"}
    </Wrapper>
} show={show} setShow={setShow} />

export default DayPopup
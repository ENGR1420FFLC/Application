import React from "react";
import styled from "styled-components";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import Connection from "../../services/models/Connection";
import DayConnectionRow from "./DayTable/DayConnectionRow";
import Location from "../../services/models/Location";
import DayTableHeader from "./DayTable/DayTableHeader";
import ConnectionConstructor from "../../services/models/ConnectionConstructor";
import { dataType } from "../../App";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const DayPopup = (
    { day, allData, show, setShow, setAllData, connections }: { day: Date, allData: dataType, setAllData: React.Dispatch<dataType>, setShow: React.Dispatch<boolean>, show: boolean, connections: Connection[] }) => 
    <PopupMsg title={
        `${day.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
    } content={
    <Wrapper>
            
            {connections.length > 0 ? <><DayTableHeader />{connections.map(connection => <DayConnectionRow 
                allData={allData}
                setAllData={setAllData}
                key={connection.name + connection.date.toString()}
                connection={connection}
                />)}</> : "No events"}
    </Wrapper>
} show={show} setShow={setShow} />

export default DayPopup
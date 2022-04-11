import React from "react";
import styled from "styled-components";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import Connection from "../../services/models/Connection";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const DayPopup = (
    { day, connections, show, setShow } : 
    { day: Date, connections: Connection[], show: boolean, setShow: React.Dispatch<boolean>}) => 
    <PopupMsg title={
        `${day.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`
    } content={
    <Wrapper>
            {connections.map(connection => <div key={connection.id.toString()}>
                Name: {connection.name}
                Date: {connection.date}
                Description: {connection.description}
                From: {connection.fromId}
                To: {connection.toId}
            </div>)}
    </Wrapper>
} show={show} setShow={setShow} />

export default DayPopup
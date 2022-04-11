import React from "react";
import { FaPhoneAlt, FaTrash } from "react-icons/fa";
import { ImLoop2 } from "react-icons/im";
import styled from "styled-components";
import Have from "../../services/models/Have";
import Need from "../../services/models/Need";
import BaseTheme from "../../themes/BaseTheme";
import Button from "../UI/button/Button";
import TableItem, { Status } from "../table/TableItem";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import Connection from "../../services/models/Connection";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const ItemWrapper = styled.div(({ theme, selected }: { theme: any, selected: boolean }) => `
    font-family: ${theme.bodyFontFamily};
    display: grid;
    grid-template-columns: 70px 90px auto 50px 120px 70px;
    grid-gap: 5px;
    border: 1px solid ${theme.complementColor};
    background-color: ${selected ? theme.complementColor : "none"};
    border-radius: 5px;
    padding: 10px;
`)

const Field = styled.div`
    color: ${p => p.theme.textColor};
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-right: 10px;
    position: relative;
`

const Gap = styled.div`display: flex; gap: 5px; align-items: center;`

const SmallItem = ({ item, isUser }: { item: Have | Need, isUser: boolean }) => <ItemWrapper selected={isUser}>
    <Field>{isUser ? "" : <Button content={"Match"} onClick={() => null} small />}</Field>

    <Field><Button content={
        <>
            <FaPhoneAlt />
            {item.location.toString().substring(item.location.toString().length - 5)}
        </>
    } onClick={() => null} small /></Field>

    <Field><Gap>{item.recurring ? <ImLoop2 /> : ""} {item.name}</Gap></Field>
    <Field>{item.amount}</Field>
    <Field>{item.expiry.toLocaleDateString('en-US')}</Field>

    <Status status={item.status}>{item.status === 2 ? "FULFILLED" : item.status === 1 ? "MATCHED" : "UNMET"}</Status>
</ItemWrapper>

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
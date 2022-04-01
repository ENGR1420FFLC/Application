import React from "react";
import { FaPhoneAlt, FaTrash } from "react-icons/fa";
import { ImLoop2 } from "react-icons/im";
import styled from "styled-components";
import Have from "../../services/models/Have";
import Need from "../../services/models/Need";
import BaseTheme from "../../themes/BaseTheme";
import Button from "../button/Button";
import TableItem, { Status } from "../inventory/TableItem";
import PopupMsg from "../popupmsg/PopupMsg";

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
    { showOnlyNeeds, day, content, show, setShow } : 
    { showOnlyNeeds: boolean, day: Date, content: Array<Need | Have>, show: boolean, setShow: React.Dispatch<boolean>}) => 
    <PopupMsg title={
        `${day.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}: ${showOnlyNeeds ? "Needs" : "Haves"}`
    } content={
    <Wrapper>
            {content.map(i => <SmallItem item={i} key={i.id.toString()} isUser={false} />)}
    </Wrapper>
} show={show} setShow={setShow} />

export default DayPopup
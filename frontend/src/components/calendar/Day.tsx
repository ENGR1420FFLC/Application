import mongoose from "mongoose";
import React, { useState } from "react";
import styled from "styled-components";
import Item from "../../services/models/Item";
import Table from "../inventory/Table";
import TableItem from "../inventory/TableItem";
import PopupMsg from "../popupmsg/PopupMsg";
import { Header, HeaderWrapper } from "../textStyles/TextStyles";
import DayPopup from "./DayPopup";
import SmallItem from "../inventory/SmallItem";

const DayWrapper = styled.div(({ theme, isToday, offset }: { theme: any, isToday: boolean, offset: number }) => `
    flex: 0 0 14%;
    border-radius: 5px;
    border: 1px solid ${isToday ? theme.accentColor : theme.complementColor};
    box-sizing: border-box;
    height: 120px;
    padding: 5px;
    padding-top: 35px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 3px;

    flex-shrink: 0;

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

    position: absolute;
    top: 5px;
    left: 5px;
    width: 22.5px;
    height: 22.5px;
    font-size: 0.7em;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 100%;
`)

const Day = ({ showOnlyNeeds, day, dayNumber, offset = 0, isToday, content }: { showOnlyNeeds: boolean, day: Date, dayNumber: number, offset?: number, isToday?: boolean, content: Array<Item> }) => {

    const [showPopup, setShowPopup] = useState(false)

    return (
        <>
            <DayWrapper offset={offset} isToday={isToday || false} onClick={() => setShowPopup(true)}>
                <DayBubble isToday={isToday || false}>{dayNumber}</DayBubble>
                {content.map(i => <SmallItem item={i} key={i.id.toString()}/>)}
            </DayWrapper>

            <DayPopup showOnlyNeeds={showOnlyNeeds} day={day} content={content} show={showPopup} setShow={setShowPopup}/>
        </>
    )
}

export default Day
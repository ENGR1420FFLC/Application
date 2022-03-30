import React from "react";
import styled from "styled-components";

const DayWrapper = styled.div(({ theme, isToday, offset }: { theme: any, isToday: boolean, offset: number }) => `
    flex: 0 0 14%;
    border-radius: 5px;
    border: 1px solid ${isToday ? theme.accentColor : theme.complementColor};
    box-sizing: border-box;
    height: 120px;
    padding: 5px;
    position: relative;

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

const Day = ({ day, offset = 0, isToday }: { day: number, offset?: number, isToday?: boolean }) => {
    return (
        <DayWrapper offset={offset} isToday={isToday || false}>
            <DayBubble isToday={isToday || false}>{day}</DayBubble>
        </DayWrapper>
    )
}

export default Day
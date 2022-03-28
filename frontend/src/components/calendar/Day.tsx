import React from "react";
import styled from "styled-components";

const DayWrapper = styled.div`
    flex: 0 0 14%;
    border-radius: 5px;
    background-color: ${p => p.theme.neutral};
    box-sizing: border-box;
    height: 100px;
    font-family: ${p => p.theme.bodyFontFamily};
    font-size: 0.75em;
    padding: 5px;

    ${(p: {offset: number}) => p.offset ? "grid-column-start: " + (p.offset + 1) + ";" : ""}
`

const Day = ({ day, offset = 0 }: { day: number, offset?: number }) => {
    return (
        <DayWrapper offset={offset}>
            {day}
        </DayWrapper>
    )
}

export default Day
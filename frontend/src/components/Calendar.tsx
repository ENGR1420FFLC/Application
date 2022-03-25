import React, { useEffect } from "react"
import styled from "styled-components"
import CalendarService from "../services/CalendarService"

const CalendarWrapper = styled.div`
    border: 1px solid red;
`

const Calendar = () => {

    useEffect(() => {
        const res = CalendarService.getEvents()
    }, [])

    return (
        <CalendarWrapper>
            Calendar
        </CalendarWrapper>
    )
}

export default Calendar
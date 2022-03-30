import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CalendarService from "../../services/CalendarService"
import CalendarEvent from "./CalendarEvent"
import Day from "./Day"

const CalendarWrapper = styled.div`
    border-radius: 5px;
    background-color: ${p => p.theme.complement};
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    width: 600px;
    box-sizing: border-box;
`

const DaysWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 5px;
`

const Header = styled.div`
    font-family: ${p => p.theme.headingFontFamily};
    text-align: center;
    font-size: 1.5em;
`

enum Days {
    Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday
}

enum Months {
    January, February, March, April, May, June, July, August, September, October, November, December
}

const Calendar = () => {

    const empty: Array<CalendarEvent> = []
    const [allEvents, setAllEvents] = useState(empty)
    const [displayMonth, setDisplayMoth] = useState(Months.March)
    const [displayYear, setDisplayYear] = useState(2022)

    useEffect(() => {
        CalendarService.getEvents().then(events => setAllEvents(events))
    }, [])

    const numDays = new Date(displayYear, displayMonth + 1, 0).getDate()
    const firstDayOffset = new Date(2022, 2, 1).getDay()
    console.log(firstDayOffset);
    
    const dayObjects = []
    dayObjects.push(<Day day={1} key={1} offset={firstDayOffset}/>)
    for (let day = 2; day <= numDays; day++) {
        dayObjects.push(<Day day={day} key={day}/>)
    }

    return (
        <CalendarWrapper>

            <Header>{Months[displayMonth]}</Header>

            <DaysWrapper>
                {/* {Days.map(d => <div>{d}</div>)} */}
            </DaysWrapper>
            <DaysWrapper>
                {dayObjects}
            </DaysWrapper>
        </CalendarWrapper>
    )
}

export default Calendar
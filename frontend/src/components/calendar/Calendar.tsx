import React, { useEffect, useState } from "react"
import styled from "styled-components"
import CalendarService from "../../services/CalendarService"
import Button from "../button/Button"
import CalendarEvent from "./CalendarEvent"
import Day from "./Day"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const CalendarWrapper = styled.div`
    border-radius: 5px;
    /* background-color: ${p => p.theme.complementColor}; */
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    width: 100%;
    box-sizing: border-box;
`

const DaysWrapper = styled.div`
    font-family: ${p => p.theme.bodyFontFamily};
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    grid-gap: 5px;
`

const DaysHeader = styled(DaysWrapper)`
    color: ${p => p.theme.darkenedNeutralColor};
    text-align: center;
`

const Header = styled.div`
    font-family: ${p => p.theme.headingFontFamily};
    font-weight: 800;
    text-align: center;
    font-size: 2em;
    margin-left: auto;
`

const HeaderWrapper = styled.div`
    position: relative;
    font-family: ${p => p.theme.bodyFontFamily};
    border-bottom: 1px solid ${p => p.theme.complementColor};
    padding-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
`

enum Days {
    SUN, MON, TUE, WED, THU, FRI, SAT
}

enum Months {
    January, February, March, April, May, June, July, August, September, October, November, December
}

const Calendar = () => {

    const empty: Array<CalendarEvent> = []
    const [allEvents, setAllEvents] = useState(empty)
    const [displayMonth, setDisplayMonth] = useState(new Date().getMonth())
    const [displayYear, setDisplayYear] = useState(new Date().getFullYear())
    const [todaysDate, setTodaysDate] = useState(new Date())

    useEffect(() => {
        CalendarService.getEvents().then(events => setAllEvents(events))
    }, [])

    const numDays = new Date(displayYear, displayMonth + 1, 0).getDate()
    const firstDayOffset = new Date(displayYear, displayMonth, 1).getDay()
    
    const dayObjects = []
    dayObjects.push(<Day day={1} key={1} offset={firstDayOffset}/>)

    for (let day = 2; day <= numDays; day++) {
        dayObjects.push(<Day day={day} key={day} isToday={
            todaysDate.getFullYear() === displayYear &&
            todaysDate.getMonth() === displayMonth &&
            todaysDate.getDate() === day
        }/>)
    }

    const incrementMonth = () => {
        setDisplayMonth((displayMonth + 1) % 12)
        setDisplayYear(displayYear + Math.floor((displayMonth + 1) / 12))
    }

    const decrementMonth = () => {
        setDisplayMonth((displayMonth + 11) % 12)
        setDisplayYear(displayYear + Math.min(displayMonth - 1, 0))
    }

    const resetDate = () => {
        setDisplayMonth(new Date().getMonth())
        setDisplayYear(new Date().getFullYear())
    }

    const dayHeaders = []
    for (let d in Days) {
        if (isNaN(Number(d))) dayHeaders.push(<div key={d}>{d}</div>)
    }

    return (
        <CalendarWrapper>

            <HeaderWrapper>
                <Button content={<FaArrowLeft />} onClick={decrementMonth} />
                <Button content={<FaArrowRight />} onClick={incrementMonth} />
                <Button content="Today" onClick={resetDate} />
                <Header>{Months[displayMonth]} {displayYear}</Header>
            </HeaderWrapper>

            <DaysHeader>
                {dayHeaders}
            </DaysHeader>
            <DaysWrapper>
                {dayObjects}
            </DaysWrapper>
        </CalendarWrapper>
    )
}

export default Calendar
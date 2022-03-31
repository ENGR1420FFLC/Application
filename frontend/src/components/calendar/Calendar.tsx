import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "../button/Button"
import Day from "./Day"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Header, HeaderWrapper } from "../textStyles/TextStyles";
import Need from "../../services/models/Need";
import Have from "../../services/models/Have";
import Slider from "../slider/Slider";

const CalendarWrapper = styled.div`
    border-radius: 5px;
    /* background-color: ${p => p.theme.complementColor}; */
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 0 10px;
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
    font-weight: 800;
    text-align: center;
`

enum Days {
    SUN, MON, TUE, WED, THU, FRI, SAT
}

enum Months {
    January, February, March, April, May, June, July, August, September, October, November, December
}

type PropTypes = {
    allNeeds: Array<Need>
    allHaves: Array<Have>
}

const Calendar = ({ allNeeds, allHaves }: PropTypes) => {

    const [displayMonth, setDisplayMonth] = useState(new Date().getMonth())
    const [displayYear, setDisplayYear] = useState(new Date().getFullYear())
    const [todaysDate, setTodaysDate] = useState(new Date())

    const [showOnlyNeeds, setShowOnlyNeeds] = useState(true)
    const [showOnlyRecurring, setShowOnlyRecurring] = useState(false)

    let toDisplay = showOnlyNeeds ? allNeeds : allHaves
    toDisplay = showOnlyRecurring ? toDisplay.filter(h => h.recurring) : toDisplay

    const numDays = new Date(displayYear, displayMonth + 1, 0).getDate()
    const firstDayOffset = new Date(displayYear, displayMonth, 1).getDay()
    
    const dayObjects = []
    for (let i = 0; i < firstDayOffset; i++) dayObjects.push(<div key={i + "!"}></div>)

    const datesAreEqual = (d1: Date, d2: Date) => {
        return d1.getFullYear() === d2.getFullYear() &&
            d1.getMonth() === d2.getMonth() &&
            d1.getDate() === d2.getDate()
    }

    for (let day = 1; day <= numDays; day++) {
        const itemDate = new Date(`${displayYear}-${displayMonth + 1}-${day}`)
        const content = toDisplay.filter(i => datesAreEqual(i.expiry, itemDate))
        dayObjects.push(<Day 
            day={day} key={day + "-" + content.length} 
            isToday={datesAreEqual(todaysDate, itemDate)}
            content={content}
        />)
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
        <>
            <HeaderWrapper>
                <Header>{Months[displayMonth]} {displayYear}</Header>

                <Button content={<FaArrowLeft />} onClick={decrementMonth} />
                <Button content={<FaArrowRight />} onClick={incrementMonth} />
                <Button content="Today" onClick={resetDate} />

                <Slider value={showOnlyRecurring} setValue={setShowOnlyRecurring} trueContent="Recurring" falseContent="All types" />
                <Slider value={showOnlyNeeds} setValue={setShowOnlyNeeds} trueContent="Needs" falseContent="Haves" />
            </HeaderWrapper>

            <CalendarWrapper>
                <DaysHeader>
                    {dayHeaders}
                </DaysHeader>
                <DaysWrapper>
                    {dayObjects}
                </DaysWrapper>
            </CalendarWrapper>
        </>
    )
}

export default Calendar
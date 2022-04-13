import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Button from "../UI/button/Button"
import Day from "./Day"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Header, HeaderWrapper } from "../textStyles/TextStyles";
import Connection from "../../services/models/Connection";
import ConnectionConstructor from "../../services/models/ConnectionConstructor";
import Location from "../../services/models/Location";
import Service from "../../services/Service";


const CalendarWrapper = styled.div`
    border-radius: 5px;
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
    connectionConstructors: ConnectionConstructor[]
    locations: Location[]
    setLocations: React.Dispatch<Location[]>
}

const Calendar = ({ connectionConstructors , locations, setLocations }: PropTypes) => {

    const emptyConnections: Connection[] = []
    const [connections, setConnections] = useState(emptyConnections)

    const [displayMonth, setDisplayMonth] = useState(new Date().getMonth())
    const [displayYear, setDisplayYear] = useState(new Date().getFullYear())

    useEffect(() => {
        Service.getConnections(displayMonth + 1)
            .then(data => {
                setConnections(data)
            })
    }, [displayMonth])

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
        const date = new Date(`${displayYear}-${displayMonth + 1}-${day}`)
        const content = connections.filter(connection => datesAreEqual(connection.date, date))
        dayObjects.push(<Day 
            setLocations={setLocations}
            connectionConstructors={connectionConstructors}
            day={date}
            key={date.toString()} 
            isToday={datesAreEqual(new Date(), date)}
            connections={content}
            locations={locations}
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
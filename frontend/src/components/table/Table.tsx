import React, { useState } from "react"
import styled from "styled-components"
import Have from "../../services/models/Have"
import Button from "../UI/button/Button"
import { FaPlus } from "react-icons/fa"
import TableItem from "./TableItem"
import TableHeader from "./TableHeader"
import { Header, HeaderWrapper } from "../textStyles/TextStyles"
import Slider from "../UI/slider/Slider"
import mongoose from "mongoose"
import Need from "../../services/models/Need"
import Dropdown from "../UI/dropdown/Dropdown"
import Connection from "../../services/models/Connection"
import Location from "../../services/models/Location"

type PropTypes = {
    name: string
    myLocation: Location | null
    connections: Connection[]
}

const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Table = ({ name, connections, myLocation }: PropTypes) => {

    // const [showOnlyUser, setShowOnlyUser] = useState(true)
    // const [showOnlyRecurring, setShowOnlyRecurring] = useState(false)

    // let toDisplay = showOnlyUser ? allItems.filter(h => h.location.equals(userLocation)) : allItems
    // toDisplay = showOnlyRecurring ? toDisplay.filter(h => h.recurring) : toDisplay

    // const removeItem = (toRemove: Have | Need) => {return () => {
    //     setAllItems(allItems.filter(existing => !existing.id.equals(toRemove.id)))
    // }}

    return(
        <>
            <HeaderWrapper>
                <Header>{name}</Header>
                Show <Dropdown currentState="Next 30 days" possibleStates={["TEST"]} setState={() => null} />
                {/* <Slider value={showOnlyRecurring} setValue={setShowOnlyRecurring} trueContent="Recurring" falseContent="All types" />
                <Slider value={showOnlyUser} setValue={setShowOnlyUser} trueContent="Yours" falseContent="Everyones" /> */}
            </HeaderWrapper>
            <TableHeader/>
            <ItemsWrapper>
                {connections.map(connection => <div key={connection.id.toString()}>
                    Name: {connection.name}
                    Date: {connection.date}
                    Description: {connection.description}
                    From: {connection.fromId}
                    To: {connection.toId}
                </div>)}
            </ItemsWrapper>
        </>
    )

}

export default Table
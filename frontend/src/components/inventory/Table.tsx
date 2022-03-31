import React, { useState } from "react"
import styled from "styled-components"
import Have from "../../services/models/Have"
import Button from "../button/Button"
import { FaPlus, FaTrash } from "react-icons/fa"
import BaseTheme from "../../themes/BaseTheme"
import TableItem from "./TableItem"
import TableHeader from "./TableHeader"
import { Header, HeaderWrapper } from "../textStyles/TextStyles"
import Slider from "../slider/Slider"
import mongoose from "mongoose"
import Need from "../../services/models/Need"
import Dropdown from "../dropdown/Dropdown"

type PropTypes = {
    name: string
    userLocation: mongoose.Types.ObjectId
    allItems: Array<Have | Need>
    setAllItems: React.Dispatch<Array<Have | Need>>
}

const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Table = ({ name, userLocation, allItems, setAllItems }: PropTypes) => {

    const [showOnlyUser, setShowOnlyUser] = useState(true)
    const [showOnlyRecurring, setShowOnlyRecurring] = useState(false)

    let toDisplay = showOnlyUser ? allItems.filter(h => h.location.equals(userLocation)) : allItems
    toDisplay = showOnlyRecurring ? toDisplay.filter(h => h.recurring) : toDisplay

    const removeItem = (toRemove: Have | Need) => {return () => {
        setAllItems(allItems.filter(existing => !existing.id.equals(toRemove.id)))
    }}

    return(
        <>
            <HeaderWrapper>
                <Header>{name}</Header>
                Show <Dropdown currentState="Next 30 days" possibleStates={["TEST"]} setState={() => null} />
                <Slider value={showOnlyRecurring} setValue={setShowOnlyRecurring} trueContent="Recurring" falseContent="All types" />
                <Slider value={showOnlyUser} setValue={setShowOnlyUser} trueContent="Yours" falseContent="Everyones" />
            </HeaderWrapper>
            <TableHeader/>
            <ItemsWrapper>
                {toDisplay.map(h => <TableItem 
                    key={h.id.toString()} 
                    item={h}
                    remove={removeItem(h)} 
                    isUser={h.location.equals(userLocation)}/>)}
                    <Button content={<><FaPlus />Add Item</>} onClick={() => null} />
            </ItemsWrapper>
        </>
    )

}

export default Table
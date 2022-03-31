import React, { useState } from "react"
import styled from "styled-components"
import Have from "../../services/models/Have"
import Button from "../button/Button"
import { FaTrash } from "react-icons/fa"
import BaseTheme from "../../themes/BaseTheme"
import HaveItem from "./HaveItem"
import HaveTableHeader from "./HaveTableHeader"
import { Header, HeaderWrapper } from "../textStyles/TextStyles"
import Slider from "../slider/Slider"
import mongoose from "mongoose"

type PropTypes = {
    userLocation: mongoose.Types.ObjectId
    allHaves: Array<Have>
    setAllHaves: React.Dispatch<Array<Have>>
}

const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Inventory = ({ userLocation, allHaves, setAllHaves }: PropTypes) => {

    const [showOnlyUser, setShowOnlyUser] = useState(true)
    const [showOnlyRecurring, setShowOnlyRecurring] = useState(false)

    let toDisplay = showOnlyUser ? allHaves.filter(h => h.location.equals(userLocation)) : allHaves
    toDisplay = showOnlyRecurring ? toDisplay.filter(h => h.recurring) : toDisplay

    const removeItem = (toRemove: Have) => {return () => {
        setAllHaves(allHaves.filter(existing => !existing.id.equals(toRemove.id)))
    }}

    return(
        <>
            <HeaderWrapper>
                <Header>Inventory</Header>
                <Slider value={showOnlyRecurring} setValue={setShowOnlyRecurring} trueContent="Recurring" falseContent="All types" />
                <Slider value={showOnlyUser} setValue={setShowOnlyUser} trueContent="Your Inventory" falseContent="All Inventory" />
            </HeaderWrapper>
            <HaveTableHeader/>
            <ItemsWrapper>
                {toDisplay.map(h => <HaveItem 
                    key={h.id.toString()} 
                    have={h} 
                    remove={removeItem(h)} 
                    isUser={h.location.equals(userLocation)}/>)}
            </ItemsWrapper>
        </>
    )

}

export default Inventory
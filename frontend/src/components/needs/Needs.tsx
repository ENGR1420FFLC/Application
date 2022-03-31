import React, { useState } from "react"
import styled from "styled-components"
import Button from "../button/Button"
import { FaTrash } from "react-icons/fa"
import BaseTheme from "../../themes/BaseTheme"
import NeedItem from "./NeedItem"
import NeedTableHeader from "./NeedTableHeader"
import { Header, HeaderWrapper } from "../textStyles/TextStyles"
import Slider from "../slider/Slider"
import mongoose from "mongoose"
import Need from "../../services/models/Need"

type PropTypes = {
    userLocation: mongoose.Types.ObjectId
    allNeeds: Array<Need>
    setAllNeeds: React.Dispatch<Array<Need>>
}

const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Inventory = ({ userLocation, allNeeds, setAllNeeds }: PropTypes) => {

    const [showOnlyUser, setShowOnlyUser] = useState(true)
    const toDisplay = showOnlyUser ? allNeeds.filter(h => h.location.equals(userLocation)) : allNeeds

    const removeItem = (toRemove: Need) => {return () => {
        setAllNeeds(allNeeds.filter(existing => !existing.id.equals(toRemove.id)))
    }}

    return(
        <>
            <HeaderWrapper>
                <Header>Needs</Header>
                <Slider value={showOnlyUser} setValue={setShowOnlyUser} trueContent="Your Needs" falseContent="All Needs" />
            </HeaderWrapper>
            <NeedTableHeader/>
            <ItemsWrapper>
                {/* {toDisplay.map(h => <NeedItem 
                    key={h.id.toString()} 
                    have={h} 
                    remove={removeItem(h)} 
                    isUser={h.location.equals(userLocation)}/>)} */}
            </ItemsWrapper>
        </>
    )

}

export default Inventory
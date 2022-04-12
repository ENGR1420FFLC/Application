import React, { useState } from "react"
import styled from "styled-components"
import TableHeader from "./TableHeader"
import { Header, HeaderWrapper } from "../textStyles/TextStyles"
import Dropdown from "../UI/dropdown/Dropdown"
import Location from "../../services/models/Location"
import ConnectionConstructor from "../../services/models/ConnectionConstructor"
import ConnectionRow from "./ConnectionRow"

type PropTypes = {
    name: string
    connectionConstructors: ConnectionConstructor[]
    locations: Location[]
}

const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const Table = ({ name, connectionConstructors, locations }: PropTypes) => {

    const [filter, setFilter] = useState("All")

    return(
        <>
            <HeaderWrapper>
                <Header>{name}</Header>
                Show <Dropdown currentState={filter} possibleStates={["All", "Only repeat", "Only one-time"]} setState={setFilter} />
            </HeaderWrapper>
            <TableHeader/>
            <ItemsWrapper>
                {connectionConstructors.map(connection => <ConnectionRow key={connection.id.toString()} connectionConstructor={connection} locations={locations}/>)}
            </ItemsWrapper>
        </>
    )

}

export default Table
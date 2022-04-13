import React, { useState } from "react"
import styled from "styled-components"
import TableHeader from "./TableHeader"
import { Header, HeaderWrapper } from "../textStyles/TextStyles"
import Dropdown from "../UI/dropdown/Dropdown"
import Location from "../../services/models/Location"
import ConnectionConstructor from "../../services/models/ConnectionConstructor"
import ConnectionRow from "./ConnectionRow"
import Button from "../UI/button/Button"
import { FaPlus } from "react-icons/fa"
import AddConnectionPopup from "./AddConnectionPopup"

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

const Center = styled.div`
    margin-top: 15px;
    display: flex;
    justify-content: center;
`

const Table = ({ name, connectionConstructors, locations }: PropTypes) => {

    const [filter, setFilter] = useState("All")
    const [showAddPopup, setShowAddPopup] = useState(false)

    const popup = <div>
        Hello
    </div>

    return(
        <>
            <HeaderWrapper>
                <Header>{name}</Header>
                Show <Dropdown 
                    currentState={filter} 
                    possibleStates={["All", "Only repeat", "Only one-time"]}
                    displayStates={["All", "Only repeat", "Only one-time"]} 
                    setState={setFilter} />
            </HeaderWrapper>
            <TableHeader/>
            <ItemsWrapper>
                {connectionConstructors.map(connection => <ConnectionRow key={connection.id.toString()} connectionConstructor={connection} locations={locations}/>)}
            </ItemsWrapper>
            <Center>
                <Button content={<><FaPlus />Add connection</>} onClick={() => null} />
            </Center>
            <AddConnectionPopup content={popup} show={showAddPopup} setShow={setShowAddPopup}/>
        </>
    )

}

export default Table
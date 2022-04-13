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
import Connection from "../../services/models/Connection"

type PropTypes = {
    name: string
    connectionConstructors: ConnectionConstructor[]
    locations: Location[]
    setConnectionConstructors: React.Dispatch<ConnectionConstructor[]>
    setLocations: React.Dispatch<Location[]>
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

const Table = ({ name, connectionConstructors, setConnectionConstructors, locations, setLocations }: PropTypes) => {

    const [filter, setFilter] = useState("All")
    const [showAddPopup, setShowAddPopup] = useState(false)

    const addConnection = (connection: ConnectionConstructor) => {
        setConnectionConstructors([...connectionConstructors, connection])
    }

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
            <ItemsWrapper>
                <TableHeader />
                {connectionConstructors.map(connection => <ConnectionRow 
                    setLocations={setLocations}
                    key={connection.id.toString()} 
                    connectionConstructor={connection} locations={locations} connectionConstructors={connectionConstructors}/>)}
            </ItemsWrapper>
            <Center>
                <Button content={<><FaPlus />Add connection</>} onClick={() => setShowAddPopup(true)} />
            </Center>
            <AddConnectionPopup locations={locations} show={showAddPopup} setShow={setShowAddPopup} addConnection={addConnection}/>
        </>
    )

}

export default Table
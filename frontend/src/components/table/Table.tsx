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
import { dataType } from "../../App"

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

const Table = ({ allData, setAllData }: { allData: dataType, setAllData: React.Dispatch<dataType> }) => {
    const [showAddPopup, setShowAddPopup] = useState(false)

    const addConnection = (connection: ConnectionConstructor) => {
        setAllData({...allData, connectionConstructors: [...allData.connectionConstructors, connection]})
    }

    return(
        <>
            <HeaderWrapper>
                <Header>Table</Header>
            </HeaderWrapper>
            <ItemsWrapper>
                <TableHeader />
                {allData.connectionConstructors.map(connection => <ConnectionRow 
                    allData={allData}
                    setAllData={setAllData}
                    connectionConstructor={connection}
                    key={connection.id.toString()} 
                    />)}
            </ItemsWrapper>
            <Center>
                <Button content={<><FaPlus />Add connection</>} onClick={() => setShowAddPopup(true)} />
            </Center>
            <AddConnectionPopup locations={allData.locations} show={showAddPopup} setShow={setShowAddPopup} addConnection={addConnection}/>
        </>
    )

}

export default Table
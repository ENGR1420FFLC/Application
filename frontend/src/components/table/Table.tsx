import React from "react"
import styled from "styled-components"
import TableHeader from "./TableHeader"
import { Header, HeaderWrapper } from "../textStyles/TextStyles"
import Dropdown from "../UI/dropdown/Dropdown"
import Location from "../../services/models/Location"
import ConnectionConstructor from "../../services/models/ConnectionConstructor"

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
    return(
        <>
            <HeaderWrapper>
                <Header>{name}</Header>
                Show <Dropdown currentState="Next 30 days" possibleStates={["TEST"]} setState={() => null} />
            </HeaderWrapper>
            <TableHeader/>
            <ItemsWrapper>
                {connectionConstructors.map(connection => <div key={connection.id.toString()}>
                    Name: {connection.name}
                    {/* Date: {connection.date} */}
                    Description: {connection.description}
                    From: {connection.fromId}
                    To: {connection.toId}
                </div>)}
            </ItemsWrapper>
        </>
    )

}

export default Table
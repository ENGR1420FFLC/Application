import React from "react";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import Location from "../../services/models/Location"
import styled from "styled-components"
import Button from "../UI/button/Button";
import { FaTimes, FaTrash } from "react-icons/fa";
import ConnectionConstructor from "../../services/models/ConnectionConstructor";
import ConnectionRow from "../table/ConnectionRow";
import { SmallHeader } from "../textStyles/TextStyles";
import TableHeader from "../table/TableHeader";
import Service from "../../services/Service";

const Wrapper = styled.div`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
    z-index: 99999;
    font-family: ${p => p.theme.bodyFontFamily};
`

const RowWrapper = styled.div`
    display: flex;
    gap: 10px;
`
const Field = styled.div`
    color: ${p => p.theme.accentColor};
    font-weight: 800;
`
const Row = ({ name, value }: { name: string, value: string }) => <RowWrapper>
    {name}: <Field>{value}</Field>
</RowWrapper>

const Right = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`

const ItemsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`


type PropTypes = { 
    location: Location, 
    locations: Location[]
    show: boolean, 
    connectionConstructors: ConnectionConstructor[]
    setShow: React.Dispatch<boolean> 
    setLocations: React.Dispatch<Location[]>
}

const LocationPopup = ({ location, locations, show, setShow, connectionConstructors, setLocations }: PropTypes) => {

    const displayConnections = connectionConstructors.filter(c => c.fromId === location.id || c.toId === location.id)
    const handleRemove = () => {
        setLocations(locations.filter(l => l.id !== location.id))
        setShow(false)
    }

    const locationContent = <Wrapper>
        <Row name="Description" value="No Description Provided..." />
        <Row name="Type" value={location.identity} />
        <Row name="Number of people" value={(Math.round(location.numPeople) || "N/A").toString()}/>
        <Row name="Location" value={Math.round(location.longitude).toString() + ", " + Math.round(location.latitude).toString()} />
        <Row name="Days of operation" value={"Tu, Th, Su"} />
        <Row name="Is FFLC partner" value={"YES"} />
        <Right>
            <Button content={<>Delete<FaTrash /></>} onClick={handleRemove}/>
        </Right>

        <SmallHeader>
            Connections
        </SmallHeader>
        <ItemsWrapper>
            {displayConnections.length > 0 ? 
                    <><TableHeader />{
                        displayConnections.map(connection => 
                        <ConnectionRow 
                                setLocations={setLocations}
                            key={connection.id.toString()} 
                            connectionConstructor={connection} 
                            locations={locations} 
                            connectionConstructors={displayConnections} 
                        />)}
                    </>
                : "No connections found"}
        </ItemsWrapper>
    </Wrapper>

    return <PopupMsg content={locationContent} title={location.name} show={show} setShow={setShow}/>
}

export default LocationPopup
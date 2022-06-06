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
import { dataType } from "../../App";

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

const LocationPopup = ({ allData, setAllData, location, show, setShow }: { allData: dataType, setAllData: React.Dispatch<dataType>, location: Location, show: boolean, setShow: React.Dispatch<boolean> }) => {

    const displayConnections = allData.connectionConstructors.filter(c => c.fromId === location.id || c.toId === location.id)
    
    const handleRemove = () => {
        console.log(location.id?.toString())
        Service.deleteLocation(location.id?.toString() || "")
        setAllData({ ...allData, locations: allData.locations.filter(l => l.id !== location.id) })
        setShow(false)
    }

    const locationContent = <Wrapper>
        <SmallHeader>
            Contact
        </SmallHeader>
        <Row name="Phone number" value={"###-###-####"} />
        <Row name="Email address" value={"abc@gmail.com"} />

        <SmallHeader>
            Info
        </SmallHeader>
        <Row name="Description" value="No Description Provided..." />
        <Row name="Type" value={location.identity} />
        <Row name="Est. # of people" value={(Math.round(location.numPeople) || "N/A").toString()}/>
        <Row name="Location" value={Math.round(location.longitude).toString() + ", " + Math.round(location.latitude).toString()} />
        <Row name="Days of operation" value={"Tu, Th, Su"} />
        <Row name="Is FFLC partner" value={"YES"} />
        <Row name="Radius" value={(location.radius?.toString() || "0") + " mile(s)"} />
        <div>
            Weekly Needs
            <div style={{ display: "flex", gap: "5px", height: "50px", alignItems: "flex-end", margin: "40px 50px", position: "relative" }}>
                {(location.weeklyNeeds.length === 4 ? location.weeklyNeeds : [1, 1, 1, 1]).map((wk, i) => <div
                    style={{ backgroundColor: "black", width: "15px", height: `${wk * 30}px`, position: "relative" }}
                ><div style={{ position: "absolute", bottom: "-25px", left: "2.5px" }}>{i + 1}</div></div>)}
                <div style={{ position: "absolute", left: "-50px", top: "-20px" }}>More</div>
                <div style={{ position: "absolute", left: "-50px", top: "30px" }}>Less</div>
            </div>
        </div>

        <Button content={<>Delete Location<FaTrash /></>} onClick={handleRemove}/>
        <SmallHeader>
            Connections
        </SmallHeader>
        <ItemsWrapper>
            {displayConnections.length > 0 ? 
                    <><TableHeader />{
                        displayConnections.map(connection => 
                        <ConnectionRow 
                            allData={allData}
                            setAllData={setAllData}
                            key={connection.id.toString()} 
                            connectionConstructor={connection} 
                        />)}
                    </>
                : "No connections found"}
        </ItemsWrapper>
    </Wrapper>

    return <PopupMsg content={locationContent} title={location.name} show={show} setShow={setShow}/>
}

export default LocationPopup
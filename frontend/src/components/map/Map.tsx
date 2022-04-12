import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet'
import styled from "styled-components"
import Button from "../UI/button/Button"
import LocationMarker from "./features/LocationMarker"
import { HeaderWrapper, Header } from "../textStyles/TextStyles"
import { FaPlus } from "react-icons/fa"
import Dropdown from "../UI/dropdown/Dropdown"
import { useState } from "react"
import AddSitePopup from "./AddSitePopup"
import ConnectionConstructor from "../../services/models/ConnectionConstructor"
import Location from "../../services/models/Location"

const Wrapper = styled.div`
    z-index: 400;
    position: absolute;
    bottom: 10px;
    left: 10px;
`

const Center = styled.div`
    display: flex;
    justify-content: center;
`

const ResetButton = () => {
    const map = useMapEvents({})

    const HandleClick = () => {
        map.flyTo([44.0421, -123.1018], 13)
    }

    return <Wrapper>
        <Button content="Reset View" onClick={HandleClick}/>
    </Wrapper>
}

type PropTypes = {
    connectionConstructors: ConnectionConstructor[]
    locations: Location[]
}

const Map = ({ connectionConstructors, locations }: PropTypes) => {

    const [showAddSite, setShowAddSite] = useState(false)
    const [siteFilter, setSiteFilter] = useState("All")

    return (
        <>
            <HeaderWrapper>
                <Header>
                    Map
                </Header>
                Show 
                <Dropdown currentState={siteFilter} possibleStates={["All", "Only unsanctioned", "Only sanctioned"]} setState={setSiteFilter} />
                sites
            </HeaderWrapper>

            <AddSitePopup show={showAddSite} setShow={setShowAddSite}/>

            <MapContainer center={[44.0421, -123.1018]} zoom={13}>
                <ResetButton />
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                    maxZoom={20}
                    minZoom={13}
                />

                {locations.map(location => {
                    if (location.latitude && location.longitude) return <LocationMarker location={location} key={location.id.toString()}/>
                    return null
                })}

            </MapContainer>
            <br />
            <Center>
                <Button content={<><FaPlus />Add Location</>} onClick={() => setShowAddSite(true)} />
            </Center>
        </>
    )
}

export default Map
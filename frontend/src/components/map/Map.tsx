import L, { DivIcon, Icon } from "leaflet"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import styled from "styled-components"
import Button from "../button/Button"
import PersonMarker from "./features/PersonMarker"
import ProviderMarker from "./features/ProviderMarker"
import Arrow from "./features/Arrow"
import { HeaderWrapper, Header } from "../textStyles/TextStyles"
import { FaPlus } from "react-icons/fa"
import Slider from "../slider/Slider"
import Dropdown from "../dropdown/Dropdown"
import { useState } from "react"
import PopupMsg from "../popupmsg/PopupMsg"
import UnsanctionedPopup from "./UnsanctionedPopup"

const Wrapper = styled.div`
    z-index: 400;
    position: absolute;
    bottom: 10px;
    left: 10px;
`

const ResetButton = () => {
    const map = useMapEvents({})

    const HandleClick = () => {
        map.flyTo([44.0421, -123.1068], 14.5)
    }

    return <Wrapper>
        <Button content="Reset View" onClick={HandleClick}/>
    </Wrapper>
}

const Map = () => {

    const [showAddSite, setShowAddSite] = useState(false)

    return (
        <>
            <HeaderWrapper>
                <Header>
                    Map
                </Header>
                <Button content={<><FaPlus />Add Unsanctioned Site</>} onClick={() => setShowAddSite(true)} />
            </HeaderWrapper>

            <HeaderWrapper>
                <Header>
                </Header>
                Show <Dropdown currentState="Next 30 days" possibleStates={["TEST"]} setState={() => null} />
                <Slider value={true} setValue={() => null} trueContent="All Locations" falseContent="Only Unsanctioned" />
                <Slider value={true} setValue={() => null} trueContent="All connections" falseContent="One-time connections" />
            </HeaderWrapper>

            <UnsanctionedPopup show={showAddSite} setShow={setShowAddSite}/>

            <MapContainer center={[44.0421, -123.1068]} zoom={14.5}>
                <ResetButton />
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                    maxZoom={20}
                    minZoom={13}
                />
                <Marker position={[44.0421, -123.1068]} icon={new Icon({
                    iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png`,
                    // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                })}/>
                <PersonMarker position={[44.0521, -123.0868]} numPerson={1} unsanctioned/>
                <PersonMarker position={[44.0411, -123.0768]} numPerson={3} />
                <PersonMarker position={[44.0381, -123.0990]} numPerson={4} />
                <PersonMarker position={[44.0493, -123.0790]} numPerson={3} color="red"/>
                <PersonMarker position={[44.0481, -123.1090]} numPerson={2} color="red" unsanctioned/>
                <ProviderMarker position={[44.0511, -123.0990]} />
                <Arrow start={[44.0511, -123.0990]} end={[44.0521, -123.0868]} dashed/>
                <ProviderMarker position={[44.0311, -123.0990]} />
                <Arrow start={[44.0311, -123.0990]} end={[44.0311, -123.0890]} dashed />
                <PersonMarker position={[44.0311, -123.0890]} numPerson={2} unsanctioned/>
                <ProviderMarker position={[44.0361, -123.1090]} />
                <Arrow start={[44.0361, -123.1090]} end={[44.0421, -123.0968]} dashed />
                <Arrow start={[44.0361, -123.1090]} end={[44.0381, -123.0990]} />
                <PersonMarker position={[44.0421, -123.0968]} numPerson={2} unsanctioned/>
            </MapContainer>

        </>
    )
}

export default Map
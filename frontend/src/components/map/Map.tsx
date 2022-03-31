import { DivIcon, Icon } from "leaflet"
import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import styled from "styled-components"
import Button from "../button/Button"
import PersonMarker from "./PersonMarker"
import ProviderMarker from "./ProviderMarker"

const Wrapper = styled.div`
    z-index: 400;
    position: absolute;
    bottom: 10px;
    left: 10px;
`

const ResetButton = () => {
    const map = useMapEvents({})

    const HandleClick = () => {
        map.flyTo([44.0521, -123.0868], 13.5)
    }

    return <Wrapper>
        <Button content="Reset View" onClick={HandleClick}/>
    </Wrapper>
}

const Map = () => {
    return (
        <MapContainer center={[44.0521, -123.0868]} zoom={13.5}>
            <ResetButton />

            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                maxZoom={20}
            />

            <PersonMarker position={[44.0521, -123.0868]} numPerson={1} color="red"/>

            <PersonMarker position={[44.0421, -123.0968]} numPerson={2} color="gold"/>

            <PersonMarker position={[44.0411, -123.0768]} numPerson={3} color="green"/>

            <PersonMarker position={[44.0311, -123.0890]} numPerson={2} />

            <ProviderMarker position={[44.0311, -123.0990]} />

            <ProviderMarker position={[44.0361, -123.1090]} />
            
            <PersonMarker position={[44.0381, -123.0990]} numPerson={4} color="red" />

        </MapContainer>
    )
}

export default Map
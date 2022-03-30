import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import styled from "styled-components"
import Button from "../button/Button"

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
            
            <Marker position={[44.0521, -123.0868]}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>

        </MapContainer>
    )
}

export default Map
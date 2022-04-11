import { DivIcon, Icon, LatLngExpression } from "leaflet"
import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import styled from "styled-components"
import Button from "../../UI/button/Button"

const PersonMarker = (
    { position, numPerson=1, color=null, unsanctioned=false}: 
        { position: LatLngExpression, numPerson: number, color?: string | null, unsanctioned?: boolean }) => <>
    {color ? <Marker position={position} icon={new Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 81],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })}>
    </Marker> : null}
    <Marker position={position} icon={new Icon({
        iconUrl: require(`./assets/${unsanctioned ? "peopleRed" : "peopleRegular"}/people${numPerson}.png`),
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [40, 60],
        iconAnchor: [20, 40],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })}>
        <Popup>
            POPUP
        </Popup>
    </Marker>
</>

export default PersonMarker
import { DivIcon, Icon, LatLngExpression } from "leaflet"
import React, { useState } from "react"
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import styled from "styled-components"
import Button from "../../button/Button"

const ProviderMarker = ({ position, color = null }: { position: LatLngExpression, color?: string | null }) => <>
    {color ? <Marker position={position} icon={new Icon({
        iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 81],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })}>
        <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
    </Marker> : null}
    <Marker position={position} icon={new Icon({
        iconUrl: require(`./assets/House.png`),
        // shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [35, 40],
        iconAnchor: [17, 35],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    })}>
        <Popup>
            POPUP
        </Popup>
    </Marker>
</>

export default ProviderMarker
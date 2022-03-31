import {
    Circle,
    FeatureGroup,
    LayerGroup,
    MapContainer,
    Polyline,
    Popup,
    Rectangle,
    TileLayer,
} from 'react-leaflet'
import React, { useState } from "react"
import styled from "styled-components"
import Button from "../../button/Button"
import { LatLngExpression } from 'leaflet'


const polyline: LatLngExpression[] = [
    [44.0311, -123.0990],
    [44.0421, -123.0968],
]

const getArrowCoords = (start: LatLngExpression, end: LatLngExpression): LatLngExpression[] => {
    const offset = 0.0003
    const headsize = 0.0003

    let x2 = (end as Array<number>)[0]
    let x1 = (start as Array<number>)[0]
    let y2 = (end as Array<number>)[1]
    let y1 = (start as Array<number>)[1]

    const theta = Math.atan((y2 - y1) / (x2 - x1))

    x1 += 2 * offset * Math.cos(theta)
    y1 += 2 * offset * Math.sin(theta)
    x2 -= offset * Math.cos(theta)
    y2 -= offset * Math.sin(theta)

    const pts = [[x1, y1], [x2, y2]]

    // const magnitude = Math.sqrt((y2 - y1) ** 2 + (x2 - x1) ** 2)
    // const dTheta = Math.atan(headsize / (2 * (magnitude - headsize)))

    // pts.push(
    //     [(magnitude - headsize) * Math.cos(theta) + x1,
    //     (magnitude - headsize) * Math.sin(theta) + y1])

    // pts.push(
    //     [(magnitude - headsize) * Math.cos(theta + dTheta) + x1,
    //     (magnitude - headsize) * Math.sin(theta + dTheta) + y1])

    // pts.push(
    //     [(magnitude) * Math.cos(theta) + x1,
    //     (magnitude) * Math.sin(theta) + y1])

    // pts.push(
    //     [(magnitude - headsize) * Math.cos(theta - dTheta) + x1,
    //     (magnitude - headsize) * Math.sin(theta - dTheta) + y1])

    // pts.push(
    //     [(magnitude - headsize) * Math.cos(theta) + x1,
    //     (magnitude - headsize) * Math.sin(theta) + y1])
    
    return pts as LatLngExpression[]
}

const Arrow = ({ start, end, color="black", dashed=false }: { start: LatLngExpression, end: LatLngExpression, color?: string, dashed?: boolean }) => {
    let opt = {}
    if (dashed) opt = { color: color, weight: 3, dashArray: '2, 6', dashOffset: '0' }
    else opt = { color: color, weight: 3 }

    return <LayerGroup>
        <Polyline pathOptions={opt} positions={getArrowCoords(start, end)} />
    </LayerGroup>
}

export default Arrow
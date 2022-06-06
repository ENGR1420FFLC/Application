import { MapContainer, Marker, TileLayer, Tooltip, useMapEvents } from 'react-leaflet'
import styled from "styled-components"
import Button from "../UI/button/Button"
import LocationMarker from "./features/LocationMarker"
import { HeaderWrapper, Header } from "../textStyles/TextStyles"
import { FaPlus } from "react-icons/fa"
import Dropdown from "../UI/dropdown/Dropdown"
import React, { useState } from "react"
import AddSitePopup from "./AddSitePopup"
import ConnectionConstructor from "../../services/models/ConnectionConstructor"
import Location from "../../services/models/Location"
import { Icon, LatLngExpression, LeafletMouseEvent } from 'leaflet'
import Arrow from './features/Arrow'
import Checkbox from '../UI/checkbox/Checkbox'
import { dataType } from '../../App'

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

const UI = ({ setAdd, markerPos, setMarkerPos }: { setAdd: React.Dispatch<boolean>, markerPos: LatLngExpression, setMarkerPos: React.Dispatch<any> }) => {

    const map = useMapEvents({
        click: (e) => {
            setMarkerPos([e.latlng.lat, e.latlng.lng])
        }
    })

    const HandleClick = () => {
        map.flyTo([44.0421, -123.1018], 13)
    }

    const HandleToolTip = (e: LeafletMouseEvent) => {
        setAdd(true)
    }

    return <>
        <Wrapper>
            <Button content="Reset View" onClick={HandleClick}/>
        </Wrapper>
        <Marker position={markerPos} 
            eventHandlers={{
                click: HandleToolTip
            }}
            icon={new Icon({
                iconUrl: require(`./features/assets/Add.png`),
                iconSize: [35, 45],
                iconAnchor: [19, 38],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })}>
        </Marker>
    </>
}

const Map = ({ allData, setAllData }: { allData: dataType, setAllData: React.Dispatch<dataType>}) => {

    const [showAddSite, setShowAddSite] = useState(false)
    const [siteFilter, setSiteFilter] = useState("0")
    const empty: LatLngExpression = [0, 0]
    const [markerPos, setMarkerPos] = useState(empty)

    const addLocation = (location: Location) => {
        setAllData({...allData, locations: [...allData.locations, location]})
    }

    let locationsToShow = allData.locations
    switch(siteFilter) {
        case "1":
            locationsToShow = allData.locations.filter(l => l.expiration !== null || l.identity !== "Site")
            break
        case "2":
            locationsToShow = allData.locations.filter(l => (l.expiration === null))
            break
    }


    return (
        <>
            <HeaderWrapper>
                <Header>
                    Map
                </Header>
            </HeaderWrapper>

            <HeaderWrapper>
                <Header>
                </Header>

                Show
                <Dropdown
                    currentState={siteFilter}
                    possibleStates={[0, 1, 2]}
                    displayStates={["All", "Only unsanctioned", "Only sanctioned"]}
                    setState={setSiteFilter} />
                sites
            </HeaderWrapper>

            <AddSitePopup show={showAddSite} setShow={setShowAddSite} defaultLocation={markerPos} addLocation={addLocation} />

            <MapContainer center={[44.0421, -123.1018]} zoom={13}>
                <UI setAdd={setShowAddSite} markerPos={markerPos} setMarkerPos={setMarkerPos}/>
                <TileLayer
                    // attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
                    maxZoom={20}
                    minZoom={11}
                    
                />

                {locationsToShow.map(location => {
                    if (location.latitude && location.longitude) return <LocationMarker 
                        allData={allData} 
                        setAllData={setAllData}
                        location={location} 
                        key={location.id?.toString()} 
                        />
                    return null
                })}

                {allData.connectionConstructors.map(connection => {
                    const from = locationsToShow.find(l => l.id === connection.fromId)
                    const to = locationsToShow.find(l => l.id === connection.toId)

                    if (from && to) {
                        const start: LatLngExpression = [from.latitude, from.longitude]
                        const end: LatLngExpression = [to.latitude, to.longitude]
                        return <Arrow start={start} end={end} key={connection.id.toString()}/>
                    }
                    return null
                })}

            </MapContainer>
            <br />
            <Center>
                <Button content={<><FaPlus />Add Location</>} onClick={e => {
                    
                    setMarkerPos(empty)
                    setShowAddSite(true)
                }} />
            </Center>
            <Center><img src={require("./features/assets/Legend.png")} alt="" width={300} style={{ margin: "auto" }}/></Center>
        </>
    )
}

export default Map
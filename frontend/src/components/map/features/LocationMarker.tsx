import { Icon } from "leaflet"
import { useState } from "react"
import { Marker, Tooltip } from 'react-leaflet'
import ConnectionConstructor from "../../../services/models/ConnectionConstructor"
import Location from "../../../services/models/Location"
import LocationPopup from "../LocationPopup"

const LocationMarker = ({ location, connectionConstructors, locations, setLocations }: { location: Location, connectionConstructors: ConnectionConstructor[], locations: Location[], setLocations: React.Dispatch<Location[]> }) => {

    const [showPopup, setShowPopup] = useState(false)
    const numPerson = Math.max(Math.min(Math.round(location.numPeople / 10), 4), 1)
    const unsanctioned = location.expiration !== null

    let icon;
    switch(location.identity) {
        case "Provider": icon = new Icon({
                iconUrl: require(`./assets/House.png`),
                iconSize: [60, 60],
                iconAnchor: [30, 30],
                popupAnchor: [0, 0]
            })
            break;
        case "Site": icon = new Icon({
                iconUrl: require(`./assets/${unsanctioned ? "peopleRed" : "peopleRegular"}/people${numPerson}.png`),
                iconSize: [40, 60],
                iconAnchor: [20, 40],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
            break;
        case "Both": icon = new Icon({
                iconUrl: require(`./assets/peopleRegular/people${numPerson}.png`),
                shadowUrl: require(`./assets/House.png`),
                iconSize: [35, 40],
                iconAnchor: [17, 35],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
            break;
        default: icon = new Icon({
                iconUrl: require(`./assets/peopleRegular/people${numPerson}.png`),
                iconSize: [35, 40],
                iconAnchor: [17, 35],
                popupAnchor: [1, -34],
                shadowSize: [41, 41]
            })
            break;
    }

    return (
        <>
            <LocationPopup location={location} locations={locations} show={showPopup} setShow={setShowPopup} connectionConstructors={connectionConstructors} setLocations={setLocations}/>
            <Marker
                position={[location.latitude, location.longitude]}
                eventHandlers={{
                    click: (e: any) => {
                        setShowPopup(true)
                    }
                }}
                icon={icon}>
                <Tooltip direction="top" offset={[0, -30]}>
                    {location.name || "Unknown location"}
                </Tooltip>
            </Marker>
        </>

    )
}

export default LocationMarker
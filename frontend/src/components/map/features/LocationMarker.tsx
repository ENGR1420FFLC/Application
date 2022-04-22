import { icon, Icon } from "leaflet"
import { useState } from "react"
import { Marker, Tooltip } from 'react-leaflet'
import ConnectionConstructor from "../../../services/models/ConnectionConstructor"
import Location from "../../../services/models/Location"
import LocationPopup from "../LocationPopup"

const LocationMarker = ({ location, connectionConstructors, locations, setLocations, numConnections }: { location: Location, connectionConstructors: ConnectionConstructor[], locations: Location[], setLocations: React.Dispatch<Location[]>, numConnections: number }) => {

    const [showPopup, setShowPopup] = useState(false)
    const numPerson = Math.max(Math.min(Math.round(location.numPeople / 10), 4), 1)
    const unsanctioned = location.expiration !== null

    // provider case
    let iconProps: any = {
        iconUrl: require(`./assets/House.png`),
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [0, 0],
    };

    const help = {
        shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowSize: [15, 25],
        shadowAnchor: [7.5, 55]
    }

    switch(location.identity) {
        case "Provider":
            break
        case "Site": iconProps = {
                iconUrl: require(`./assets/${unsanctioned ? "peopleRed" : "peopleRegular"}/people${numPerson}.png`),
                iconSize: [40, 60],
                iconAnchor: [20, 40],
                popupAnchor: [1, -34],
            }
            break;
        case "Both": iconProps = {
                iconUrl: require(`./assets/peopleRegular/people${numPerson}.png`),
                shadowUrl: require(`./assets/House.png`),
                iconSize: [35, 40],
                iconAnchor: [17, 35],
                popupAnchor: [1, -34],
            }
            break;
        default: iconProps = {
                iconUrl: require(`./assets/peopleRegular/people${numPerson}.png`),
                iconSize: [35, 40],
                iconAnchor: [17, 35],
                popupAnchor: [1, -34],
            }
            break;
    }

    if (location.identity !== "Provider" && numConnections === 0) {
        iconProps = {...iconProps, ...help}
        console.log(iconProps)
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
                icon={new Icon(iconProps)}>
                <Tooltip direction="top" offset={[0, -30]}>
                    {location.name || "Unknown location"}
                </Tooltip>
            </Marker>
        </>

    )
}

export default LocationMarker
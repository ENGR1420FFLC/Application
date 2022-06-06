import { icon, Icon } from "leaflet"
import { useState } from "react"
import { Marker, Tooltip, Circle } from 'react-leaflet'
import { dataType } from "../../../App"
import ConnectionConstructor from "../../../services/models/ConnectionConstructor"
import Location from "../../../services/models/Location"
import LocationPopup from "../LocationPopup"

const LocationMarker = ({ allData, setAllData, location }: { allData: dataType, setAllData: React.Dispatch<dataType>, location: Location }) => {

    const [showPopup, setShowPopup] = useState(false)
    const numPerson = Math.max(Math.min(Math.round(location.numPeople / 10), 4), 1)
    const unsanctioned = location.expiration !== null
    const numConnections = allData.connectionConstructors.filter(c => c.fromId === location.id || c.toId === location.id).length

    // provider case
    let iconProps: any = {
        iconUrl: require(`./assets/House.png`),
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [0, 0],
    };

    const secondMarker = {
        shadowUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowSize: [15, 25],
        shadowAnchor: [7.5, 60]
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
        default: iconProps = {
            iconUrl: require(`./assets/${unsanctioned ? "peopleRed" : "peopleRegular"}/people${numPerson}.png`),
            iconSize: [40, 60],
            iconAnchor: [20, 40],
            popupAnchor: [1, -34],
        }
            break;
    }

    if (location.isFFLCPartner) {
        iconProps = {...iconProps, ...secondMarker}
    }

    return (
        <>
            {location.identity === "Site" && location.radius && location.radius > 0 && <Circle
                center={[location.latitude, location.longitude]}
                radius={1609 * location.radius / 2}
                pathOptions={{
                    color: 'red',
                    weight: 0
                }}
            >
            </Circle>}
            <LocationPopup location={location} allData={allData} setAllData={setAllData} show={showPopup} setShow={setShowPopup}/>
            <Marker
                position={[location.latitude, location.longitude]}
                eventHandlers={{
                    click: (e: any) => {
                        setShowPopup(true)
                    }
                }}
                icon={new Icon(iconProps)}>
                <Tooltip direction="top" offset={[0, -30]}>
                    {location.name || "Unnamed location"}
                </Tooltip>
            </Marker>

        </>

    )
}

export default LocationMarker
import React, { ReactElement, useEffect, useState } from 'react';
import "./App.css"
import { ThemeProvider } from 'styled-components';
import BaseTheme from './themes/BaseTheme';
import Calendar from './components/calendar/Calendar';
import Table from './components/table/Table';
import Map from './components/map/Map';
import Navbar from './components/navbar/Navbar';
import ContentWrapper from './components/ContentWrapper';
import { Pages } from './Pages';
import Location from './services/models/Location';
import Connection from './services/models/Connection';
import Service from './services/Service';
import ConnectionConstructor from './services/models/ConnectionConstructor';


const App = () => {

    const [currentPage, setCurrentPage] = useState(Pages.MAP)

    const emptyLocations: Location[] = []
    const [locations, setLocations] = useState(emptyLocations)

    const emptyConnectionConstructors: ConnectionConstructor[] = []
    const [connectionConstructors, setConnectionConstructors] = useState(emptyConnectionConstructors)

    useEffect(() => {
        Service.getAllLocations()
            .then((data: Location[]) => {
                console.log(data)
                setLocations(data)
            })
        Service.getAllConnectionConstructors()
            .then((data: ConnectionConstructor[]) => setConnectionConstructors(data))
    }, [])
    
    console.log(locations)

    // CONTENT STUFF VVV

    let content: ReactElement = <div>"404 Page not found"</div>

    switch(currentPage) {
        case Pages.MAP:
            content = <Map
                setLocations={setLocations}
                connectionConstructors={connectionConstructors}
                locations={locations}
            />
            break
        case Pages.CONNECTIONS:
            content = <Table 
                setLocations={setLocations}
                name="Connections" 
                connectionConstructors={connectionConstructors}
                setConnectionConstructors={setConnectionConstructors}
                locations={locations}/>
            break
        case Pages.CALENDAR:
            content = <Calendar 
                setLocations={setLocations}
                connectionConstructors={connectionConstructors}
                locations={locations}
                />
            break
    }

    return (
        <ThemeProvider theme={BaseTheme}>
            <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <ContentWrapper>{content}</ContentWrapper>
        </ThemeProvider>
    )
}

export default App;

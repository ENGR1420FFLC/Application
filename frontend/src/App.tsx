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


const App = () => {

    const [currentPage, setCurrentPage] = useState(Pages.MAP)

    const emptyLocations: Location[] = []
    const [locations, setLocations] = useState(emptyLocations)
    const [myLocation, setMyLocation] = useState(null)

    const emptyConnections: Connection[] = []
    const [connections, setConnections] = useState(emptyConnections)

    useEffect(() => {
        //
    }, [])
    

    // CONTENT STUFF VVV

    let content: ReactElement = <div>"404 Page not found"</div>

    switch(currentPage) {
        case Pages.MAP:
            content = <Map/>
            break
        case Pages.CONNECTIONS:
            content = <Table key="i" name="Connections" connections={connections} myLocation={myLocation}/>
            break
        case Pages.CALENDAR:
            content = <Calendar connections={connections}/>
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

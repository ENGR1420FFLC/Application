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

export type dataType = {
    locations: Location[],
    connectionConstructors: ConnectionConstructor[]
}

const emptyData: dataType = {
    locations: [],
    connectionConstructors: []
}

const App = () => {

    const [allData, setAllData] = useState(emptyData)
    const [currentPage, setCurrentPage] = useState(Pages.MAP)

    useEffect(() => {
        Service.getAllLocations()
            .then((loc: Location[]) => {
                Service.getAllConnectionConstructors()
                    .then((con: ConnectionConstructor[]) => setAllData({ locations: loc, connectionConstructors: con }))
            })
    }, [])
    
    // CONTENT STUFF VVV
    let content: ReactElement = <div>"404 Page not found"</div>

    switch(currentPage) {
        case Pages.MAP:
            content = <Map allData={allData} setAllData={setAllData}/>
            break
        case Pages.CONNECTIONS:
            content = <Table allData={allData} setAllData={setAllData}/>
            break
        case Pages.CALENDAR:
            content = <Calendar allData={allData} setAllData={setAllData} />
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

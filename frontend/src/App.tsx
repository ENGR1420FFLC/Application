import React, { ReactElement, useState } from 'react';
import "./App.css"
import { ThemeProvider } from 'styled-components';
import BaseTheme from './themes/BaseTheme';

import Calendar from './components/calendar/Calendar';
import Inventory from './components/inventory/Inventory';
import Map from './components/map/Map';

import Navbar from './components/navbar/Navbar';
import ContentWrapper from './components/ContentWrapper';
import { Pages } from './Pages';


const App = () => {

    const [currentPage, setCurrentPage] = useState(Pages.MAP)

    let content: ReactElement = <div>"404 Page not found"</div>

    switch(currentPage) {
        case Pages.MAP:
            content = <Map/>
            break
        case Pages.INVENTORY:
            content = <Inventory/>
            break
        case Pages.NEEDS:
            content = <div>"NEEDS PAGE"</div>
            break
        case Pages.CALENDAR:
            content = <Calendar/>
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

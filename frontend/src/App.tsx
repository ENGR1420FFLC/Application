import React, { ReactElement, useEffect, useState } from 'react';
import "./App.css"
import { ThemeProvider } from 'styled-components';
import BaseTheme from './themes/BaseTheme';

import Calendar from './components/calendar/Calendar';
import Inventory from './components/inventory/Inventory';
import Map from './components/map/Map';

import Navbar from './components/navbar/Navbar';
import ContentWrapper from './components/ContentWrapper';
import { Pages } from './Pages';
import Service from './services/Service';
import Have from './services/models/Have';
import mongoose from 'mongoose';
import Needs from './components/needs/Needs';
import Need from './services/models/Need';


const App = () => {

    const [currentPage, setCurrentPage] = useState(Pages.INVENTORY)
    const [allHaves, setAllHaves] = useState(new Array<Have>())
    const [allNeeds, setAllNeeds] = useState(new Array<Need>())
    console.log(allHaves)
    const [myLocation, setMyLocation] = useState(new mongoose.Types.ObjectId())

    useEffect(() => {

        for (let i = 1; i < 10; i++) {
            Service.addHave(`Meal ${i}`, Math.round(Math.random() * 100), new Date(`2022-4-${i}`), new mongoose.Types.ObjectId(), (Math.random() > 0.5))
        }

        Service
            .addHave("1 Meal", 100, new Date("2022-3-30"), myLocation)
            .then(res => Service.addHave("2 Meal", 90, new Date("2022-3-31"), myLocation, true))
            .then(res => Service.getAllHaves())
            .then(res => setAllHaves(res))
            .catch(err => {
                console.log(`Something went wrong...`)
            })
    }, [])
    


    // CONTENT STUFF VVV

    let content: ReactElement = <div>"404 Page not found"</div>

    switch(currentPage) {
        case Pages.MAP:
            content = <Map/>
            break
        case Pages.INVENTORY:
            content = <Inventory allHaves={allHaves} setAllHaves={setAllHaves} userLocation={myLocation}/>
            break
        case Pages.NEEDS:
            content = <Needs allNeeds={allNeeds} setAllNeeds={setAllNeeds} userLocation={myLocation}/>
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

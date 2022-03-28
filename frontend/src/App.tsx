import React from 'react';
import "./App.css"
import { ThemeProvider } from 'styled-components';
import Calendar from './components/calendar/Calendar';
import BaseTheme from './themes/BaseTheme';

const App = () => {
    return (
        <div>
            <ThemeProvider theme={BaseTheme}>
                Hello world
                <Calendar/>
            </ThemeProvider>
        </div>
    )
}

export default App;

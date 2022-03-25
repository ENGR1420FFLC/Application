import axios from "axios";
import { resolve } from "path";

class CalendarEvent {
    name: string
    date: Date
    createdBy: string
    constructor(name: string, date: Date, createdBy: string) {
        this.name = name
        this.date = date
        this.createdBy = createdBy
    }
}

const getEvents = (start=new Date(), end=new Date()): Promise<Array<CalendarEvent>> => {

    const events = [
        new CalendarEvent("Event 1", new Date("March 26, 2022 14:00"), "User 1"),
        new CalendarEvent("Event 2", new Date("March 26, 2022 16:00"), "User 2"),
        new CalendarEvent("Event 3", new Date("March 27, 2022 17:00"), "User 3"),
    ]

    return new Promise((r): Array<CalendarEvent> => resolve(events))
}

const CalendarService = { getEvents }

export default CalendarService
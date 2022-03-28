import CalendarEvent from "../components/calendar/CalendarEvent"

const getEvents = (start=new Date(), end=new Date()): Promise<Array<CalendarEvent>> => {

    return new Promise<Array<CalendarEvent>> ((resolve, reject) => {
        const events = [
            new CalendarEvent("Event 1", new Date("March 26, 2022 14:00"), "User 1"),
            new CalendarEvent("Event 2", new Date("March 26, 2022 16:00"), "User 2"),
            new CalendarEvent("Event 3", new Date("March 27, 2022 17:00"), "User 3"),
        ]

        resolve(events)
    })
}

const CalendarService = { getEvents }

export default CalendarService
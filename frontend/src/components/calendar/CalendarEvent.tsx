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

export default CalendarEvent
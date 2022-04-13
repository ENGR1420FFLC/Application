type ConnectionForm = {
    fromId: string
    toId: string
    name: string
    description: string
    days: [boolean, boolean, boolean, boolean, boolean, boolean, boolean]
    allergenInformation: string
}

export default ConnectionForm
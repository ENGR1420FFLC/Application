import React, { useEffect, useState } from "react";
import Button from "../UI/button/Button";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import styled from "styled-components";
import Dropdown from "../UI/dropdown/Dropdown";
import Input from "../UI/input/Input";
import Service from "../../services/Service";
import Location from "../../services/models/Location";
import RRule from "rrule";
import Checkbox from "../UI/checkbox/Checkbox";
import { Days } from "rrule/dist/esm/src/rrule";
import ConnectionForm from "../../services/models/ConnectionForm";
import Connection from "../../services/models/Connection";
import ConnectionConstructor from "../../services/models/ConnectionConstructor";

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    font-family: ${p => p.theme.bodyFontFamily};
    gap: 10px;
`

const Row = styled.div`
    padding-left: 5px;
    display: flex;
    gap: 10px;
    align-items: center;
`

const Field = styled.div`
    display: flex;
    gap: 5px;
    width: 200px;
`

const RowRight = styled(Row)`
    justify-content: flex-end;
`

const Heading = styled.div`
    font-size: 1.2em;
    font-weight: 800;
    margin-bottom: 10px;
`

const R = styled.div`
    font-weight: 800;
    color: red;
`
const Required = () => <R>*</R>

type PropTypes = { 
    show: boolean
    locations: Location[]
    setShow: React.Dispatch<boolean> 
    addConnection: (connection: ConnectionConstructor) => void
}

const AddConnectionPopup = ({ locations, show, setShow, addConnection }: PropTypes) => {

    const displayLocations = locations.filter(l => l.latitude && l.longitude)

    const defaultData: ConnectionForm = {
        fromId: "",
        toId: "",
        name: "",
        description: "",
        allergenInformation: "",
        days: [false, false, false, false, false, false, false]
    }

    const [data, setData] = useState(defaultData)

    useEffect(() => {
        setData(defaultData)
    }, [show])

    const isValid = data.fromId !== "" &&
        data.toId !== "" &&
        data.name !== "" &&
        data.days.find(d => d)

    const HandleSubmit = () => {
        Service.addConnection(data)
            .then(data => {
                console.log(data)
                addConnection(data)
                setShow(false)
            })
    }

    const setDayConstructor = (day: number) => {

        return (value: boolean) => {
            const newDays = data.days
            newDays[day] = value
            setData({
                ...data, days: newDays 
            })
        }
    }

    const content = <Wrapper>
        <Row>
            <Field>
                <Required /> Name:
            </Field>
            <Input
                value={data.name}
                setValue={e => setData({ ...data, name: e })}
                placeholder="..." />
        </Row>
        <Row>
            <Field>
                <Required /> From:
            </Field>
            <Dropdown
                currentState={data.fromId}
                possibleStates={[null, ...displayLocations.filter(l => l.identity !== "Site").map(l => l.id?.toString())]}
                displayStates={["Select...", ...displayLocations.filter(l => l.identity !== "Site").map(l => (l.name + " " + l.latitude.toString().slice(0, 3) + "," + l.longitude.toString().slice(0, 3)))]}
                setState={e => setData({ ...data, fromId: e })} />
        </Row>
        <Row>
            <Field>
                <Required /> To:
            </Field>
            <Dropdown
                currentState={data.toId}
                possibleStates={[null, ...displayLocations.filter(l => l.identity !== "Provider").map(l => l.id?.toString())]}
                displayStates={["Select...", ...displayLocations.filter(l => l.identity !== "Provider").map(l => (l.name + " " + l.latitude.toString().slice(0, 3) + "," + l.longitude.toString().slice(0, 3)))]}
                setState={e => setData({ ...data, toId: e })} />
        </Row>
        <Row>
            <Field><Required />Days of week:</Field> 
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => 
                <Checkbox key={day} value={data.days[i]} setValue={setDayConstructor(i)} content={day}/>)}
        </Row>
        <Row>
            <Field>Description:</Field> <Input value={data.description} setValue={e => setData({ ...data, description: e })} placeholder="..." />
        </Row>
        <Row>
            <Field>Allergen Info:</Field> <Input value={data.allergenInformation} setValue={e => setData({ ...data, allergenInformation: e })} placeholder="..." />
        </Row>
        <RowRight>
            <R>* Required</R>
            <Button content={"Cancel"} onClick={() => setShow(false)} />
            <Button content={"Add Connection"} onClick={HandleSubmit} selected disabled={!isValid} />
        </RowRight>
    </Wrapper>

    
    return <PopupMsg title="Add Connection" content={content} show={show} setShow={setShow} />
}

export default AddConnectionPopup
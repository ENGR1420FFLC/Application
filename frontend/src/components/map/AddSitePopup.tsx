import React, { useEffect, useState } from "react";
import Button from "../UI/button/Button";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import styled from "styled-components";
import Dropdown from "../UI/dropdown/Dropdown";
import Input from "../UI/input/Input";
import Service from "../../services/Service";
import Location from "../../services/models/Location";
import { ObjectID } from "bson";

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

type PropTypes = { show: boolean, setShow: React.Dispatch < boolean >, defaultLocation: number[], addLocation: (location: Location) => void }

const AddSitePopup = ({ show, setShow, defaultLocation, addLocation }: PropTypes) => {

    const fromMarker = defaultLocation[0] !== 0 && defaultLocation[1] !== 0
    const defaultData = {
        name: "",
        numPeople: 10,
        expiration: -1,
        description: "",
        address: "",
        identity: "Site",
        daysOfOperation: "",
        isPartner: false,
        weeklyNeeds: [1, 1, 1, 1],
        radius: 0
    }

    const [data, setData] = useState(defaultData)

    useEffect(() => {
        setData(defaultData)
    }, [show])
    

    const HandleSubmit = () => {

        // const nl = {
        //     id: null,
        //     latitude: defaultLocation[0],
        //     longitude: defaultLocation[1],
        //     numPeople: data.numPeople,
        //     expiration: data.expiration,
        //     identity: data.identity,
        //     radius: data.radius,
        //     name: data.name,
        // }
        // addLocation(nl)

        Service.addLocation({
            latitude: defaultLocation[0],
            longitude: defaultLocation[1],
            numPeople: data.numPeople,
            expiration: data.expiration,
            identity: data.identity,
            radius: data.radius,
            weeklyNeeds: data.weeklyNeeds,
            name: data.name,
            isFFLCPartner: data.isPartner,
            id: null
        })
        .then(newLocation => addLocation(newLocation))
        setShow(false)
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
                <Required/> Address:
            </Field> 
            <Input 
                value={fromMarker ? "Using marker" : data.address} 
                setValue={e => setData({ ...data, address: e })} 
                disabled={fromMarker}
                placeholder="..." />

            {!fromMarker && <Button content={"Use current location"} onClick={() => null} />}
        </Row>
        <Row>
            <Field>
                <Required /> Type:
            </Field> 
            <Dropdown 
                currentState={data.identity} 
                possibleStates={["Site", "Provider", "Both", "Unknown"]}
                displayStates={["Site", "Provider", "Both", "Unknown"]} 
                setState={e => setData({ ...data, identity: e })}/>
        </Row>
        {data.identity === "Site" && <Row>
            <Field>
                <Required />
                Expiration:
            </Field> 
            <Dropdown
                currentState={data.expiration}
                possibleStates={[-1, 1, 4, 7, 30]}
                displayStates={["Does not expire (sanctioned)", "1 day (unsanctioned)", "4 days (unsanctioned)", "1 week (unsanctioned)", "1 month (unsanctioned)"]}
                setState={e => setData({ ...data, expiration: e })} />
        </Row>}
        {data.identity !== "Provider" && <Row>
            <Field>Estimated # of people:</Field> <Dropdown
                currentState={data.numPeople}
                possibleStates={[10, 20, 30, 40]}
                displayStates={["Less than 10", "20", "30", "More than 40"]}
                setState={e => setData({ ...data, numPeople: e })} />
        </Row>}
        {data.identity !== "Provider" && <>
            {data.weeklyNeeds.map((w, i) => <Row><Field>Week {i + 1} need:</Field> <Dropdown
                currentState={data.weeklyNeeds[i]}
                possibleStates={[0.5, 1, 1.5]}
                displayStates={["Less", "Normal amount", "More"]}
                setState={e => {
                    const newNeeds = data.weeklyNeeds.slice()
                    newNeeds[i] = e
                    setData({ ...data, weeklyNeeds: newNeeds })
                }} /></Row>)}
        </>}
        {data.identity !== "Provider" && <Row>
            <Field>Approximate area:</Field> <Dropdown
                currentState={data.radius}
                possibleStates={[0, 0.25, 0.5, 1]}
                displayStates={["Exact", "Within quarter mile", "Within half mile", "Within a mile"]}
                setState={e => setData({ ...data, radius: e })} />
        </Row>}
        <Row>
            <Field>Days of operation:</Field> <Input value={data.description} setValue={e => setData({ ...data, description: e })} placeholder="..." />
        </Row>
        <Row>
            <Field>Description:</Field> <Input value={data.description} setValue={e => setData({...data, description: e})} placeholder="..."/>
        </Row>
        <Row>
            <Field>FFLC Partner:</Field> <Dropdown
                currentState={data.isPartner}
                possibleStates={[false, true]}
                displayStates={["NO", "YES"]}
                setState={e => setData({ ...data, isPartner: e })} />
        </Row>
        <RowRight>
            <R>* Required</R>
            <Button content={"Cancel"} onClick={() => setShow(false)} />
            <Button content={"Add Site"} onClick={HandleSubmit} selected disabled={data.address === "" && data.name === ""}/>
        </RowRight>
    </Wrapper>

    return <PopupMsg title="Add Location" content={content} show={show} setShow={setShow} />
}

export default AddSitePopup
import React, { useEffect, useState } from "react";
import Button from "../UI/button/Button";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import styled from "styled-components";
import Dropdown from "../UI/dropdown/Dropdown";
import Input from "../UI/input/Input";
import Service from "../../services/Service";
import Location from "../../services/models/Location";

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

    const [data, setData] = useState({
        name: "",
        numPeople: 10,
        expiration: -1,
        description: "",
        address: "",
        identity: "Site",
        daysOfOperation: "",
        isPartner: "NO"
    })

    useEffect(() => {
        setData({
            name: "",
            numPeople: 10,
            expiration: -1,
            description: "",
            address: "",
            identity: "Site",
            daysOfOperation: "",
            isPartner: "NO"
        })
    }, [show])
    

    const HandleSubmit = () => {

        Service.addLocation({
            latitude: defaultLocation[0],
            longitude: defaultLocation[1],
            numPeople: data.numPeople,
            expiration: data.expiration,
            identity: data.identity,
            name: data.name,
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
        <Row>
            <Field>Days of operation:</Field> <Input value={data.description} setValue={e => setData({ ...data, description: e })} placeholder="..." />
        </Row>
        <Row>
            <Field>Description:</Field> <Input value={data.description} setValue={e => setData({...data, description: e})} placeholder="..."/>
        </Row>
        <Row>
            <Field>FFLC Partner:</Field> <Dropdown
                currentState={data.isPartner}
                possibleStates={["NO", "YES"]}
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
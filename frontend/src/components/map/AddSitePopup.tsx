import React, { useState } from "react";
import Button from "../UI/button/Button";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import styled from "styled-components";
import Dropdown from "../UI/dropdown/Dropdown";
import Input from "../UI/input/Input";

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

const AddSitePopup = ({ show, setShow }: { show: boolean, setShow: React.Dispatch<boolean>}) => {

    const [data, setData] = useState({
        name: "",
        numPeople: "Less than 10",
        expiration: "Does not expire",
        description: "",
        address: "",
        identity: "Site",
        daysOfOperation: "",
        isPartner: "NO"
    })

    const content = <Wrapper>
        <Heading>
            Location Details
        </Heading>
        <Row>
            <Field>
                <Required/> Address:
            </Field> 
            <Input 
                value={data.address} 
                setValue={e => setData({ ...data, address: e })} 
                placeholder="..." />

            <Button content={"Use current location"} onClick={() => null} />
        </Row>
        <Row>
            <Field>
                <Required /> Type:
            </Field> 
            <Dropdown 
                currentState={data.identity} 
                possibleStates={["Site", "Provider", "Both", "Unknown"]} 
                setState={e => setData({ ...data, identity: e })}/>
        </Row>
        {data.identity === "Site" && <Row>
            <Field>
                <Required />
                Expiration:
            </Field> 
            <Dropdown
                currentState={data.expiration}
                possibleStates={["Does not expire (sanctioned)", "1 day (unsanctioned)", "4 days (unsanctioned)", "1 week (unsanctioned)", "1 month (unsanctioned)"]}
                setState={e => setData({ ...data, expiration: e })} />
        </Row>}
        {data.identity !== "Provider" && <Row>
            <Field>Estimated # of people:</Field> <Dropdown
                currentState={data.numPeople}
                possibleStates={["Less than 10", "20", "30", "More than 40"]}
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
                setState={e => setData({ ...data, isPartner: e })} />
        </Row>
        <RowRight>
            <R>* Required</R>
            <Button content={"Cancel"} onClick={() => setShow(false)} />
            <Button content={"Add Site"} onClick={() => null} selected disabled={data.address === ""}/>
        </RowRight>
    </Wrapper>

    return <PopupMsg title="Add Location" content={content} show={show} setShow={setShow} />
}

export default AddSitePopup
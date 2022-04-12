import React from "react";
import PopupMsg from "../UI/popupmsg/PopupMsg";
import Location from "../../services/models/Location"
import styled from "styled-components"
import Button from "../UI/button/Button";
import { FaPen } from "react-icons/fa";

const Wrapper = styled.div`
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    gap: 5px;
`

const RowWrapper = styled.div`
    display: flex;
    gap: 10px;
`
const Field = styled.div`
    color: ${p => p.theme.accentColor};
    font-weight: 800;
`
const Row = ({ name, value }: { name: string, value: string }) => <RowWrapper>
    {name}: <Field>{value}</Field>
</RowWrapper>

const Right = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
`

type PropTypes = { location: Location, show: boolean, setShow: React.Dispatch<boolean> }

const LocationPopup = ({ location, show, setShow }: PropTypes) => {

    const locationContent = <Wrapper>
        <Row name="Description" value="No Description Provided..." />
        <Row name="Type" value={location.identity} />
        <Row name="Number of people" value={(Math.round(location.num_people) || "N/A").toString()}/>
        <Row name="Location" value={Math.round(location.longitude).toString() + ", " + Math.round(location.latitude).toString()} />
        <Row name="Days of operation" value={"Tu, Th, Su"} />
        <Row name="Is FFLC partner" value={"YES"} />
        <Right>
            <Button content={<>Edit<FaPen/></>} onClick={() => null}/>
        </Right>
    </Wrapper>

    return <PopupMsg content={locationContent} title={location.name} show={show} setShow={setShow}/>
}

export default LocationPopup
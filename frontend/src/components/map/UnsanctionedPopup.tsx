import React from "react";
import Button from "../button/Button";
import PopupMsg from "../popupmsg/PopupMsg";
import styled from "styled-components";
import Dropdown from "../dropdown/Dropdown";

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

const RowRight = styled(Row)`
    justify-content: flex-end;
`

const Heading = styled.div`
    font-size: 1.2em;
    font-weight: 800;
    margin-bottom: 10px;
`

const UnsanctionedPopup = ({ show, setShow }: { show: boolean, setShow: React.Dispatch<boolean>}) => 
<PopupMsg title="Add Unsanctioned Site" content={
    <Wrapper>
        <Heading>
            Site Details
        </Heading>
        <Row>
            Location: <Button content={"Use current location"} onClick={() => null} />
        </Row>
        <Row>
            Est. # of people: <Dropdown currentState={"10-20"} possibleStates={[""]} setState={() => null}/>
        </Row>
        <Row>
            Expiration: <Dropdown currentState={"24 hr"} possibleStates={[""]} setState={() => null} />
        </Row>
        <Row>
            Notes: <Button content={"Add a note..."} onClick={() => null} />
        </Row>
        <RowRight>
            <Button content={"Cancel"} onClick={() => null} />
            <Button content={"Add Site"} onClick={() => null} selected />
        </RowRight>
    </Wrapper>
} show={show} setShow={setShow} />

export default UnsanctionedPopup
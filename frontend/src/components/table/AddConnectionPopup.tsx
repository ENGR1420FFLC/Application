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

type PropTypes = { show: boolean, setShow: React.Dispatch<boolean>, content: React.ReactElement }

const AddConnectionPopup = ({ show, setShow, content }: PropTypes) => {

    return <PopupMsg title="Add Location" content={content} show={show} setShow={setShow} />
}

export default AddConnectionPopup
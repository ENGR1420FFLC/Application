import React from "react"
import styled from "styled-components"
import Have from "../../services/models/Have"
import Button from "../button/Button"
import { FaTrash, FaPhoneAlt } from "react-icons/fa"
import { ImLoop2 } from "react-icons/im"
import BaseTheme from "../../themes/BaseTheme"

const ItemWrapper = styled.div(({ theme, selected }: { theme:any, selected: boolean}) => `
    font-family: ${theme.bodyFontFamily};
    display: grid;
    grid-template-columns: 75px 100px 150px 75px auto 125px 75px 50px;
    grid-gap: 5px;
    border: 1px solid ${selected ? theme.accentColor : theme.complementColor};
    border-radius: 5px;
    padding: 10px;
`)

const Field = styled.div`
    color: ${p => p.theme.textColor};
    display: flex;
    align-items: center;
    overflow: hidden;
    margin-right: 10px;
    position: relative;

    /* &:before {
        z-index: 0;
        content:'';
        width:100%;
        height:100%;
        position:absolute;
        left:0;
        top:0;
        background: linear-gradient(to left, white, transparent 10px);
    } */
`

const DeleteWrapper = styled.div`
    justify-self: end;
`

const Status = styled.div(({ status }: { status: String }) => `
    background-color: ${status === "FULFILLED" ? BaseTheme.validColor
        : status === "MATCHED" ? BaseTheme.midColor
            : BaseTheme.invalidColor
    };

    color: ${status === "FULFILLED" ? BaseTheme.invertedTextColor
        : status === "MATCHED" ? BaseTheme.textColor
        : BaseTheme.invertedTextColor
    };

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    font-size: 0.7em;
    justify-self: start;
    align-self: center;
    padding: 5px;
`)

const Gap = styled.div`display: flex; gap: 5px; align-items: center;`

const HaveItem = ({ have, remove, isUser }: { have: Have, remove: () => void, isUser: boolean }) => {
    return <ItemWrapper selected={isUser}>
        <Field>{isUser ? "" : <Button content={"Request"} onClick={remove} small/>}</Field>

        <Field><Button content={
            <Gap>
                <FaPhoneAlt/>
                {have.location.toString().substring(have.location.toString().length - 5)}
            </Gap>
            } onClick={remove} small /></Field>

        <Field><Gap>{have.recurring ? <ImLoop2 /> : ""} {have.name}</Gap></Field>
        <Field>{have.amount}</Field>
        <Field>{have.description}</Field>
        <Field>{have.expiration.toLocaleDateString('en-US')}</Field>

        <Status status={have.status}>{have.status}</Status>

        <DeleteWrapper>
            <Button content={<FaTrash />} onClick={remove} color={BaseTheme.invalidColor} />
        </DeleteWrapper>
    </ItemWrapper>
}

export default HaveItem
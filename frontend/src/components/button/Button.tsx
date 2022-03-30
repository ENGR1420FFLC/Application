import React from "react"
import styled from "styled-components"

type WrapperTypes = {
    theme: any,
    selected: boolean
}

const ButtonWrapper = styled.div(({ theme, selected }: { theme: any, selected: boolean}) => `
    background-color: ${selected ? theme.accentColor : theme.neutralColor};
    color: ${selected ? theme.neutralColor : theme.accentColor};
    padding: 10px;
    border-radius: 5px;
    border: 1px solid ${selected ? theme.accentColor : theme.complementColor};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: inherit;
    box-sizing: border-box;
    user-select: none;

    &:hover {
        box-sizing: border-box;
        border: 1px solid ${theme.accentColor};
        cursor: pointer;
    }
`)


type PropTypes = {
    content: any
    onClick: () => void
    selected?: boolean
}

const Button = ({ content, onClick, selected }: PropTypes) => <ButtonWrapper onClick={onClick} selected={selected || false}>
    {content}
</ButtonWrapper>

export default Button
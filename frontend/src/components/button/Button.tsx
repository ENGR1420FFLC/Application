import React from "react"
import styled from "styled-components"

interface ButtonTypes {
    theme: any
    color: string
    small: boolean
    selected: boolean
    disabled: boolean
}

const ButtonWrapper = styled.div`
    background-color: ${(p: ButtonTypes) => p.disabled ? p.theme.complementColor : (p.selected ? p.theme.accentColor : p.theme.neutralColor)};
    color: ${(p: ButtonTypes) => p.selected ? 
            (p.theme.neutralColor) : 
            (p.color ? p.color : p.theme.accentColor)
        };
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid ${(p: ButtonTypes) => p.selected ? p.theme.accentColor : p.theme.complementColor};
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${(p: ButtonTypes) => p.small ? "0.8em" : "1em"};
    box-sizing: border-box;
    user-select: none;
    font-family: ${(p: ButtonTypes) => p.theme.bodyFontFamily};

    &:hover {
        box-sizing: border-box;
        border: 1px solid ${(p: ButtonTypes) => p.disabled ? p.theme.complementColor : (p.color ? p.color : p.theme.accentColor) };
        cursor: ${(p: ButtonTypes) => p.disabled ? "not-allowed" : "pointer"};
    }
`


type PropTypes = {
    content: any
    onClick: () => void
    selected?: boolean
    color?: any
    small?: boolean
    disabled?: boolean
}

const Button = ({ content, onClick, selected, color, small, disabled }: PropTypes) => 
<ButtonWrapper 
    onClick={disabled ? () => null : onClick} 
    selected={selected || false} 
    color={color} 
    small={small || false} 
    disabled={disabled || false}>
    {content}
</ButtonWrapper>

export default Button
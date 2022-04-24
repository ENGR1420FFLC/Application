import { ReactElement } from "react";
import styled from "styled-components";

const Wrapper = styled.div(({ theme, selected }: { theme: any, selected: boolean }) => `
    padding: 5px;
    border: 1px solid ${selected ? theme.accentColor : theme.complementColor};
    background-color: ${selected ? theme.accentColor : "none"};
    color: ${selected ? theme.invertedTextColor : theme.textColor};
    display: flex;
    gap: 5px;
    position: relative;
    font-size: 0.85em;
    height: 40px;
    padding: 5px;
    box-sizing: border-box;
    text-transform: uppercase;
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        border: 1px solid ${theme.accentColor};
    }
`)

interface SliderThumbTypes {
    theme: any
    color: string
    selected: boolean
}

type PropTypes = {
    value: boolean
    setValue: React.Dispatch<boolean>
    content: ReactElement | string
}

const Checkbox = ({ value, setValue, content }: PropTypes) => {
    return <Wrapper onClick={() => setValue(!value)} selected={value}>
        {content}
    </Wrapper>
}

export default Checkbox
import React from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa"

const DropDownWrapper = styled.div`

    color: ${p => p.theme.accentColor};
    padding: 0.5em;
    border-radius: 5px;
    border: 1px solid ${p => p.theme.complementColor};

    font-size: "1em";
    box-sizing: border-box;
    user-select: none;
    font-family: ${p => p.theme.bodyFontFamily};

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &:hover {
        box-sizing: border-box;
        border: 1px solid ${p => p.theme.accentColor};
    }
`

const Dropdown = ({ currentState, possibleStates, setState }: { currentState: any, possibleStates: any[], setState: React.Dispatch<any> }) => {
    
    
    
    return(
        <DropDownWrapper>
            {currentState}
            <FaAngleDown/>
        </DropDownWrapper>
    )
}

export default Dropdown
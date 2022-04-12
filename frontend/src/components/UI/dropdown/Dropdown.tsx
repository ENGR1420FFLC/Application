import React from "react";
import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa"

const DropDownWrapper = styled.select`

    color: ${p => p.theme.accentColor};
    height: 40px;
    padding-left: 10px;
    border: none;

    font-size: 1em;
    box-sizing: border-box;
    user-select: none;
    font-family: ${p => p.theme.bodyFontFamily};

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    &:focus {
        outline: none;
    }
`

const BoxWrapper = styled.div`
    border: 1px solid ${p => p.theme.complementColor};
    cursor: pointer;
    padding-right: 10px;
    box-sizing: border-box;

    &:hover {
        border: 1px solid ${p => p.theme.accentColor};
    }
`

const Dropdown = ({ currentState, possibleStates, setState }: { currentState: any, possibleStates: any[], setState: React.Dispatch<any> }) => {
    return(
        <BoxWrapper>
            <DropDownWrapper value={currentState} onChange={e => setState(e.target.value)}>
                {/* {currentState}
                <FaAngleDown/> */}
                {possibleStates.map(p => <option value={p} key={p}>{p.toString()}</option>)}
            </DropDownWrapper>
        </BoxWrapper>
    )
}

export default Dropdown
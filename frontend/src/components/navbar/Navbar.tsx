import React from "react";
import styled from "styled-components";
import { Pages } from "../../Pages";
import { Heading } from "../textStyles/TextStyles";
import Button from "../UI/button/Button"

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    font-family: ${p => p.theme.bodyFontFamily};
    position: absolute;
    right: 60px;
    bottom: -1px;
`

const NavHeading = styled(Heading)`
    bottom: 5px;
    left: 50px;
    position: absolute;
    font-weight: 800;
    font-size: 1.75em;
`

const NavWrapper = styled.div`
    width: 100%;
    height: 75px;
    margin-bottom: 75px;
    border-bottom: 1px solid ${p => p.theme.complementColor};
    box-sizing: border-box;
    position: relative;
`

type PropTypes = {
    currentPage: Pages
    setCurrentPage: React.Dispatch<Pages>
}



const Navbar = ({ currentPage, setCurrentPage }: PropTypes) => {

    return( 
        <NavWrapper>
            <NavHeading>FFLC Partner Information System</NavHeading>
            <ButtonWrapper>
                <Button content="Map" onClick={() => setCurrentPage(Pages.MAP)} selected={currentPage === Pages.MAP}/>
                <Button content="Calendar" onClick={() => setCurrentPage(Pages.CALENDAR)} selected={currentPage === Pages.CALENDAR} />
                <Button content="Connections" onClick={() => setCurrentPage(Pages.CONNECTIONS)} selected={currentPage === Pages.CONNECTIONS}/>
            </ButtonWrapper>
        </NavWrapper>
    )
}

export default Navbar
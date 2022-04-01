import React, { ReactElement } from "react";
import styled from "styled-components";
import { Pages } from "../../Pages";
import Button from "../button/Button"
import ProfileIcon from "./ProfileIcon";

const ButtonWrapper = styled.div`
    display: flex;
    gap: 10px;
    font-family: ${p => p.theme.bodyFontFamily};
    position: absolute;
    right: 5%;
    bottom: calc(-0.5em - 10px);
`

const ImageWrapper = styled.div`
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
`

const Image = styled.img`
    width: 100%;
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
            <ProfileIcon/>
            <ImageWrapper>
                <Image src={require("./Header.jpg")} alt="" />
            </ImageWrapper>
            <ButtonWrapper>
                <Button content="Map" onClick={() => setCurrentPage(Pages.MAP)} selected={currentPage === Pages.MAP}/>
                <Button content="Calendar" onClick={() => setCurrentPage(Pages.CALENDAR)} selected={currentPage === Pages.CALENDAR} />
                <Button content="Inventory" onClick={() => setCurrentPage(Pages.INVENTORY)} selected={currentPage === Pages.INVENTORY}/>
                <Button content="Needs" onClick={() => setCurrentPage(Pages.NEEDS)} selected={currentPage === Pages.NEEDS}/>
            </ButtonWrapper>
        </NavWrapper>
    )
}

export default Navbar
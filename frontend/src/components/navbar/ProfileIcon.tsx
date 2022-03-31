import React from "react";
import styled from "styled-components";

const ImageWrapper = styled.div`
    position: absolute;
    left: 5%;
    bottom: -50px;
    width: 100px;
    height: 100px;
    border-radius: 100%;
    border: 1px solid ${p => p.theme.complementColor};
    box-sizing: border-box;
    overflow: hidden;
`

const Image = styled.img`
    width: 100%;
`
const Motd = styled.div`
    position: absolute;
    top: 80px;
    left: 160px;
    z-index: 999;
    font-family: ${p => p.theme.bodyFontFamily};
    color: ${p => p.theme.textColor};
`

const ProfileIcon = () => <>
    <ImageWrapper>
        <Image src={require("./ProfilePhoto.jpg")} alt="" />
    </ImageWrapper>
    <Motd>Logged in as Joe</Motd> 
</>

export default ProfileIcon
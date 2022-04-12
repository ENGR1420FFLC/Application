import React, { ReactElement } from "react";
import styled from "styled-components";
import Button from "../button/Button";
import { FaTimes } from "react-icons/fa"
import { Header, HeaderWrapper } from "../../textStyles/TextStyles";

const Dim = styled.div`
    position: fixed;
    z-index: 99999;
    width: 100%;
    left: 0;
    top: 0;
    background-color: rgba(0, 0, 0, 0.5);
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`

const PopupWrapper = styled.div`
    background-color: ${p => p.theme.neutralColor};
    padding: 15px;
    width: 600px;
    border: 1px solid ${p => p.theme.complementColor};
`

type PropTypes = { title: string, content: ReactElement | string, show: boolean, setShow: React.Dispatch<boolean> }

const PopupMsg = ({ content, title, show, setShow }: PropTypes) => {
    return (
        <>{show ? <Dim onClick = { () => setShow(false) }>
            <PopupWrapper onClick={e => e.stopPropagation()}>
                <HeaderWrapper>
                    <Header>{title}</Header>
                    <Button content={<>Close <FaTimes /></>} onClick={() => setShow(false)}/>
                </HeaderWrapper>
                {content}
            </PopupWrapper>
        </Dim> : null}</>
    )
}

export default PopupMsg
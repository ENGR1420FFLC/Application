import React from "react";
import { ImLoop2 } from "react-icons/im";
import styled from "styled-components";
import Item from "../../services/models/Item";
import BaseTheme from "../../themes/BaseTheme";

const SmallItemWrapper = styled.div(({ status }: { status: number }) => `
    font-size: 0.7em;
    width: 100%;
    overflow: hidden;
    word-wrap: nowrap;
    padding: 2px 5px;
    box-sizing: border-box;
    border-radius: 5px;
    flex-shrink: 0;

    background-color: ${status === 2 ? BaseTheme.validColor
        : status === 1 ? BaseTheme.midColor
        : BaseTheme.invalidColor
    };

    color: ${status === 2 ? BaseTheme.invertedTextColor
        : status === 1 ? BaseTheme.textColor
            : BaseTheme.invertedTextColor
    };
`)

const Gap = styled.div`display: flex; gap: 5px; align-items: center;`

const SmallItem = ({ item }: { item: Item }) => <SmallItemWrapper status={item.status}>
    <Gap>{item.recurring ? <ImLoop2 /> : ""} {item.name}</Gap>
</SmallItemWrapper>

export default SmallItem
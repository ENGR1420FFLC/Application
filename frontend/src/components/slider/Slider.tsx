import styled from "styled-components";

const SliderWrapper = styled.div`
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${p => p.theme.complementColor};
    display: flex;
    gap: 5px;
    position: relative;
    font-size: 0.85em;
`

interface SliderThumbTypes {
    theme: any
    color: string
    selected: boolean
}

const SliderThumb = styled.div`
    background-color: ${(p: SliderThumbTypes) => p.selected ? (p.color ? p.color : p.theme.accentColor) : "none"};
    color: ${(p: SliderThumbTypes) => p.selected ? p.theme.invertedTextColor : p.theme.textColor};
    padding: 4.5px;
    border-radius: 5px;
    
    &:hover {
        cursor: pointer;
        user-select: none;
    }
`

type PropTypes = {
    value: boolean
    setValue: React.Dispatch<boolean>
    trueContent: React.ReactElement | string
    falseContent: React.ReactElement | string
    color?: any
}

const Slider = ({ value, setValue, trueContent, falseContent, color }: PropTypes) => <SliderWrapper>
    <SliderThumb color={color} selected={value} onClick={() => setValue(true)}>{trueContent}</SliderThumb>
    <SliderThumb color={color} selected={!value} onClick={() => setValue(false)}>{falseContent}</SliderThumb>
</SliderWrapper>

export default Slider
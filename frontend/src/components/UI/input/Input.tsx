import styled from "styled-components";

const Wrapper = styled.input`
    color: ${p => p.theme.accentColor};
    height: 40px;
    padding: 10px;

    font-size: 1em;
    box-sizing: border-box;
    user-select: none;
    font-family: ${p => p.theme.bodyFontFamily};

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    border: 1px solid ${p => p.theme.complementColor};
    cursor: pointer;
    box-sizing: border-box;

    &:hover {
        border: 1px solid ${p => p.theme.accentColor};
    }
`

const Input = ({ value, setValue, placeholder }: { value: string | null, setValue: React.Dispatch<string>, placeholder?: string }) => 
    <Wrapper value={value || ""} onChange={e => setValue(e.target.value)} placeholder={placeholder}/>

export default Input
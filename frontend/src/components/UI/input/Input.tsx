import styled from "styled-components";

const Wrapper = styled.input(({ theme, disabled }) =>`
    color: ${theme.textColor};
    height: 40px;
    padding: 10px;

    font-size: 1em;
    box-sizing: border-box;
    user-select: none;
    font-family: ${theme.bodyFontFamily};

    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    border: 1px solid ${theme.complementColor};
    cursor: ${disabled ? "not-allowed" : "pointer"};
    box-sizing: border-box;

    &:hover {
        border: 1px solid ${theme.accentColor};
    }
`)

type PropTypes = { value: string | null, setValue: React.Dispatch<string>, placeholder?: string, disabled?: boolean }

const Input = ({ value, setValue, placeholder, disabled }: PropTypes) => 
    <Wrapper value={value || ""} onChange={e => setValue(e.target.value)} placeholder={placeholder} disabled={disabled || false}/>

export default Input
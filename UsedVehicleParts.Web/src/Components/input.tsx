import React, { ChangeEvent } from "react";
import styled from "styled-components";

import colors from "../Constants/colors";

interface InputProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

const InputStyled = styled.input`
  border-radius: 4px;
  border: solid 1px ${colors.gray};
  width: 100%;
  height: 38px;
  padding: 2px 10px;
  font-family: inherit;
  font-size: inherit;
  color: inherit;
`;

const Input = ({
  className,
  placeholder,
  value,
  onChange,
  name
}: InputProps) => (
  <InputStyled
    className={className}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    name={name}
  />
);

export default Input;

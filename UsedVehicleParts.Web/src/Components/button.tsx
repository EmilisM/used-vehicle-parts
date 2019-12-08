import React from "react";
import styled from "styled-components";
import colors from "../Constants/colors";
import Loader from "./loader";

const ButtonStyled = styled.button`
  padding: 10px 20px;
  background-color: ${colors.primaryColor};
  color: ${colors.white};
  border: solid 1px ${colors.primaryColor};
  font-size: 16px;
  border-radius: 2px;
  min-height: 56px;
`;

const LoaderStyled = styled(Loader)`
  width: 36px;
  height: 36px;
  border-color: ${colors.white};
  border-bottom-color: transparent;
`;

interface ButtonProps {
  label: string;
  className?: string;
  loading: boolean;
}

const Button = ({ label, className, loading }: ButtonProps) => {
  return (
    <ButtonStyled className={className}>
      {loading ? <LoaderStyled /> : label}
    </ButtonStyled>
  );
};

export default Button;

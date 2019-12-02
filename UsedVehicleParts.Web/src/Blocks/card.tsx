import React, { ReactNode } from "react";
import styled from "styled-components";

import colors from "../Constants/colors";

const CardStyled = styled.div`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 2px;
  box-shadow: 2px 2px 6px 0px ${colors.primaryColor};
`;

const CardHeaderStyled = styled.div`
  font-weight: 400;
  font-size: 18px
  background-color: ${colors.primaryColor};
  color: ${colors.white};
  height: 48px;
  display: flex;
  padding: 10px 20px;
  border-radius: 2px 2px 0px 0px;
  display: flex;
  align-items: center;
`;

const CardBodyStyled = styled.div`
  padding: 20px;
`;

interface CardProps {
  className?: string;
  title?: string;
  children: ReactNode;
}

const Card = ({ className, title, children }: CardProps) => (
  <CardStyled className={className}>
    {title && <CardHeaderStyled>{title}</CardHeaderStyled>}
    <CardBodyStyled>{children}</CardBodyStyled>
  </CardStyled>
);

export default Card;

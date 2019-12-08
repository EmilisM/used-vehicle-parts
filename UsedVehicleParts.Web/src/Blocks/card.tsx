import React, { ReactNode } from "react";
import styled from "styled-components";

import colors from "../Constants/colors";

const CardStyled = styled.div`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 2px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);

  .card__header {
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
  }

  .card__body {
    padding: 20px;
  }
`;

interface CardProps {
  className?: string;
  title?: string;
  children: ReactNode;
}

const Card = ({ className, title, children }: CardProps) => (
  <CardStyled className={className}>
    {title && <div className="card__header">{title}</div>}
    <div className="card__body">{children}</div>
  </CardStyled>
);

export default Card;

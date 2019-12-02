import React, { ReactNode } from "react";
import styled from "styled-components";

import colors from "../Constants/colors";

const InputTitleStyled = styled.div`
  color: ${colors.textPrimary};
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
`;

interface InputTitleProps {
  className?: string;
  children: ReactNode;
}

const InputTitle = ({ className, children }: InputTitleProps) => (
  <InputTitleStyled className={className}>{children}</InputTitleStyled>
);

export default InputTitle;

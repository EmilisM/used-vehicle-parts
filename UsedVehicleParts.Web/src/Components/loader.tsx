import React from "react";
import styled from "styled-components";

import colors from "../Constants/colors";

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface LoaderProps {
  className?: string;
}

const LoaderStyled = styled.div`
  border-radius: 100%;
  border: solid 2px ${colors.primaryColor};
  border-bottom-color: transparent;

  width: 75px;
  height: 75px;

  animation: spin 0.75s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ className }: LoaderProps) => (
  <LoaderContainer>
    <LoaderStyled className={className} />
  </LoaderContainer>
);

export default Loader;

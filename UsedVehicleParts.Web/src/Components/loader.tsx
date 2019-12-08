import React from "react";
import styled from "styled-components";

import colors from "../Constants/colors";

const LoaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoaderStyled = styled.div`
  border-radius: 100%;
  border: solid 2px ${colors.primaryColor}
  border-bottom-color: transparent;

  width: ${({ width }: { width?: number; height?: number }) => width || 75}px;
  height: ${({ height }: { width?: number; height?: number }) =>
    height || 75}px;

  animation: spin 0.75s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const Loader = ({ width, height }: { width?: number; height?: number }) => (
  <LoaderContainer>
    <LoaderStyled width={width} height={height} />
  </LoaderContainer>
);

export default Loader;

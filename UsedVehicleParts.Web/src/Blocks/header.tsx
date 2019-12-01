import React from "react";
import styled from "styled-components";

import colors from "../Constants/colors";

const HeaderStyled = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  background: ${colors.headerMain};
  background: -webkit-linear-gradient(
    to right,
    ${colors.headerMain},
    ${colors.headerSecondary}
  );
  background: linear-gradient(
    to right,
    ${colors.headerMain},
    ${colors.headerSecondary}
  );
  padding: 10px;
  position: sticky;
  top: 0;
`;

const HeaderTitleStyled = styled.div`
  color: ${colors.white};
  font-weight: 600;
  font-size: 24px;
  font-style: normal;
`;

const HeaderTitle = () => (
  <HeaderTitleStyled>Used vehicle parts</HeaderTitleStyled>
);

const Header = () => (
  <HeaderStyled id="header">
    <HeaderTitle />
  </HeaderStyled>
);

export default Header;

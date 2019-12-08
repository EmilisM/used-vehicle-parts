import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../Constants/colors";
import routes from "../Constants/routes";

const HeaderStyled = styled.header`
  width: 100%;
  height: 56px;
  min-height: 56px
  display: flex;
  align-items: center;
  background: ${colors.primaryColor};
  background: -webkit-linear-gradient(
    to right,
    ${colors.primaryColor},
    ${colors.secondaryColor}
  );
  background: linear-gradient(
    to right,
    ${colors.primaryColor},
    ${colors.secondaryColor}
  );
  padding: 10px;
  position: fixed;
  top: 0;
  z-index: 1000;
`;

const HeaderTitleLinkStyled = styled(Link)`
  text-decoration: none;
  color: ${colors.white};
  font-weight: 600;
  font-size: 24px;
  font-style: normal;

  &:hover {
    color: ${colors.gray};
  }
`;

const HeaderItemsStyled = styled.div`
  display: flex;
`;

const HeaderTitle = () => (
  <HeaderTitleLinkStyled to={routes.home}>
    Used vehicle parts
  </HeaderTitleLinkStyled>
);

const HeaderItems = () => <HeaderItemsStyled />;

const Header = () => (
  <HeaderStyled id="header">
    <HeaderTitle />
    <HeaderItems />
  </HeaderStyled>
);

export default Header;

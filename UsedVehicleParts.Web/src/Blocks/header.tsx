import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import colors from "../Constants/colors";
import routes from "../Constants/routes";

const HeaderStyled = styled.header`
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
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

const HeaderTitleLinkStyled = styled(Link)`
  text-decoration: none;
  color: ${colors.white};
  font-weight: 600;
  font-size: 24px;
  font-style: normal;

  &:hover {
    color: #cccccc;
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

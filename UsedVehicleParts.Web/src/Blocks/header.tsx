import React, { Fragment, useState } from "react";
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

  @media (max-width: 768px) {
    justify-content: space-between;
  }
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
  margin-left: 20px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const HeaderItemLinkStyled = styled(Link)`
  text-decoration: none;
  color: ${colors.white};
  margin: 0px 10px 0px;

  &:hover {
    color: ${colors.gray};
  }
`;

const HeaderTitle = () => (
  <HeaderTitleLinkStyled to={routes.home}>
    Used vehicle parts
  </HeaderTitleLinkStyled>
);

interface HeaderProps {
  isAuthorized: boolean;
}

const HeaderItems = ({ isAuthorized }: HeaderProps) => (
  <HeaderItemsStyled>
    {isAuthorized ? (
      <Fragment>
        <HeaderItemLinkStyled to={routes.newPart}>
          Submit new part
        </HeaderItemLinkStyled>
        <HeaderItemLinkStyled to={routes.profile}>Profile</HeaderItemLinkStyled>
        <HeaderItemLinkStyled to={routes.login}>Logout</HeaderItemLinkStyled>
      </Fragment>
    ) : (
      <HeaderItemLinkStyled to={routes.login}>
        Login/Sign up
      </HeaderItemLinkStyled>
    )}
  </HeaderItemsStyled>
);

const HeaderMenuIconStyled = styled.div`
  @media (min-width: 768px) {
    display: none;
  }

  cursor: pointer;

  .bar1-change {
    -webkit-transform: rotate(-45deg) translate(-9px, 6px);
    transform: rotate(-45deg) translate(-6px, 6px);
  }

  .bar2-change {
    opacity: 0;
  }

  .bar3-change {
    -webkit-transform: rotate(45deg) translate(-8px, -8px);
    transform: rotate(45deg) translate(-8px, -8px);
  }

  .bar1,
  .bar2,
  .bar3 {
    width: 35px;
    height: 4px;
    background-color: ${colors.white};
    margin: 6px 0;
    transition: 0.4s;
    border-radius: 4px;
  }
`;

const HeaderMenuIcon = ({
  isOpen,
  onClick
}: {
  isOpen: boolean;
  onClick: any;
}) => (
  <HeaderMenuIconStyled onClick={onClick}>
    <div className={`bar1 ${isOpen ? "bar1-change" : ""}`}></div>
    <div className={`bar2 ${isOpen ? "bar2-change" : ""}`}></div>
    <div className={`bar3 ${isOpen ? "bar3-change" : ""}`}></div>
  </HeaderMenuIconStyled>
);

const HeaderMenuStyled = styled.div`
  @media (min-width: 768px) {
    display: none;
  }

  position: fixed;
  top: 56px;
  left: 0px;
  width: 100%;
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
`;

const HeaderItemItemLinkStyled = styled(Link)`
  text-decoration: none;
  color: ${colors.white};
  padding: 20px;
  width: 100%;
  display: block;

  &:hover {
    color: ${colors.gray};
  }
`;

const HeaderMenu = ({ isAuthorized }: { isAuthorized: boolean }) => (
  <HeaderMenuStyled>
    {isAuthorized ? (
      <Fragment>
        <HeaderItemItemLinkStyled to={routes.newPart}>
          Submit new part
        </HeaderItemItemLinkStyled>
        <HeaderItemItemLinkStyled to={routes.profile}>
          Profile
        </HeaderItemItemLinkStyled>
        <HeaderItemItemLinkStyled to={routes.login}>
          Logout
        </HeaderItemItemLinkStyled>
      </Fragment>
    ) : (
      <HeaderItemItemLinkStyled to={routes.login}>
        Login/Sign up
      </HeaderItemItemLinkStyled>
    )}
  </HeaderMenuStyled>
);

const Header = ({ isAuthorized }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HeaderStyled id="header">
      <HeaderTitle />
      <HeaderItems isAuthorized={isAuthorized} />
      <HeaderMenuIcon onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      {isOpen ? <HeaderMenu isAuthorized={isAuthorized} /> : null}
    </HeaderStyled>
  );
};

export default Header;

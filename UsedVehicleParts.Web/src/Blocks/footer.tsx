import React from "react";
import styled from "styled-components";

import colors from "../Constants/colors";

const FooterStyled = styled.footer`
  flex-shrink: 0;
  height: 28px;
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
`;

const Footer = () => <FooterStyled id="footer" />;

export default Footer;

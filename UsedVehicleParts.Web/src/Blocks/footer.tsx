import styled from "styled-components";

import colors from "../Constants/colors";

const FooterStyled = styled.footer`
  flex-shrink: 0;
  height: 28px;
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
`;

export default FooterStyled;

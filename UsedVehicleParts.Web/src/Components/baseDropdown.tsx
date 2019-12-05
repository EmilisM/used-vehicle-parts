import styled from "styled-components";
import AsyncSelect from "react-select/async";

import colors from "../Constants/colors";

const BaseDropdownStyled = styled(AsyncSelect)`
  .${({ classNamePrefix }) => classNamePrefix}__dropdown-indicator {
    display: none;
  }

  .${({ classNamePrefix }) => classNamePrefix}__indicator-separator {
    display: none;
  }

  .${({ classNamePrefix }) => classNamePrefix}__clear-indicator {
    color: ${colors.primaryColor};
  }

  .${({ classNamePrefix }) => classNamePrefix}__single-value {
    color: ${colors.textPrimary};
  }
`;

export default BaseDropdownStyled;

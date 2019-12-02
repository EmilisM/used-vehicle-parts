import React from "react";
import AsyncSelect from "react-select/async";
import useFetch from "use-http";
import styled from "styled-components";

import { makeGetAll, Make } from "../Api/api";
import colors from "../Constants/colors";

interface MakeDropdownProps {
  className?: string;
}

const MakeDropdownStyled = styled(AsyncSelect)`
  .make-dropdown__dropdown-indicator {
    color: ${colors.primaryColor};
  }
  .make-dropdown__clear-indicator {
    color: ${colors.primaryColor};
  }
`;

const MakeDropdown = ({ className }: MakeDropdownProps) => {
  const { get } = useFetch();

  const loadOptions = (inputValue: string) =>
    new Promise(resolve => {
      get(makeGetAll(inputValue)).then(data => {
        const makes = data.map((make: Make) => ({
          value: make.id,
          label: make.name
        }));

        resolve(makes);
      });
    });

  return (
    <MakeDropdownStyled
      className={className}
      classNamePrefix="make-dropdown"
      loadOptions={loadOptions}
      openMenuOnFocus={false}
      openMenuOnClick={false}
      isClearable
    />
  );
};

export default MakeDropdown;

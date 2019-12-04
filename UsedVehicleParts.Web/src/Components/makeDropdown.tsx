import React from "react";
import AsyncSelect, { Props } from "react-select/async";
import useFetch from "use-http";
import styled from "styled-components";

import { makeGetAll, MakeResponse } from "../Api/api";
import colors from "../Constants/colors";
import { MakeOption } from "../Reducers/home";

interface MakeDropdownProps {
  className?: string;
  value?: MakeOption;
  onChange: (value: MakeOption) => void;
}

const DropdownStyled = styled(AsyncSelect)<Props<MakeOption>>`
  .${({ classNamePrefix }) => classNamePrefix}__dropdown-indicator {
    color: ${colors.primaryColor};
  }
  .${({ classNamePrefix }) => classNamePrefix}__clear-indicator {
    color: ${colors.primaryColor};
  }
`;

const MakeDropdownStyled = (props: Props<MakeOption>) => (
  <DropdownStyled {...props} />
);

const MakeDropdown = ({ className, value, onChange }: MakeDropdownProps) => {
  const { get } = useFetch();

  const loadOptions = (inputValue: string) =>
    new Promise(resolve => {
      get(makeGetAll(inputValue)).then(data => {
        const makes: MakeOption[] = data.map((make: MakeResponse) => ({
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
      onChange={value => onChange(value as MakeOption)}
    />
  );
};

export default MakeDropdown;

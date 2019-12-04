import React from "react";
import { Props } from "react-select/async";
import useFetch from "use-http";

import { partClassGetAll, PartClassResponse } from "../Api/api";
import { PartClassOption } from "../Reducers/home";

import BaseDropdownStyled from "./baseDropdown";

interface PartClassDropdownProps {
  className?: string;
  value?: PartClassOption[];
  onChange: (value: PartClassOption[]) => void;
}

function PartClassDropdownStyled(props: Props<PartClassOption>) {
  return <BaseDropdownStyled {...props} />;
}

const TrimDropdown = ({
  className,
  value,
  onChange
}: PartClassDropdownProps) => {
  const { get } = useFetch();

  const loadOptions = (inputValue: string) =>
    new Promise(resolve => {
      get(partClassGetAll(inputValue)).then((data: PartClassResponse[]) => {
        if (!data) {
          return resolve();
        }

        const partClasses: PartClassOption[] = data.map(part => ({
          value: part.id,
          label: part.name
        }));

        resolve(partClasses);
      });
    });

  return (
    <PartClassDropdownStyled
      className={className}
      classNamePrefix="part-class-dropdown"
      loadOptions={loadOptions}
      openMenuOnFocus={false}
      openMenuOnClick={false}
      isClearable
      isMulti
      value={value}
      onChange={value => onChange(value as PartClassOption[])}
    />
  );
};

export default TrimDropdown;

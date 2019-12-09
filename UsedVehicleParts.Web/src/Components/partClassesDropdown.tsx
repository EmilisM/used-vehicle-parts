import React from "react";
import { Props } from "react-select/async";
import useFetch from "use-http";

import { partClassGetAll, PartClassResponse } from "../Api/api";
import { PartClassOption, Nullable } from "../Reducers/home";

import BaseDropdownStyled from "./baseDropdown";

interface PartClassesDropdownProps {
  className?: string;
  value: Nullable<PartClassOption[]>;
  onChange: (value: PartClassOption[]) => void;
}

function PartClassesDropdownStyled(props: Props<PartClassOption>) {
  return <BaseDropdownStyled {...props} />;
}

const PartClassesDropdown = ({
  className,
  value,
  onChange
}: PartClassesDropdownProps) => {
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
    <PartClassesDropdownStyled
      className={className}
      classNamePrefix="part-classes-dropdown"
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

export default PartClassesDropdown;

import React from "react";
import { Props } from "react-select/async";
import { ActionMeta } from "react-select";
import useFetch from "use-http";

import { makeGetAll, MakeResponse } from "../Api/api";
import { MakeOption, Nullable } from "../Reducers/home";

import BaseDropdownStyled from "./baseDropdown";

interface MakeDropdownProps {
  className?: string;
  value: Nullable<MakeOption>;
  onChange: (value: MakeOption, action: ActionMeta) => void;
}

function MakeDropdownStyled(props: Props<MakeOption>) {
  return <BaseDropdownStyled {...props} />;
}

const MakeDropdown = ({ className, value, onChange }: MakeDropdownProps) => {
  const { get } = useFetch();

  const loadOptions = (inputValue: string) =>
    new Promise(resolve => {
      get(makeGetAll(inputValue)).then((data: MakeResponse[]) => {
        if (!data) {
          return resolve();
        }

        const makes: MakeOption[] = data.map(make => ({
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
      value={value}
      onChange={(value, action) => onChange(value as MakeOption, action)}
    />
  );
};

export default MakeDropdown;

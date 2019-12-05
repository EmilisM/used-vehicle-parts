import React from "react";
import { Props } from "react-select/async";
import useFetch from "use-http";

import { TrimResponse, trimGetAll } from "../Api/api";
import {
  MakeOption,
  ModelOption,
  TrimOption,
  Nullable
} from "../Reducers/home";

import BaseDropdownStyled from "./baseDropdown";

interface TrimDropdownProps {
  className?: string;
  value: Nullable<TrimOption[]>;
  onChange: (value: TrimOption[]) => void;
  model: Nullable<ModelOption>;
}

function TrimDropdownStyled(props: Props<MakeOption>) {
  return <BaseDropdownStyled {...props} />;
}

const TrimDropdown = ({
  className,
  value,
  onChange,
  model
}: TrimDropdownProps) => {
  const { get } = useFetch();

  const loadOptions = (inputValue: string) =>
    new Promise(resolve => {
      get(trimGetAll(inputValue, model ? model.value : undefined)).then(
        (data: TrimResponse[]) => {
          if (!data) {
            return resolve();
          }

          const trims: TrimOption[] = data.map(trim => ({
            value: trim.id,
            label: trim.name
          }));

          resolve(trims);
        }
      );
    });

  return (
    <TrimDropdownStyled
      className={className}
      classNamePrefix="trim-dropdown"
      loadOptions={loadOptions}
      openMenuOnFocus={false}
      openMenuOnClick={false}
      isClearable
      isMulti
      value={value}
      onChange={value => onChange(value as TrimOption[])}
      isDisabled={!model}
    />
  );
};

export default TrimDropdown;

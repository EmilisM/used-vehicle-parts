import React from "react";
import { Props } from "react-select/async";
import useFetch from "use-http";

import { modelGetAll, ModelResponse } from "../Api/api";
import { ModelOption, MakeOption } from "../Reducers/home";

import BaseDropdownStyled from "./baseDropdown";

interface ModelDropdownProps {
  className?: string;
  value?: ModelOption;
  onChange: (value: ModelOption) => void;
  make?: MakeOption;
}

function ModelDropdownStyled(props: Props<ModelOption>) {
  return <BaseDropdownStyled {...props} />;
}

const ModelDropdown = ({
  className,
  make,
  value,
  onChange
}: ModelDropdownProps) => {
  const { get } = useFetch();

  const loadOptions = (inputValue: string) =>
    new Promise(resolve => {
      get(modelGetAll(inputValue, make && make.value)).then(
        (data: ModelResponse[]) => {
          if (!data) {
            return resolve();
          }

          const models: ModelOption[] = data.map(model => ({
            value: model.id,
            label: model.name
          }));

          resolve(models);
        }
      );
    });

  return (
    <ModelDropdownStyled
      className={className}
      classNamePrefix="model-dropdown"
      loadOptions={loadOptions}
      openMenuOnFocus={false}
      openMenuOnClick={false}
      value={value}
      onChange={value => onChange(value as ModelOption)}
      isDisabled={!make}
    />
  );
};

export default ModelDropdown;

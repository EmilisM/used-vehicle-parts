import React from "react";
import { Props } from "react-select/async";
import { ActionMeta } from "react-select";
import useFetch from "use-http";

import { modelGetAll, ModelResponse } from "../Api/api";
import { ModelOption, MakeOption, Nullable } from "../Reducers/home";

import BaseDropdownStyled from "./baseDropdown";

interface ModelDropdownProps {
  className?: string;
  value: Nullable<ModelOption>;
  onChange: (value: ModelOption, action: ActionMeta) => void;
  make: Nullable<MakeOption>;
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
      get(modelGetAll(inputValue, make ? make.value : undefined)).then(
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
      onChange={(value, action) => onChange(value as ModelOption, action)}
      isDisabled={!make}
      isClearable
    />
  );
};

export default ModelDropdown;

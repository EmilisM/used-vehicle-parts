import React from "react";
import AsyncSelect, { Props } from "react-select/async";
import useFetch from "use-http";
import styled from "styled-components";

import { modelGetAll, ModelResponse } from "../Api/api";
import colors from "../Constants/colors";
import { ModelOption } from "../Reducers/home";

interface ModelDropdownProps {
  className?: string;
  makeId?: number;
  value?: ModelOption[];
  onChange: (value: ModelOption[]) => void;
}

const DropdownStyled = styled(AsyncSelect)`
  .model-dropdown__dropdown-indicator {
    color: ${colors.primaryColor};
  }
  .model-dropdown__clear-indicator {
    color: ${colors.primaryColor};
  }
`;

const ModelDropdownStyled = (props: Props<ModelOption[]>) => (
  <DropdownStyled {...props} />
);

const ModelDropdown = ({
  className,
  makeId,
  value,
  onChange
}: ModelDropdownProps) => {
  const { get } = useFetch();

  const loadOptions = (inputValue: string) =>
    new Promise(resolve => {
      get(modelGetAll(inputValue, makeId)).then(data => {
        const models: ModelOption[] = data.map((model: ModelResponse) => ({
          value: model.id,
          label: model.name
        }));

        resolve(models);
      });
    });

  return (
    <ModelDropdownStyled
      className={className}
      classNamePrefix="model-dropdown"
      loadOptions={loadOptions}
      openMenuOnFocus={false}
      openMenuOnClick={false}
      isMulti={true}
      value={value}
      onChange={value => onChange(value as ModelOption[])}
    />
  );
};

export default ModelDropdown;

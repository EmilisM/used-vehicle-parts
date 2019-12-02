import React from "react";
import AsyncSelect from "react-select/async";
import useFetch from "use-http";

import { Model, modelGetAll } from "../Api/api";

interface ModelDropdownProps {
  className?: string;
}

const ModelDropdown = ({ className }: ModelDropdownProps) => {
  const { get } = useFetch();

  const loadOptions = (inputValue: string) =>
    new Promise(resolve => {
      get(modelGetAll(inputValue)).then(data => {
        const models = data.map((model: Model) => ({
          value: model.id,
          label: model.name
        }));

        resolve(models);
      });
    });

  return (
    <AsyncSelect
      className={className}
      loadOptions={loadOptions}
      openMenuOnFocus={false}
      openMenuOnClick={false}
    />
  );
};

export default ModelDropdown;

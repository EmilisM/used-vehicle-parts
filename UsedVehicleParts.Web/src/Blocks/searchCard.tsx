import React from "react";
import styled from "styled-components";

import { MakeOption, ModelOption } from "../Reducers/home";

import InputTitle from "../Components/inputTitle";
import MakeDropdown from "../Components/makeDropdown";
import ModelDropdown from "../Components/modelDropdown";

import Card from "./card";

const MakeDropdownStyled = styled(MakeDropdown)`
  margin-top: 10px;
`;

const ModelTitleStyled = styled(InputTitle)`
  margin-top: 10px;
`;

const ModelDropdownStyled = styled(ModelDropdown)`
  margin-top: 10px;
`;

export interface SearchCardProps {
  make?: MakeOption;
  models?: ModelOption[];
  setMake: (value: MakeOption) => void;
  setModels: (value: ModelOption[]) => void;
}

const SearchCard = ({ make, models, setMake, setModels }: SearchCardProps) => {
  return (
    <Card title="Search">
      <InputTitle>Choose make</InputTitle>
      <MakeDropdownStyled value={make} onChange={setMake} />
      <ModelTitleStyled>Choose model</ModelTitleStyled>
      <ModelDropdownStyled
        value={models}
        onChange={setModels}
        makeId={make && make.value}
      />
    </Card>
  );
};

export default SearchCard;

import React from "react";
import styled from "styled-components";

import {
  MakeOption,
  ModelOption,
  TrimOption,
  PartClassOption
} from "../Reducers/home";

import InputTitle from "../Components/inputTitle";
import MakeDropdown from "../Components/makeDropdown";
import ModelDropdown from "../Components/modelDropdown";
import TrimDropdown from "../Components/trimDropdown";
import PartClassDropdown from "../Components/partClassDropdown";

import Card from "./card";

const fieldStyle = `
  margin-top: 10px;
`;

const MakeDropdownStyled = styled(MakeDropdown)`
  ${fieldStyle}
`;

const ModelDropdownStyled = styled(ModelDropdown)`
  ${fieldStyle}
`;

const TrimDropdownStyled = styled(TrimDropdown)`
  ${fieldStyle}
`;

const TitleStyled = styled(InputTitle)`
  ${fieldStyle}
`;

const PartClassContainer = styled.div`
  margin-top: 30px;
`;

const PartClassDropdownStyled = styled(PartClassDropdown)`
  ${fieldStyle}
`;

export interface SearchCardProps {
  make?: MakeOption;
  model?: ModelOption;
  trims?: TrimOption[];
  partClasses?: PartClassOption[];
  setMake: (value: MakeOption) => void;
  setModel: (value: ModelOption) => void;
  setTrims: (value: TrimOption[]) => void;
  setPartClasses: (value: PartClassOption[]) => void;
}

const SearchCard = ({
  make,
  model,
  trims,
  partClasses,
  setMake,
  setModel,
  setTrims,
  setPartClasses
}: SearchCardProps) => {
  return (
    <Card title="Search">
      <div>
        <InputTitle>Choose make</InputTitle>
        <MakeDropdownStyled value={make} onChange={setMake} />
        <TitleStyled>Choose model</TitleStyled>
        <ModelDropdownStyled value={model} onChange={setModel} make={make} />
        <TitleStyled>Choose trim</TitleStyled>
        <TrimDropdownStyled value={trims} onChange={setTrims} model={model} />
      </div>
      <PartClassContainer>
        <InputTitle>Choose part class</InputTitle>
        <PartClassDropdownStyled
          value={partClasses}
          onChange={setPartClasses}
        />
      </PartClassContainer>
    </Card>
  );
};

export default SearchCard;

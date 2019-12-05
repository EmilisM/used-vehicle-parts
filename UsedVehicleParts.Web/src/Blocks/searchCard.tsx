import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { ActionMeta } from "react-select";

import {
  MakeOption,
  ModelOption,
  TrimOption,
  PartClassOption,
  Nullable
} from "../Reducers/home";

import InputTitle from "../Components/inputTitle";
import Input from "../Components/input";
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

const PartContainer = styled.div`
  margin-top: 30px;
`;

const InputStyled = styled(Input)`
  ${fieldStyle}
`;

export interface SearchCardProps {
  make: Nullable<ModelOption>;
  model: Nullable<ModelOption>;
  trims: Nullable<TrimOption[]>;
  partClasses: Nullable<PartClassOption[]>;
  partName: string;
  setMake: (value: MakeOption, action: ActionMeta) => void;
  setModel: (value: ModelOption, action: ActionMeta) => void;
  setTrims: (value: TrimOption[]) => void;
  setPartClasses: (value: PartClassOption[]) => void;
  setPartName: (event: ChangeEvent<HTMLInputElement>) => void;
}

const SearchCard = ({
  make,
  model,
  trims,
  partClasses,
  partName,
  setMake,
  setModel,
  setTrims,
  setPartClasses,
  setPartName
}: SearchCardProps) => {
  return (
    <Card title="Search">
      <div>
        <InputTitle>Make</InputTitle>
        <MakeDropdownStyled value={make} onChange={setMake} />
        <TitleStyled>Model</TitleStyled>
        <ModelDropdownStyled value={model} onChange={setModel} make={make} />
        <TitleStyled>Trims</TitleStyled>
        <TrimDropdownStyled value={trims} onChange={setTrims} model={model} />
      </div>
      <PartClassContainer>
        <InputTitle>Part classes</InputTitle>
        <PartClassDropdownStyled
          value={partClasses}
          onChange={setPartClasses}
        />
      </PartClassContainer>
      <PartContainer>
        <InputTitle>Part name</InputTitle>
        <InputStyled value={partName} onChange={setPartName} placeholder="Part name" />
      </PartContainer>
    </Card>
  );
};

export default SearchCard;

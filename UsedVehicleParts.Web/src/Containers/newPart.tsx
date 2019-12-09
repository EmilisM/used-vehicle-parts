import React, { useState, FormEvent } from "react";
import styled from "styled-components";

import Input from "../Components/input";
import InputTitle from "../Components/inputTitle";

import Card from "../Blocks/card";
import {
  MakeOption,
  Nullable,
  ModelOption,
  TrimOption,
  PartClassOption
} from "../Reducers/home";
import MakeDropdown from "../Components/makeDropdown";
import ModelDropdown from "../Components/modelDropdown";
import TrimDropdown from "../Components/trimDropdown";
import PartClassDropdown from "../Components/partClassDropdown";

const NewPartStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const CardStyled = styled(Card)`
  max-width: 700px;
`;

const fieldStyle = `
  margin-top: 10px;
`;

const InputStyled = styled(Input)`
  ${fieldStyle}
`;

const TitleStyled = styled(InputTitle)`
  ${fieldStyle}
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

const PartClassDropdownStyled = styled(PartClassDropdown)`
  ${fieldStyle}
`;

const NewPart = () => {
  const [make, setMake] = useState<Nullable<MakeOption>>(null);
  const [model, setModel] = useState<Nullable<ModelOption>>(null);
  const [trims, setTrims] = useState<Nullable<TrimOption[]>>(null);
  const [partClasses, setPartClasses] = useState<Nullable<PartClassOption[]>>(
    null
  );
  const [partName, setPartName] = useState("");
  const [qualityGrade, setQualityGrade] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <NewPartStyled>
      <CardStyled title="New part">
        <form onSubmit={onSubmit}>
          <InputTitle>Make</InputTitle>
          <MakeDropdownStyled value={make} onChange={setMake} />
          <TitleStyled>Model</TitleStyled>
          <ModelDropdownStyled value={model} onChange={setModel} make={make} />
          <TitleStyled>Trims</TitleStyled>
          <TrimDropdownStyled value={trims} onChange={setTrims} model={model} />
          <InputTitle>Part classes</InputTitle>
          <PartClassDropdownStyled
            value={partClasses}
            onChange={setPartClasses}
          />
          <InputTitle>Part name</InputTitle>
          <InputStyled
            value={partName}
            onChange={e => setPartName(e.target.value)}
            placeholder="Part name"
          />
          <TitleStyled>Quality grade</TitleStyled>
          <InputStyled
            value={qualityGrade}
            onChange={e => setQualityGrade(e.target.value)}
            placeholder="Quality grade"
          />
        </form>
      </CardStyled>
    </NewPartStyled>
  );
};

export default NewPart;

import React from "react";
import styled from "styled-components";

import Card from "./card";
import InputTitle from "../Components/inputTitle";
import MakeDropdown from "../Components/makeDropdown";
import ModelDropdown from "../Components/modelDropdown";

const MakeDropdownStyled = styled(MakeDropdown)`
  margin-top: 10px;
`;

const ModelTitleStyled = styled(InputTitle)`
  margin-top: 10px;
`;

const ModelDropdownStyled = styled(ModelDropdown)`
  margin-top: 10px;
`;

const SearchCard = () => (
  <Card title="Search">
    <InputTitle>Choose make</InputTitle>
    <MakeDropdownStyled />
    <ModelTitleStyled>Choose model</ModelTitleStyled>
    <ModelDropdownStyled />
  </Card>
);

export default SearchCard;

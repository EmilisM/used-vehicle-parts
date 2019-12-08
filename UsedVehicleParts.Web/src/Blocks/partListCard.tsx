import React from "react";
import styled from "styled-components";

import PartList from "../Components/partList";
import Card from "./card";
import { PartResponse } from "../Api/api";

const CardStyled = styled(Card)`
`;

interface PartListCardProps {
  parts: PartResponse[];
}

const PartListCard = ({ parts }: PartListCardProps) => {
  return (
    <CardStyled>
      <PartList parts={parts} />
    </CardStyled>
  );
};

export default PartListCard;

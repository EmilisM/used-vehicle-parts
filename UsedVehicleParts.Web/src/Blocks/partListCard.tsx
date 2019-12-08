import React, { useEffect } from "react";
import styled from "styled-components";
import useFetch from "use-http";

import PartList from "../Components/partList";
import Card from "./card";
import { partGetAll, PartResponse } from "../Api/api";
import { TrimOption, Nullable, PartClassOption } from "../Reducers/home";

const CardStyled = styled(Card)`
  .card__body {
    padding: 0px;
  }
`;

interface PartListCardProps {
  partName: string;
  partClasses: Nullable<PartClassOption[]>;
  trims: Nullable<TrimOption[]>;
  setParts: (value: PartResponse[]) => void;
  parts: PartResponse[];
}

const PartListCard = ({
  partName,
  partClasses,
  trims,
  setParts,
  parts
}: PartListCardProps) => {
  const { get } = useFetch();

  useEffect(() => {
    let isActive = true;

    const partClassIds = partClasses
      ? partClasses.map(partClass => partClass.value)
      : undefined;
    const trimIds = trims ? trims.map(trim => trim.value) : undefined;

    get(partGetAll(partName, partClassIds, trimIds)).then(
      parts => isActive && setParts(parts)
    );

    return () => {
      isActive = false;
    };
  }, [partName, partClasses, trims, get, setParts]);

  return (
    <CardStyled>
      <PartList parts={parts} />
    </CardStyled>
  );
};

export default PartListCard;

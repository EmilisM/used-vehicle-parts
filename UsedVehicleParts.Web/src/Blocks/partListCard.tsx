import React from "react";

import PartList from "../Components/partList";
import Card from "./card";
import { PartResponse } from "../Api/api";

interface PartListCardProps {
  parts: PartResponse[];
  loading: boolean;
}

const PartListCard = ({ parts, loading }: PartListCardProps) => {
  return (
    <Card>
      <PartList parts={parts} loading={loading} />
    </Card>
  );
};

export default PartListCard;

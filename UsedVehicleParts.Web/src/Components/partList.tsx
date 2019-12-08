import React from "react";

import { PartResponse } from "../Api/api";

interface PartListProps {
  parts: PartResponse[];
}

interface Keys {
  key: string;
}

const PartList = ({ parts }: PartListProps) => (
  <div>
    {parts.map(part => {
      return <div key={`${part.partNumber}-${part.name}-${part.qualityGrade}`}>{part.name}</div>;
    })}
  </div> 
);

export default PartList;

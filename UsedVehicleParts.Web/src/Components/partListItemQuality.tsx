import React from "react";
import styled from "styled-components";

import colors from "../Constants/colors";

const getQualitySettings = (quality: number) => {
  if (quality < 3) {
    return `border-color: ${colors.gray};
    border-bottom-color: ${colors.ratingTerribleColor};`;
  } else if (quality >= 3 && quality < 6) {
    return `border-color: ${colors.gray};
    border-left-color: ${colors.ratingBadColor};
    border-bottom-color: ${colors.ratingBadColor};`;
  } else if (quality >= 6 && quality <= 8) {
    return `border-color: ${colors.gray};
    border-left-color: ${colors.ratingGoodColor};
    border-bottom-color: ${colors.ratingGoodColor};
    border-top-color: ${colors.ratingGoodColor};`;
  } else if (quality > 8) {
    return `border-color: ${colors.ratingPerfectColor};`;
  }
};

const PartListItemQualityStyled = styled.div`
  transform: rotate(45deg);
  border: solid 4px;
  ${({ quality }: { quality: number }) => getQualitySettings(quality)}
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
  width: 75px;
  height: 75px;

  span {
    transform: rotate(-45deg);
    font-weight: 600
    font-size: 20px
  }
`;

interface PartListItemQualityProps {
  quality: number;
}

const PartListItemQuality = ({ quality }: PartListItemQualityProps) => {
  return (
    <PartListItemQualityStyled quality={quality}>
      <span>{quality}</span>
    </PartListItemQualityStyled>
  );
};

export default PartListItemQuality;

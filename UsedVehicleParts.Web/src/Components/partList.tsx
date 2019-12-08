import React from "react";
import styled from "styled-components";

import colors from "../Constants/colors";
import { PartResponse } from "../Api/api";

import PartListItemQuality from "../Components/partListItemQuality";

interface PartListProps {
  parts: PartResponse[];
}

const PartListStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px ${colors.gray};
  border-radius: 4px;
`;

const PartListItem = styled.div`
  display: flex;
  padding: 10px;

  &:hover {
    background-color: ${colors.grayHover};
  }
`;

const PartListItemImageContainer = styled.div`
  display: flex;
`;

const PartListItemImage = styled.img`
  width: 250px;
  height: auto;
`;

const PartListItemSeparator = styled.div`
  display: flex;
  margin: 0px 10px;
  height: 1px;
  background-color: ${colors.gray};
`;

const PartListItemContent = styled.div`
  padding-left: 10px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const PartListItemContentName = styled.div`
  display: flex;
  justify-content: center;
  font-weight: 600;
  font-size: 18px;
`;

const PartListItemContentDetails = styled.div`
  margin-top: 10px;
  display: flex;
  height: 100%;
  flex-direction: row;
`;

const PartListItemContentDetailsManufacturer = styled.div`
  span {
    font-weight: 600;
  }
`;

const PartListItemContentDetailsCar = styled.div`
  height: 100%;
  span {
    font-weight: 600;
  }
`;

const PartListItemContentDetailsPrice = styled.div`
  span {
    font-weight: 600;
  }
`;

const PartListItemContentDetailsSeller = styled.div`
  span {
    font-weight: 600;
  }
`;

const PartListItemContentDetailsSpecs = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const PartListItemContentDetailsQuality = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const PartList = ({ parts }: PartListProps) => (
  <PartListStyled>
    {parts.map((part, index) => {
      return [
        <PartListItem
          key={`${part.partNumber}-${part.name}-${part.qualityGrade}`}
        >
          <PartListItemImageContainer>
            <PartListItemImage src={part.image.imageUrl} alt="logo" />
          </PartListItemImageContainer>
          <PartListItemContent>
            <PartListItemContentName>{part.name}</PartListItemContentName>
            <PartListItemContentDetails>
              <PartListItemContentDetailsSpecs>
                <PartListItemContentDetailsManufacturer>
                  Manufacturer: <span>{part.manufacturer}</span>
                </PartListItemContentDetailsManufacturer>
                <PartListItemContentDetailsCar>
                  For:{" "}
                  <span>
                    {part.trim.model.make.name}, {part.trim.model.name},{" "}
                    {part.trim.name}
                  </span>
                </PartListItemContentDetailsCar>
                <PartListItemContentDetailsPrice>
                  Price:{" "}
                  <span>
                    {part.price} {part.priceUnits}
                  </span>
                </PartListItemContentDetailsPrice>
                <PartListItemContentDetailsSeller>
                  Seller: <span>{part.seller.email}</span>
                  {part.seller.reputation
                    ? `, Reputation: ${(<span>{part.seller.reputation}</span>)}`
                    : null}
                </PartListItemContentDetailsSeller>
              </PartListItemContentDetailsSpecs>
              <PartListItemContentDetailsQuality>
                <PartListItemQuality quality={part.qualityGrade} />
              </PartListItemContentDetailsQuality>
            </PartListItemContentDetails>
          </PartListItemContent>
        </PartListItem>,
        parts.length !== index + 1 ? (
          <PartListItemSeparator
            key={`${part.partNumber}-${part.name}-${part.qualityGrade}-separator`}
          />
        ) : null
      ];
    })}
  </PartListStyled>
);

export default PartList;

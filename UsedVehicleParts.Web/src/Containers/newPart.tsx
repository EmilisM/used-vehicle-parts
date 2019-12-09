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
import Message from "../Components/message";
import Button from "../Components/button";
import { PartRequest, partPost, PartError } from "../Api/api";
import api from "../Api/apiConfig";

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

const ButtonStyled = styled(Button)`
  margin-top: 20px;
`;

const MessageStyled = styled(Message)`
  margin-top: 10px;
`;

const NewPart = () => {
  const [make, setMake] = useState<Nullable<MakeOption>>(null);
  const [model, setModel] = useState<Nullable<ModelOption>>(null);
  const [trim, setTrim] = useState<Nullable<TrimOption>>(null);
  const [partClass, setPartClass] = useState<Nullable<PartClassOption>>(null);
  const [partName, setPartName] = useState("");
  const [qualityGrade, setQualityGrade] = useState("");
  const [price, setPrice] = useState("");
  const [priceUnits, setPriceUnits] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [partNumber, setPartNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [error, setError] = useState<PartError>();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    const request: PartRequest = {
      name: partName,
      partNumber: partNumber,
      price: parseInt(price),
      priceUnits: priceUnits,
      qualityGrade: parseInt(qualityGrade),
      trimId: trim ? trim.value : -1,
      manufacturer: manufacturer,
      partClassId: partClass ? partClass.value : -1,
      image: {
        imageUrl: image
      }
    };

    api
      .post(partPost, request)
      .then(() => {
        setLoading(false);
      })
      .catch(err => {
        setError(err.response.data);
        setLoading(false);
      });
  };

  return (
    <NewPartStyled>
      <CardStyled title="New part">
        <form onSubmit={onSubmit}>
          <InputTitle>Make</InputTitle>
          <MakeDropdownStyled value={make} onChange={setMake} />
          <TitleStyled>Model</TitleStyled>
          <ModelDropdownStyled value={model} onChange={setModel} make={make} />
          <TitleStyled>Trim</TitleStyled>
          <TrimDropdownStyled value={trim} onChange={setTrim} model={model} />
          <TitleStyled>Part class</TitleStyled>
          <PartClassDropdownStyled value={partClass} onChange={setPartClass} />
          <TitleStyled>Part number</TitleStyled>
          <InputStyled
            value={partNumber}
            onChange={e => setPartNumber(e.target.value)}
            placeholder="Part number"
          />
          <MessageStyled type="error">
            {error &&
              error.errors.PartNumber &&
              error.errors.PartNumber.join(" ")}
          </MessageStyled>
          <TitleStyled>Part name</TitleStyled>
          <InputStyled
            value={partName}
            onChange={e => setPartName(e.target.value)}
            placeholder="Part name"
          />
          <MessageStyled type="error">
            {error && error.errors.Name && error.errors.Name.join(" ")}
          </MessageStyled>
          <TitleStyled>Quality grade</TitleStyled>
          <InputStyled
            value={qualityGrade}
            onChange={e => setQualityGrade(e.target.value)}
            placeholder="Quality grade"
          />
          <MessageStyled type="error">
            {error &&
              error.errors.qualityGrade &&
              error.errors.qualityGrade.join(" ")}
          </MessageStyled>
          <TitleStyled>Price</TitleStyled>
          <InputStyled
            value={price}
            onChange={e => setPrice(e.target.value)}
            placeholder="Price"
          />
          <MessageStyled type="error">
            {error &&
              error.errors.price &&
              error.errors.price.join(" ")}
          </MessageStyled>
          <TitleStyled>Price units</TitleStyled>
          <InputStyled
            value={priceUnits}
            onChange={e => setPriceUnits(e.target.value)}
            placeholder="Price units"
          />
          <MessageStyled type="error">
            {error &&
              error.errors.PriceUnits &&
              error.errors.PriceUnits.join(" ")}
          </MessageStyled>
          <TitleStyled>Manufacturer</TitleStyled>
          <InputStyled
            value={manufacturer}
            onChange={e => setManufacturer(e.target.value)}
            placeholder="Manufacturer"
          />
          <MessageStyled type="error">
            {error &&
              error.errors.Manufacturer &&
              error.errors.Manufacturer.join(" ")}
          </MessageStyled>
          <TitleStyled>Image</TitleStyled>
          <InputStyled
            value={image}
            onChange={e => setImage(e.target.value)}
            placeholder="Image"
          />
          <ButtonStyled loading={loading} label="Create new part" />
        </form>
      </CardStyled>
    </NewPartStyled>
  );
};

export default NewPart;

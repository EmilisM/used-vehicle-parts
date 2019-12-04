import React, { useReducer } from "react";
import styled from "styled-components";

import Card from "../Blocks/card";
import SearchCard from "../Blocks/searchCard";

import {
  reducer,
  initialState,
  HomeActions,
  MakeOption,
  ModelOption
} from "../Reducers/home";

const HomeStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FirstColumn = styled.div`
  max-width: 400px;
  width: 100%;
`;

const SecondColumn = styled.div`
  margin-left: 20px
  max-width: 800px;
  width: 100%
`;

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setMake = (value: MakeOption) => {
    dispatch(HomeActions.setMake(value));
  };

  const setModels = (value: ModelOption[]) => {
    dispatch(HomeActions.setModels(value));
  };

  return (
    <HomeStyled>
      <FirstColumn>
        <SearchCard
          make={state.make}
          setMake={setMake}
          models={state.models}
          setModels={setModels}
        />
      </FirstColumn>
      <SecondColumn>
        <Card>Home</Card>
      </SecondColumn>
    </HomeStyled>
  );
};

export default Home;

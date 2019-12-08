import React, { useReducer, ChangeEvent, useEffect, useCallback } from "react";
import styled from "styled-components";
import useFetch from "use-http";

import SearchCard from "../Blocks/searchCard";
import PartListCard from "../Blocks/partListCard";

import {
  reducer,
  initialState,
  HomeActions,
  MakeOption,
  ModelOption,
  TrimOption,
  PartClassOption
} from "../Reducers/home";
import { ActionMeta } from "react-select";
import { partGetAll, PartResponse } from "../Api/api";

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
  margin-left: 40px
  max-width: 1000px;
  width: 100%
`;

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { get } = useFetch();

  const setMake = (value: MakeOption, action: ActionMeta) => {
    if (action.action === "clear") {
      dispatch(HomeActions.setModel(null));
      dispatch(HomeActions.setTrims(null));
    }

    dispatch(HomeActions.setMake(value));
  };

  const setModel = (value: ModelOption, action: ActionMeta) => {
    if (action.action === "clear") {
      dispatch(HomeActions.setTrims(null));
    }

    dispatch(HomeActions.setModel(value));
  };

  const setTrims = (value: TrimOption[]) => {
    dispatch(HomeActions.setTrims(value));
  };

  const setPartClasses = (value: PartClassOption[]) => {
    dispatch(HomeActions.setPartClasses(value));
  };

  const setPartName = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(HomeActions.setPartName(event.target.value));
  };

  const setParts = useCallback((value: PartResponse[]) => {
    dispatch(HomeActions.setParts(value));
  }, []);

  useEffect(() => {
    let isActive = true;

    const partClassIds = state.partClasses
      ? state.partClasses.map(partClass => partClass.value)
      : undefined;
    const trimIds = state.trims ? state.trims.map(trim => trim.value) : undefined;

    get(partGetAll(state.partName, partClassIds, trimIds)).then(
      parts => isActive && setParts(parts)
    );

    return () => {
      isActive = false;
    };
  }, [state.partName, state.partClasses, state.trims, get, setParts]);

  return (
    <HomeStyled>
      <FirstColumn>
        <SearchCard
          {...state}
          setMake={setMake}
          setModel={setModel}
          setTrims={setTrims}
          setPartClasses={setPartClasses}
          setPartName={setPartName}
        />
      </FirstColumn>
      <SecondColumn>
        <PartListCard
          parts={state.parts}
        />
      </SecondColumn>
    </HomeStyled>
  );
};

export default Home;

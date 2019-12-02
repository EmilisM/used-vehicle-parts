import * as React from "react";
import styled from "styled-components";

import Card from "../Blocks/card";
import SearchCard from "../Blocks/searchCard";

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
  return (
    <HomeStyled>
      <FirstColumn>
        <SearchCard />
      </FirstColumn>
      <SecondColumn>
        <Card>Home</Card>
      </SecondColumn>
    </HomeStyled>
  );
};

export default Home;

import React from "react";
import { RestfulProvider } from "restful-react";
import styled from "styled-components";

import Router from "./Router";
import Header from "./Blocks/header";
import Footer from "./Blocks/footer";

const AppBase = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1;
`;

function App() {
  return (
    <RestfulProvider base="http://85.206.134.3:7000">
      <AppBase id="app">
        <Header />
        <Content id="app-content">
          <Router />
        </Content>
        <Footer />
      </AppBase>
    </RestfulProvider>
  );
}

export default App;

import React from "react";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "use-http";

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
  padding: 20px;
`;

function App() {
  return (
    <BrowserRouter>
      <Provider url="http://85.206.134.3:7000">
        <AppBase id="app">
          <Header />
          <Content id="app-content">
            <Router />
          </Content>
          <Footer />
        </AppBase>
      </Provider>
    </BrowserRouter>
  );
}

export default App;

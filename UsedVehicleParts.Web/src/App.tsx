import React, { useEffect, useReducer, Dispatch } from "react";
import styled from "styled-components";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "use-http";

import Router from "./Router";
import Header from "./Blocks/header";
import Footer from "./Blocks/footer";

import { BaseUrl, userGet } from "./Api/api";
import api from "./Api/apiConfig";
import {
  reducer,
  initialState,
  AppActions,
  AppState,
  AppAcceptedActions
} from "./Reducers/app";

const AppBase = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  flex: 1;
  padding: 30px;
  margin-top: 56px;
`;

export const AppStateContext = React.createContext<AppState>(initialState);
export const AppDispatchContext = React.createContext<
  Dispatch<AppAcceptedActions>
>(() => {});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    let isActive = true;

    if (token) {
      api
        .get(userGet)
        .then(() => {
          if (isActive) {
            dispatch(AppActions.setLogin());
          }
        })
        .catch(() => {
          isActive && sessionStorage.removeItem("token");
        });
    } else if (isActive) {
      sessionStorage.removeItem("token");
    }

    return () => {
      isActive = false;
    };
  }, [token]);

  return (
    <BrowserRouter>
      <AppDispatchContext.Provider value={dispatch}>
        <AppStateContext.Provider value={state}>
          <Provider url={BaseUrl}>
            <AppBase id="app">
              <Header isAuthorized={state.isAuthorized} />
              <Content id="app-content">
                <Router />
              </Content>
              <Footer />
            </AppBase>
          </Provider>
        </AppStateContext.Provider>
      </AppDispatchContext.Provider>
    </BrowserRouter>
  );
}

export default App;

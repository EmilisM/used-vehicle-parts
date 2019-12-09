import React, { useState, useEffect, useReducer, Dispatch } from "react";
import styled from "styled-components";
import { Provider } from "use-http";
import { Router as CustomRouter } from "react-router-dom";

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

import history from "./Constants/history";
import Loader from "./Components/loader";

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

const LoaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

export const AppStateContext = React.createContext<AppState>(initialState);
export const AppDispatchContext = React.createContext<
  Dispatch<AppAcceptedActions>
>(() => {});

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(true);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    let isActive = true;

    setLoading(true);

    if (token) {
      api
        .get(userGet)
        .then(() => {
          if (isActive) {
            dispatch(AppActions.setLogin());
            setLoading(false);
          }
        })
        .catch(() => {
          if (isActive) {
            sessionStorage.removeItem("token");
            dispatch(AppActions.setLogout());
            setLoading(false);
          }
        });
    } else if (isActive) {
      sessionStorage.removeItem("token");
      dispatch(AppActions.setLogout());
      setLoading(false);
    }

    return () => {
      isActive = false;
    };
  }, [token]);

  return loading ? (
    <LoaderContainer>
      <Loader />
    </LoaderContainer>
  ) : (
    <CustomRouter history={history}>
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
    </CustomRouter>
  );
}

export default App;

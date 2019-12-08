import React, { FormEvent, useState, useEffect, useContext } from "react";
import styled from "styled-components";
import useFetch from "use-http";
import { useHistory } from "react-router";

import Card from "../Blocks/card";

import Button from "../Components/button";
import Input from "../Components/input";
import InputTitle from "../Components/inputTitle";
import Message from "../Components/message";
import {
  authPost,
  LoginRequest,
  TokenResponse,
  LoginError,
  SignUpError,
  SignUpRequest,
  registrationPost
} from "../Api/api";
import routes from "../Constants/routes";

import { AppDispatchContext } from "../App";
import { AppActions } from "../Reducers/app";

const LoginStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const FirstColumn = styled.div`
  max-width: 500px;
  width: 100%;
`;

const SecondColumn = styled.div`
  margin-left: 40px
  max-width: 500px;
  width: 100%
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

const ButtonStyled = styled(Button)`
  margin-top: 20px;
`;

const MessageStyled = styled(Message)`
  margin-top: 20px;
`;

const FieldMessageStyled = styled(Message)`
  margin-top: 10px;
`;

const LoginPage = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState<LoginError | null>(null);

  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpRepeatPassword, setSignUpRepeatPassword] = useState("");
  const [signUpError, setSignUpError] = useState<SignUpError | null>(null);

  const [fetchLoginRequest, fetchLoginResponse] = useFetch();
  const [fetchSignUpRequest, fetchSignUpResponse] = useFetch();

  const appDispatch = useContext(AppDispatchContext);

  const history = useHistory();

  const setSessionStorageToken = (token: string) => {
    sessionStorage.setItem("token", token);
  };

  useEffect(() => {
    sessionStorage.removeItem("token");
    appDispatch(AppActions.setLogout());
  }, [appDispatch]);

  async function loginSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoginError(null);

    const loginRequest: LoginRequest = {
      email: loginEmail,
      password: loginPassword
    };

    const responseToken: TokenResponse = await fetchLoginRequest.post(
      authPost,
      loginRequest
    );

    if (fetchLoginResponse.ok) {
      setSessionStorageToken(responseToken.token);
      appDispatch(AppActions.setLogin());
      history.push(routes.profile);
    } else {
      setLoginError(fetchLoginResponse.data);
    }
  }

  async function signUpSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSignUpError(null);

    const signUpRequest: SignUpRequest = {
      email: signUpEmail,
      password: signUpPassword,
      repeatPassword: signUpRepeatPassword
    };

    const responseToken: TokenResponse = await fetchSignUpRequest.post(
      registrationPost,
      signUpRequest
    );

    if (fetchSignUpResponse.ok) {
      setSessionStorageToken(responseToken.token);
      appDispatch(AppActions.setLogin());
      history.push(routes.profile);
    } else {
      setSignUpError(fetchSignUpResponse.data);
    }
  }

  return (
    <LoginStyled>
      <FirstColumn>
        <Card title="Login">
          <form onSubmit={loginSubmit}>
            <InputTitle>Email</InputTitle>
            <InputStyled
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
            <FieldMessageStyled type="error">
              {loginError &&
                loginError.errors.Email &&
                loginError.errors.Email.join(" ")}
            </FieldMessageStyled>
            <TitleStyled>Password</TitleStyled>
            <InputStyled
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <FieldMessageStyled type="error">
              {loginError &&
                loginError.errors.Password &&
                loginError.errors.Password.join(" ")}
            </FieldMessageStyled>
            <MessageStyled type="error">
              {loginError &&
                loginError.errors.Form &&
                loginError.errors.Form.join(" ")}
            </MessageStyled>
            <ButtonStyled loading={fetchLoginRequest.loading} label="Login" />
          </form>
        </Card>
      </FirstColumn>
      <SecondColumn>
        <Card title="Sign up">
          <form onSubmit={signUpSubmit}>
            <InputTitle>Email</InputTitle>
            <InputStyled
              value={signUpEmail}
              onChange={e => setSignUpEmail(e.target.value)}
              placeholder="Email"
              type="email"
            />
            <FieldMessageStyled type="error">
              {signUpError &&
                signUpError.errors.Email &&
                signUpError.errors.Email.join(" ")}
            </FieldMessageStyled>
            <TitleStyled>Password</TitleStyled>
            <InputStyled
              value={signUpPassword}
              onChange={e => setSignUpPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <FieldMessageStyled type="error">
              {signUpError &&
                signUpError.errors.Password &&
                signUpError.errors.Password.join(" ")}
            </FieldMessageStyled>
            <TitleStyled>Repeat password</TitleStyled>
            <InputStyled
              value={signUpRepeatPassword}
              onChange={e => setSignUpRepeatPassword(e.target.value)}
              placeholder="Password"
              type="password"
            />
            <FieldMessageStyled type="error">
              {signUpError &&
                signUpError.errors.RepeatPassword &&
                signUpError.errors.RepeatPassword.join(" ")}
            </FieldMessageStyled>
            <ButtonStyled
              loading={fetchSignUpRequest.loading}
              label="Sign up"
            />
          </form>
        </Card>
      </SecondColumn>
    </LoginStyled>
  );
};

export default LoginPage;

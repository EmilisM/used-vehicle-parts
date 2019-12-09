import React, { useEffect, Fragment, useState } from "react";
import styled from "styled-components";

import Card from "../Blocks/card";
import Input from "../Components/input";
import InputTitle from "../Components/inputTitle";
import { userGet, User } from "../Api/api";
import Loader from "../Components/loader";
import api from "../Api/apiConfig";

const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardStyled = styled(Card)`
  max-width: 600px;
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

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    let isActive = true;

    setLoading(true);

    api.get(userGet).then(({ data }: { data: User }) => {
      if (isActive) {
        setUser(data);
        setLoading(false);
      }
    });

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <ProfileContainer>
      <CardStyled title="Profile">
        {loading ? (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        ) : (
          <Fragment>
            <InputTitle>Email</InputTitle>
            <InputStyled
              disabled
              value={user ? user.email : ""}
              placeholder="Email"
            />
            <TitleStyled>Phone number</TitleStyled>
            <InputStyled
              disabled
              value={user && user.contactPhone ? user.contactPhone : ""}
              placeholder="Phone number"
            />
            <TitleStyled>Reputation</TitleStyled>
            <InputStyled
              disabled
              value={user && user.reputation ? user.reputation : ""}
              placeholder="Reputation"
              type="password"
            />
          </Fragment>
        )}
      </CardStyled>
    </ProfileContainer>
  );
};

export default Profile;

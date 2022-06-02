import React from "react";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import SignInForm from "./SignUpForm";


const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BoxContainer = styled.div`
  margin-top: 20vh;
  width: 35vw;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  border-radius: 19px;
  background-color: #fff;
  box-shadow: 0 0 2px rgba(20, 20, 20, 0.5);
  position: relative;
  overflow: hidden;
`;
const TopContainer = styled.div`
  // width: 100%;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 3vh;
`;
const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const HeaderText = styled.h2`
  font-size: 30px;
  font-weight: 600;
  line-height: 1.24;
  color: black;
  margin: 0;
`;

const SmallText = styled.h5`
  color: black;
  font-weight: 500;
  font-size: 11px;
  z-index: 10;
  margin: 0;
  margin-top: 7px;
`;
const InnerContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0.5vw;
`;

function LoginPage() {
  return (
    <AppContainer>
      <BoxContainer>
        <TopContainer>
          <HeaderContainer>
            <HeaderText>Welcome Back</HeaderText>
            <SmallText>Please sign-in to continue!</SmallText>
          </HeaderContainer>
        </TopContainer>
        <InnerContainer>
          <LoginForm />
          {/* <SignInForm /> */}
        </InnerContainer>
      </BoxContainer>
    </AppContainer>
  );
}

export default LoginPage;

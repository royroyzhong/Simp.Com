import React from "react";
import LoginForm from "./LoginForm";
import styled from "styled-components";
import { createContext } from "react";
import SignUpForm from "./SignUpForm";
import { useState } from "react";
import { SmallSpan, Marginer } from "../../css/CommonStyle";

const AppContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BoxContainer = styled.div`
  margin-top: 11vh;
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
  height: 120px;
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
export const SwitcherContext = createContext();
function LoginPage(prop) {
  const [isSignIn, setSwitch] = useState(true);
  const handleSwitch = () => {
    setSwitch(!isSignIn);
  };
  return (
    <SwitcherContext.Provider value={handleSwitch}>
      <AppContainer>
        <BoxContainer>
          <TopContainer>
            {isSignIn === true && (
              <HeaderContainer>
                <HeaderText>Welcome Back</HeaderText>
                <SmallText>Please sign-in to continue!</SmallText>
              </HeaderContainer>
            )}
            {isSignIn === false && (
              <HeaderContainer>
                <HeaderText>Sign Up</HeaderText>
                <Marginer direction="vertical" margin="2vh" />
                <SmallSpan>
                  Let's get you all set up so you can verify your personal
                  account
                </SmallSpan>
              </HeaderContainer>
            )}
          </TopContainer>

          <InnerContainer>
            {isSignIn === true && <LoginForm />}
            {isSignIn === false && <SignUpForm />}
          </InnerContainer>
        </BoxContainer>
      </AppContainer>
    </SwitcherContext.Provider>
  );
}

export default LoginPage;

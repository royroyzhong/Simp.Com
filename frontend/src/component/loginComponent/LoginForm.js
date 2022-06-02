import React from "react";
import {
  BoldSpan,
  BoxContainer,
  FormContainer,
  Input,
  SmallSpan,
  SubmitButton,
  Marginer,
} from "./CommonStyle";
function LoginForm() {
  return (
    <BoxContainer>
      <FormContainer>
        <Input type="email" placeholder="Email" />
      </FormContainer>
      <Marginer direction="vertical" margin="3vh" />
      <FormContainer>
        <Input type="password" placeholder="Password" />
      </FormContainer>
      <Marginer direction="vertical" margin="3vh" />
      <SubmitButton type="submit">Sign in</SubmitButton>
      <Marginer direction="vertical" margin="3vh" />
      <SmallSpan href="#">
        Forget your password? <BoldSpan href="#">Reset Password</BoldSpan>
      </SmallSpan>
      <SmallSpan href="#">
        Don't have an accoun? <BoldSpan href="#">Signup</BoldSpan>
      </SmallSpan>
    </BoxContainer>
  );
}

export default LoginForm;

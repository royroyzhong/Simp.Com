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
function SignInForm() {
  return (
    <BoxContainer>
      <Marginer direction="vertical" margin="3vh" />
      <FormContainer>
        <Input type="fName" placeholder="First Name" />
        <Input type="lName" placeholder="Last Name" />
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Password" />
        <Input type="cpassword" placeholder="Confirm Password" />
      </FormContainer>
      <Marginer direction="vertical" margin="3vh" />
      <SubmitButton type="submit">Create</SubmitButton>
      <Marginer direction="vertical" margin="1.5vh" />
      <SmallSpan href="#">
        Already have an account? <BoldSpan href="#">Sign in</BoldSpan>
      </SmallSpan>

    </BoxContainer>
  );
}

export default SignInForm;

import React from "react";
import {
  BoldSpan,
  BoxContainer,
  FormContainer,
  Input,
  SmallSpan,
  SubmitButton,
  Marginer,
  BreakLine,
} from "./CommonStyle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MuiStyle from "./MuiStyle";
import GoogleIcon from "@mui/icons-material/Google";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  boxShadow: "none",
}));
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

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={10}>
          <Grid item xs={8}>
            <Item>
              <MuiStyle />
            </Item>
          </Grid>

          <Grid item xs={4}>
            <Item>
              <BoldSpan href="#">Forget your password? </BoldSpan>
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Marginer direction="vertical" margin="1vh" />
      <SubmitButton type="submit">Sign in</SubmitButton>
      <Marginer direction="vertical" margin="1vh" />
      <SmallSpan href="#">
        Don't have an accoun? <BoldSpan href="#">Signup</BoldSpan>
        <Marginer direction="vertical" margin="2vh" />
        <BreakLine />
        <SubmitButton type="submit">
          <GoogleIcon />
        </SubmitButton>
      </SmallSpan>
    </BoxContainer>
  );
}

export default LoginForm;

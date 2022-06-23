import React, { useContext } from "react";
import {
  BoldSpan,
  BoxContainer,
  SmallSpan,
  SubmitButton,
  Marginer,
  BreakLine,
} from "../../css/CommonStyle";
import { CssTextField } from "./CommonMuiStyle";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import MuiStyle from "./MuiStyle";
import GoogleIcon from "@mui/icons-material/Google";
import { SwitcherContext } from "./LoginPage";
import Tooltip from "@mui/material/Tooltip";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import IconButton from "@mui/material/IconButton";
import Dashboard from "../sellerDashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import jwt_decode from "jwt-decode";
import { useState } from "react";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  boxShadow: "none",
}));
function handleCallBackResponse(res) {
  console.log("JWT:" + res.credential);
  console.log(res);
  var userObj = jwt_decode(res.credential);
  console.log(userObj);
}
function LoginForm() {
  const [user, setUser] = useState({});
  useEffect(() => {
    // global google
    window.google.accounts.id.initialize({
      client_id:
        "1089072716137-04fc5dho1ovglbmmpoagr24t83pqrjic.apps.googleusercontent.com",
      callback: handleCallBackResponse,
    });
    window.google.accounts.id.renderButton(
      document.getElementById("googleSignIn"),
      {
        theme: "filled_blue",
        shape: "pill",
        size: "large",
      }
    );
  }, []);

  let navigate = useNavigate();
  const handerSwitch = useContext(SwitcherContext);
  const [emailValue, setEmail] = React.useState("");
  const [pwdValue, setPwd] = React.useState("");
  const [visible, setVisible] = React.useState(true);
  const handleVisible = () => setVisible(!visible);

  const validateEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };
  const validatePwd = (event) => {
    const value = event.target.value;
    setPwd(value);
  };
  const handlerValidation = (event) => {
    event.preventDefault();

    if (emailValue === "123@gmail.com" && pwdValue === "123123") {
      let path = "../sellerX/dashboard";
      navigate(path);
    } else {
      console.log("fail");
    }
  };

  const handleLoginGoogleFailure = (data) => {
    console.log(data);
  };
  const handleLoginGoogleSucess = (data) => {
    console.log(data);
  };

  return (
    <BoxContainer
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handlerValidation(event);
        }
      }}
    >
      <CssTextField
        id="outlined-email-input"
        label="Email"
        type="email"
        onChange={validateEmail}
      />
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField
        id="outlined-password-input"
        label="Password"
        type={visible ? "password" : "text"}
        autoComplete="current-password"
        onChange={validatePwd}
        InputProps={{
          endAdornment: (
            <IconButton aria-label="edit" onClick={handleVisible}>
              {visible && <VisibilityIcon />}
              {!visible && <VisibilityOffIcon />}
            </IconButton>
          ),
        }}
      />

      <Marginer direction="vertical" margin="3vh" />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={8} sm={12}>
            <Item>
              <MuiStyle />
            </Item>
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <Item>
              <BoldSpan href="#">
                <Typography variant="body2" gutterBottom>
                  Forget your password?{" "}
                </Typography>{" "}
              </BoldSpan>
              {/* <BoldSpan href="#">Forget your password? </BoldSpan> */}
            </Item>
          </Grid>
        </Grid>
      </Box>
      <Marginer direction="vertical" margin="1vh" />
      <SubmitButton type="submit" onClick={handlerValidation}>
        Sign in
      </SubmitButton>
      <Marginer direction="vertical" margin="1vh" />
      <SmallSpan href="#">
        Don't have an accoun?{" "}
        <BoldSpan href="#" onClick={handerSwitch}>
          Signup
        </BoldSpan>
        <Marginer direction="vertical" margin="2vh" />
        <BreakLine />
        <div id="googleSignIn"></div>
        <Marginer direction="vertical" margin="2vh" />
      </SmallSpan>
    </BoxContainer>
  );
}

export default LoginForm;

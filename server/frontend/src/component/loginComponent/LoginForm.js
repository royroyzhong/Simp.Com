import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import React, { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { googleloginAsync, loginAsync } from "../../controller/login/thunks";
import {
  BoldSpan,
  BoxContainer,
  BreakLine,
  Marginer,
  SmallSpan,
  SubmitButton,
} from "../../css/CommonStyle";
import "../../css/login.css";
import { CssTextField } from "./CommonMuiStyle";
import { SwitcherContext } from "./LoginPage";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.h7,
  color: theme.palette.text.primary,
  boxShadow: "none",
}));
const boxCSS = {
  "@media (max-width:900px)": {
    marginLeft: "30vw",
  },
};
function LoginForm(prop) {
  const dispatch = useDispatch();
  function handleCallBackResponse(res) {
    dispatch(googleloginAsync({ jwt: res.credential })).then((result) => {
      loginSuccess(result);
    });
  }
  useEffect(() => {
    // global google
    try {
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
    } catch (err) {
      navigate("/login");
    }
  }, []);

  let navigate = useNavigate();
  const handerSwitch = useContext(SwitcherContext);
  const [emailValue, setEmail] = React.useState("");
  const [pwdValue, setPwd] = React.useState("");
  const [visible, setVisible] = React.useState(true);
  const [seller, setSeller] = React.useState(true);
  const [remember, setRemember] = React.useState(true);
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const handleVisible = () => setVisible(!visible);

  const validateEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
    setEmailError("");
  };
  const validatePwd = (event) => {
    const value = event.target.value;
    setPwd(value);
    setPasswordError("");
  };

  const handlerValidation = (event) => {
    event.preventDefault();
    let account = {
      userEmail: emailValue,
      password: pwdValue,
      isRemember: remember,
      isSeller: seller,
    };
    return dispatch(loginAsync(account)).then((result) => {
      loginSuccess(result);
    });
  };
  const loginSuccess = (result) => {
    try {
      let role = result.payload.role;
      let path;
      if (result.payload.status === 400) {
        handleFail(result.payload.error);
        throw Error("role undefine");
      } else if (role === true) {
        path = "../seller/dashboard";
      } else {
        path = "/";
      }
      navigate(path);
    } catch (err) {
      handleFail(err);
    }
  };
  const handleFail = (err) => {
    if (err !== undefined) {
      if (err.includes("email")) setEmailError(err);
    }
    if (err.includes("password")) setPasswordError(err);
  };
  const handleOnClickSeller = (event) => {
    setSeller(event.target.checked);
  };
  const handleOnClickRemember = (event) => {
    setRemember(event.target.checked);
  };

  return (
    <BoxContainer
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          handlerValidation(event);
        }
      }}
    >
      <Box sx={boxCSS}>
        <CssTextField
          id="outlined-email-input-error-helper-text"
          label="Email"
          type="email"
          error={emailError !== ""}
          helperText={emailError !== "" ? emailError : ""}
          onChange={validateEmail}
        />
        <Marginer direction="vertical" margin="1vh" />
        <CssTextField
          id="outlined-password-input-error-helper-text"
          label="Password"
          type={visible ? "password" : "text"}
          error={passwordError !== ""}
          helperText={passwordError !== "" ? passwordError : ""}
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

        <Grid container spacing={1}>
          <Grid item xs={12} md={8} sm={12}>
            <Item>
              <FormGroup>
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox defaultChecked onClick={handleOnClickRemember} />
                  }
                  label="Remember Me"
                />
              </FormGroup>
            </Item>
          </Grid>

          <Grid item xs={12} md={4} sm={12}>
            <Item>
              <FormGroup>
                <FormControlLabel
                  size="small"
                  control={
                    <Checkbox defaultChecked onClick={handleOnClickSeller} />
                  }
                  label="Seller"
                />
              </FormGroup>
            </Item>
          </Grid>
        </Grid>
        <Marginer direction="vertical" margin="1vh" />
        <SubmitButton type="submit" onClick={handlerValidation}>
          Sign in
        </SubmitButton>
        <Marginer direction="vertical" margin="1vh" />

        <SmallSpan href="#">
          Don't have an account?
          <BoldSpan href="#" onClick={handerSwitch}>
            Signup
          </BoldSpan>
          <Marginer direction="vertical" margin="2vh" />
          <BreakLine />
        </SmallSpan>
        <Marginer direction="horizontal" margin="4vw" />
      </Box>
      <div id="googleSignIn"></div>
      <Marginer direction="vertical" margin="2vh" />
      <Box sx={boxCSS}>
        <IconButton onClick={() => navigate("../")}>
          <ArrowBackIcon />
        </IconButton>
      </Box>
    </BoxContainer>
  );
}

export default LoginForm;

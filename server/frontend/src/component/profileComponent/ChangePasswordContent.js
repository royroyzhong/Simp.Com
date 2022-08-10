import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Button, useTheme } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Marginer } from "../../css/CommonStyle";

export const CssBoxStyle = {
  flexGrow: 1,
  width: "43vw",
  height: "auto",
  margin: "10vh -15vw",
  paddingBottom: "2vw",
  borderRadius: "19px",
  backgroundColor: "white",
  color: "#58595B",
  boxShadow: "0 0 2px rgb(20 20 20 / 50%)",
};
export const CssBoxStyle_smaller = {
  width: "55vw",
  margin: "3vh 20vw",
  height: "auto",
  flexGrow: 1,
  paddingBottom: "2vw",
  borderRadius: "19px",
  backgroundColor: "white",
  boxShadow: "0 0 2px rgb(20 20 20 / 50%)",
};

function ChangePasswordContent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [btnOldPwd, setBtnOldPwd] = useState(true);
  const [btnNewPwd, setBtnNewPwd] = useState(true);
  const [btnCNewPwd, setBtnCNewPwd] = useState(true);
  const handleOldPwd = () => setBtnOldPwd(!btnOldPwd);
  const handleNewPwd = () => setBtnNewPwd(!btnNewPwd);
  const handleCNewPwd = () => setBtnCNewPwd(!btnCNewPwd);
  const [OldPwd, setOldPwd] = useState(" ");
  const [OldPwdErr, setOldPwdErr] = useState("");
  const [NewPwd, setNewPwd] = useState("");
  const [CNewPwd, setCNewPwd] = useState("");
  const [ruleOne, setRuleOne] = useState(false);
  const [ruleTwo, setRuleTwo] = useState(false);
  const [ruleThree, setRuleThree] = useState(false);
  const [ruleFour, setRuleFour] = useState(false);
  const [ruleFive, setRuleFive] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [openError, setOpenError] = React.useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    setOpenError(false);
  };

  const passwordValidation = (password) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (password.length >= 8) {
      setRuleOne(true);
    } else {
      setRuleOne(false);
    }
    if (/[a-z]/.test(password)) {
      setRuleTwo(true);
    } else {
      setRuleTwo(false);
    }
    if (/[A-Z]/.test(password)) {
      setRuleThree(true);
    } else {
      setRuleThree(false);
    }
    if (/\d/.test(password)) {
      setRuleFour(true);
    } else {
      setRuleFour(false);
    }
    if (specialChars.test(password)) {
      setRuleFive(true);
    } else {
      setRuleFive(false);
    }
  };
  const ruleItem = (text, visiable) => (
    <Box sx={{ borderBottom: 0.5, marginBottom: "3vh" }}>
      <Grid container>
        <Grid item xs={2}>
          {!visiable && <ClearIcon sx={{ color: red[500] }} />}
          {visiable && <CheckIcon color="success" />}
        </Grid>
        <Grid item xs={10}>
          <Typography variant="body1" gutterBottom align="left">
            {text}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
  const user = useSelector((state) => state.login.user);
  const handleFailure = (err) => {
    setOldPwdErr(err);
  };
  const handleSuccess = () => {
    setOpen(true);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (CNewPwd === NewPwd) {
        let data = { password: OldPwd, newPassword: NewPwd, email: user.email };
        if (ruleOne && ruleTwo && ruleThree && ruleFour && ruleFive) {
          sendData(data).then((result) => {
            if (result.errors) {
              handleFailure(result.errors);
            } else {
              handleSuccess();
            }
          });
        } else {
          setOpenError(true);
        }
      }
    } catch (err) {
      handleFailure(err);
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={matches ? CssBoxStyle : CssBoxStyle_smaller}
        >
          <Grid item xs={12}>
            <Box sx={{ borderBottom: 0.1, marginBottom: "4vh" }}>
              <Marginer direction="vertical" margin="4vh" />
              <Typography
                variant="h6"
                gutterBottom
                align="left"
                sx={{
                  paddingLeft: "30px",
                }}
              >
                Change Password
              </Typography>
            </Box>
          </Grid>
          <Grid
            container
            sx={{
              paddingLeft: "50px",
            }}
          >
            <Grid item xs={6}>
              <Marginer direction="vertical" margin="4vh" />
              <Grid item lg={10} xs={12}>
                <TextField
                  fullWidth
                  label="Old Password"
                  error={OldPwd === "" ? true : OldPwdErr === "" ? false : true}
                  helperText={
                    OldPwd === ""
                      ? "Passwords Empty!"
                      : OldPwdErr === ""
                      ? ""
                      : OldPwdErr
                  }
                  variant="standard"
                  type={btnOldPwd ? "password" : "text"}
                  onChange={(event) => {
                    setOldPwd(event.target.value);
                    setOldPwdErr("");
                  }}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label="edit" onClick={handleOldPwd}>
                        {btnOldPwd && <VisibilityIcon />}
                        {!btnOldPwd && <VisibilityOffIcon />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>

              <Grid item lg={10} xs={12}>
                <TextField
                  fullWidth
                  label="New Password"
                  variant="standard"
                  onChange={(event) => {
                    passwordValidation(event.target.value);
                    setNewPwd(event.target.value);
                  }}
                  type={btnNewPwd ? "password" : "text"}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label="edit" onClick={handleNewPwd}>
                        {btnNewPwd && <VisibilityIcon />}
                        {!btnNewPwd && <VisibilityOffIcon />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Marginer direction="vertical" margin="2vh" />

              <Grid item lg={10} xs={12}>
                <TextField
                  fullWidth
                  id="standard"
                  label="Confirm Password"
                  variant="standard"
                  error={NewPwd !== CNewPwd}
                  type={btnCNewPwd ? "password" : "text"}
                  helperText={
                    NewPwd !== CNewPwd ? "Passwords don't match!" : " "
                  }
                  onChange={(event) => setCNewPwd(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label="edit" onClick={handleCNewPwd}>
                        {btnCNewPwd && <VisibilityIcon />}
                        {!btnCNewPwd && <VisibilityOffIcon />}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid item lg={6} xs={12}>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  component="div"
                  align="left"
                >
                  New password Rule:
                </Typography>
              </Grid>
              <Marginer direction="vertical" margin="2vh" />

              <Grid item xs={10}>
                {ruleItem("At least 8 characters", ruleOne)}
              </Grid>
              <Grid item xs={10}>
                {ruleItem("At least 1 lower letter (a-z)", ruleTwo)}
              </Grid>
              <Grid item xs={10}>
                {ruleItem("At least 1 uppercase letter (A-Z)", ruleThree)}
              </Grid>
              <Grid item xs={10}>
                {ruleItem("At least 1 number (0-9)", ruleFour)}
              </Grid>
              <Grid item xs={10}>
                {ruleItem("At least 1 special characters", ruleFive)}
              </Grid>
              <Grid item xs={10} sx={{ marginTop: "2vh", marginLeft: "10vw" }}>
                <Button type="submit" variant="contained">
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Update Successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Please check password rule!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default ChangePasswordContent;

async function sendData(input) {
  let response;
  try {
    response = await fetch("user/profile/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(input),
    });
    return response.json();
  } catch (err) {
    return { error: err.message };
  }
}

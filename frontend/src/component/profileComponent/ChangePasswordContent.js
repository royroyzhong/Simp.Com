import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Typography from "@mui/material/Typography";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { Button } from "@mui/material";
import { Marginer } from "../../css/CommonStyle";
import { red } from "@mui/material/colors";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
export const CssBoxStyle = {
  flexGrow: 1,
  width: "43vw",
  height: "auto",
  margin: "5vw",
  paddingBottom: "2vw",
  borderRadius: "19px",
  backgroundColor: "white",
  color:"#58595B",
  boxShadow: "0 0 2px rgb(20 20 20 / 50%)",
};
export const CssBoxStyle2 = {
  margin: "5vw 12vw",

  flexGrow: 1,
  height: "auto",
  paddingBottom: "2vw",
  borderRadius: "19px",
  backgroundColor: "white",
  boxShadow: "0 0 2px rgb(20 20 20 / 50%)",
  width: "30vw",
};
// import { Marginer } from "../loginComponent/CommonStyle";
function ChangePasswordContent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [btnOldPwd, setBtnOldPwd] = useState(true);
  const [btnNewPwd, setBtnNewPwd] = useState(true);
  const [btnCNewPwd, setBtnCNewPwd] = useState(true);
  const handleOldPwd = () => setBtnOldPwd(!btnOldPwd);
  const handleNewPwd = () => setBtnNewPwd(!btnNewPwd);
  const handleCNewPwd = () => setBtnCNewPwd(!btnCNewPwd);
  const [OldPwd, setOldPwd] = useState("nothing");
  const [NewPwd, setNewPwd] = useState("");
  const [CNewPwd, setCNewPwd] = useState("");
  const [ruleOne, setRuleOne] = useState(false);
  const [ruleTwo, setRuleTwo] = useState(false);
  const [ruleThree, setRuleThree] = useState(false);
  const [ruleFour, setRuleFour] = useState(false);
  const [ruleFive, setRuleFive] = useState(false);

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
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={matches ? CssBoxStyle : CssBoxStyle2}>
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
                  error={OldPwd === ""}
                  helperText={OldPwd === "" ? "Passwords Empty!" : " "}
                  variant="standard"
                  type={btnOldPwd ? "password" : "text"}
                  onChange={(event) => setOldPwd(event.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton aria-label="edit" onClick={handleOldPwd}>
                        {btnOldPwd && (
                          <VisibilityIcon sx={{ marginLeft: "12vw" }} />
                        )}
                        {!btnOldPwd && (
                          <VisibilityOffIcon sx={{ marginLeft: "12vw" }} />
                        )}
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
                        {btnNewPwd && (
                          <VisibilityIcon sx={{ marginLeft: "12vw" }} />
                        )}
                        {!btnNewPwd && (
                          <VisibilityOffIcon sx={{ marginLeft: "12vw" }} />
                        )}
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
                        {btnCNewPwd && (
                          <VisibilityIcon sx={{ marginLeft: "12vw" }} />
                        )}
                        {!btnCNewPwd && (
                          <VisibilityOffIcon sx={{ marginLeft: "12vw" }} />
                        )}
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
                <Button variant="contained">Save</Button> 
                {/* TODO */}
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default ChangePasswordContent;

import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { Button, useTheme } from "@mui/material";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import * as React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserAsync } from "../../controller/login/thunks";
import { Marginer } from "../../css/CommonStyle";
import { CssBoxStyle, CssBoxStyle_smaller } from "./ChangePasswordContent";

function ProfileContent() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [btnDisabledFName, setBtnDisabledFName] = useState(true);
  const [btnDisabledLName, setBtnDisabledLName] = useState(true);
  const [btnDisabledAddress, setBtnDisabledAddress] = useState(true);
  const [btnDisabledPhone, setBtnDisabledPhone] = useState(true);
  const handleEditFName = () => setBtnDisabledFName(!btnDisabledFName);
  const handleEditLName = () => setBtnDisabledLName(!btnDisabledLName);
  const handleEditAddress = () => setBtnDisabledAddress(!btnDisabledAddress);
  const handleEditPhone = (id) => setBtnDisabledPhone(!btnDisabledPhone);
  const [userFirstName, setUserFirstName] = useState();
  const [userLastName, setUserLastName] = useState();
  const [userAddress, setUserAddress] = useState();
  const [userEmail, setUserEmail] = useState();
  const [userPhone, setUserPhone] = useState();
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const formatPhoneNumber = (number) => {
    if (!number) {
      return number;
    }
    let split = number.replace(/[^\d]/g, "");
    return (
      "(" +
      split.slice(0, 3) +
      ")" +
      split.slice(3, 6) +
      "-" +
      split.slice(6, 10)
    );
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      userFirstName,
      userLastName,
      userEmail,
      userAddress,
      userPhone,
    };
    sendData(data).then(() => {
      setOpen(true);
    });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserAsync()).then((result, err) => {
      let user = result.payload.data;
      setUserFirstName(user.firstName);
      setUserLastName(user.lastName);
      setUserAddress(user.address);
      setUserEmail(user.email);
      setUserPhone(user.phone);
    });
  }, []);

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
                Personal Information
              </Typography>
            </Box>
          </Grid>
          <Grid
            container
            spacing={4}
            sx={{
              paddingLeft: "50px",
            }}
          >
            <Grid item md={7} xs={10}>
              <TextField
                fullWidth
                id="standard"
                label="First Name"
                value={userFirstName || ""}
                onChange={(e) => setUserFirstName(e.target.value)}
                variant="standard"
                disabled={btnDisabledFName}
                InputProps={{
                  endAdornment: (
                    <IconButton aria-label="edit" onClick={handleEditFName}>
                      {btnDisabledFName && <EditIcon />}
                      {!btnDisabledFName && <CheckIcon />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item md={7} xs={10}>
              <TextField
                fullWidth
                id="standard"
                label="Last Name"
                value={userLastName || ""}
                onChange={(e) => setUserLastName(e.target.value)}
                variant="standard"
                disabled={btnDisabledLName}
                InputProps={{
                  endAdornment: (
                    <IconButton aria-label="edit" onClick={handleEditLName}>
                      {btnDisabledLName && <EditIcon />}
                      {!btnDisabledLName && <CheckIcon />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item md={7} xs={10}>
              <TextField
                fullWidth
                id="standard-read-only-input"
                label="Email"
                value={userEmail || ""}
                onChange={(e) => setUserEmail(e.target.value)}
                InputProps={{
                  disabled: true,
                }}
                variant="standard"
              />
            </Grid>
            <Grid item md={7} xs={10}>
              <TextField
                fullWidth
                id="standard"
                label="Address"
                value={userAddress || ""}
                onChange={(e) => setUserAddress(e.target.value)}
                variant="standard"
                disabled={btnDisabledAddress}
                InputProps={{
                  endAdornment: (
                    <IconButton aria-label="edit" onClick={handleEditAddress}>
                      {btnDisabledAddress && <EditIcon />}
                      {!btnDisabledAddress && <CheckIcon />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item md={7} xs={10}>
              <TextField
                fullWidth
                id="standard"
                label="Phone"
                value={formatPhoneNumber(userPhone || "")}
                onChange={(e) => setUserPhone(e.target.value)}
                variant="standard"
                disabled={btnDisabledPhone}
                InputProps={{
                  endAdornment: (
                    <IconButton aria-label="edit" onClick={handleEditPhone}>
                      {btnDisabledPhone && <EditIcon />}
                      {!btnDisabledPhone && <CheckIcon />}
                    </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid
              item
              md={4}
              xs={2}
              sx={{ marginTop: "2vh", marginLeft: "2vw" }}
            >
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Update Successfully!
        </Alert>
      </Snackbar>
    </React.Fragment>
  );
}

export default ProfileContent;

async function sendData(input) {
  let response;
  try {
    response = await fetch("user/profile", {
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

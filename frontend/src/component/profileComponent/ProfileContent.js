import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import { Marginer } from "../../css/CommonStyle";
import Typography from "@mui/material/Typography";

function ProfileContent() {
  const [btnDisabledFName, setBtnDisabledFName] = useState(true);
  const [btnDisabledLName, setBtnDisabledLName] = useState(true);
  const [btnDisabledAddress, setBtnDisabledAddress] = useState(true);
  const [btnDisabledPhone, setBtnDisabledPhone] = useState(true);
  const handleEditFName = () => setBtnDisabledFName(!btnDisabledFName);
  const handleEditLName = () => setBtnDisabledLName(!btnDisabledLName);
  const handleEditAddress = () => setBtnDisabledAddress(!btnDisabledAddress);
  const handleEditPhone = (id) => setBtnDisabledPhone(!btnDisabledPhone);
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
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            flexGrow: 1,
            border: "1px solid black",
            width: "55vw",
            height: "80vh",
            margin: "5vw",
            zIndex: "-1",
          }}
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
            <Grid item xs={7}>
              <TextField
                fullWidth
                id="standard"
                label="First Name"
                defaultValue="Peter"
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
            <Grid item xs={7}>
              <TextField
                fullWidth
                id="standard"
                label="Last Name"
                defaultValue="Chen"
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
            <Grid item xs={7}>
              <TextField
                fullWidth
                id="standard-read-only-input"
                label="Email"
                defaultValue="123@gmail.com"
                InputProps={{
                  disabled: true,
                }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={7}>
              <TextField
                fullWidth
                id="standard"
                label="Address"
                defaultValue="1163 Maple Ave"
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
            <Grid item xs={7}>
              <TextField
                fullWidth
                id="standard"
                label="Phone"
                defaultValue={formatPhoneNumber("7781234561")}
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
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default ProfileContent;

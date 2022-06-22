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
import { CssBoxStyle, CssBoxStyle_smaller } from "./ChangePasswordContent";
import { Button } from "@mui/material";
import {
  getFirstName,
  getLastName,
  getAddress,
  getEmail,
  getPhone,
} from "../../controller/buyerSlice";
import { useSelector } from "react-redux";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material";
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
  let userFirstName = useSelector(getFirstName);
  let userLastName = useSelector(getLastName);
  let userAddress = useSelector(getAddress);
  let userEmail = useSelector(getEmail);
  let userPhone = useSelector(getPhone);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <Box sx={matches ? CssBoxStyle : CssBoxStyle_smaller}>
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
                value={userFirstName}
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
                value={userLastName}
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
                value={userEmail}
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
                value={userAddress}
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
                value={formatPhoneNumber(userPhone)}
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
              <Button variant="contained">Save</Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default ProfileContent;

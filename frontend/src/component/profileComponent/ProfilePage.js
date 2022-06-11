import React from "react";
import ProfileContent from "./ProfileContent";
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/system";
import ProfileLeftContent from "./ProfileLeftContent";
import { useState } from "react";
import ChangePasswordContent from "./ChangePasswordContent";
import Header from "../common/Header";
function ProfilePage() {
  const [Controller, setController] = useState("personalInformation");
  return (
    <Container maxWidth="md" className="dashboard">
      {/* <Box sx={{ flexGrow: 1 }}> */}

      <Grid container spacing={1} sx={{ marginTop: "-10vh" }}>
        <Grid item lg={12} md={12} xs={12}>
          <Box
            sx={{ flexGrow: 1, marginTop: "5vh" }}
            className="status-line-wrapper"
          >
            <Header display="no"></Header>
          </Box>
        </Grid>

        <Grid
          item
          lg={4}
          md={12}
          sx={{ marginLeft: "-5vw", marginTop: "-12vh" }}
        >
          <ProfileLeftContent
            ControllerName={Controller}
            ControllerFunction={setController}
          />
        </Grid>

        <Grid item lg={8} md={12} sx={{ marginTop: "-12vh" }}>
          {Controller === "" && <ProfileContent />}
          {Controller === "personalInformation" && <ProfileContent />}
          {/* {Controller === "Payment" && <PaymentContent />} */}
          {Controller === "ChangePassword" && <ChangePasswordContent />}
        </Grid>
      </Grid>
      {/* </Box> */}
    </Container>
  );
}

export default ProfilePage;

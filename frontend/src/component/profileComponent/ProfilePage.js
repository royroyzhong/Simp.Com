import React from "react";
import ProfileContent from "./ProfileContent";
import Grid from "@mui/material/Grid";
import { Box, Container } from "@mui/system";
import ProfileLeftContent from "./ProfileLeftContent";
import { useState } from "react";
import ChangePasswordContent from "./ChangePasswordContent";
import Header from "../common/Header";
import Navigator from "../navigator/Navigator";
function ProfilePage() {
  const [Controller, setController] = useState("personalInformation");
  return (
    <Container maxWidth="md" className="dashboard">
      {/* <Box sx={{ flexGrow: 1 }}> */}

      <Grid container spacing={1} sx={{ marginTop: "-10vh" }}>
        <Grid item xs={12}>
          <Box
            sx={{ flexGrow: 1, marginTop: "5vh" }}
            className="status-line-wrapper"
          >
            <Header display="no"></Header>
          </Box>
        </Grid>

        {/* <Navigator
          PaperProps={{ style: { width: 256 } }}
          sx={{ display: { sm: "block", xs: "none" } }}
        /> */}

        <Grid item xs={3} sx={{ marginLeft: "-5vw", marginTop: "-12vh" }}>
          <ProfileLeftContent
            ControllerName={Controller}
            ControllerFunction={setController}
          />
        </Grid>
        <Grid item xs={7} sx={{ marginTop: "-12vh" }}>
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

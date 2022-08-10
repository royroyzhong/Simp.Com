import Grid from "@mui/material/Grid";
import { Container } from "@mui/system";
import React, { useState } from "react";
import ChangePasswordContent from "./ChangePasswordContent";
import ProfileContent from "./ProfileContent";
import ProfileLeftContent from "./ProfileLeftContent";

function ProfilePage() {
  const [Controller, setController] = useState("personalInformation");
  return (
    <Container maxWidth="xl" className="dashboard">
      <Grid container spacing={1}>
        <Grid item lg={6} md={6} sm={12} sx={{ marginTop: "-5vh" }}>
          <ProfileLeftContent
            ControllerName={Controller}
            ControllerFunction={setController}
          />
        </Grid>

        <Grid item lg={6} sx={{ marginTop: "-5vh" }}>
          {Controller === "" && <ProfileContent />}
          {Controller === "personalInformation" && <ProfileContent />}
          {Controller === "ChangePassword" && <ChangePasswordContent />}
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfilePage;

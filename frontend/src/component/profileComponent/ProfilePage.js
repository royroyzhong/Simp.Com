import React from "react";
import ProfileContent from "./ProfileContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProfileLeftContent from "./ProfileLeftContent";
import { useState } from "react";
import ChangePasswordContent from "./ChangePasswordContent";
import Header from "../common/Header";
function ProfilePage() {
  const [Controller, setController] = useState("personalInformation");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ flexGrow: 1 }} className="status-line-wrapper">
        <Header></Header>
      </Box>
      <Grid container spacing={1} sx={{ marginTop: "-10vh" }}>
        <Grid item xs={3} sx={{ marginLeft: "8vw" }}>
          <ProfileLeftContent
            ControllerName={Controller}
            ControllerFunction={setController}
          />
        </Grid>
        <Grid item xs={5}>
          {Controller === "" && <ProfileContent />}
          {Controller === "personalInformation" && <ProfileContent />}
          {/* {Controller === "Payment" && <PaymentContent />} */}
          {Controller === "ChangePassword" && <ChangePasswordContent />}
        </Grid>
      </Grid>
    </Box>
  );
}

export default ProfilePage;

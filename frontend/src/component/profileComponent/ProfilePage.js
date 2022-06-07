import React from "react";
import ProfileContent from "./ProfileContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import ProfileLeftContent from "./ProfileLeftContent";
import { useState } from "react";
import ChangePasswordContent from "./ChangePasswordContent";
function ProfilePage() {
  const [Controller, setController] = useState("personalInformation");
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={-2}>
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

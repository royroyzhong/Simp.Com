import { Box } from "@mui/material";
import React from "react";
import { Avatar } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import PersonIcon from "@mui/icons-material/Person";
import Typography from "@mui/material/Typography";
import PaymentsIcon from "@mui/icons-material/Payments";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
function ProfileLeftContent(props) {
  const [pageName, setPageName] = useState("");
  // let pageName = "";
  const buttons = (props) => {
    return [
      <Button
        sx={{
          textTransform: "capitalize",
          justifyContent: "flex-start",
          border: "none",
        }}
        key="personalInformation"
        onClick={() => {
          setPageName("personalInformation");
        }}
        // onClick={handleController("personalInformation")}
      >
        <PersonIcon />
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            marginLeft: "20px",
          }}
        >
          Personal Information
        </Typography>
      </Button>,
      <Button
        sx={{
          textTransform: "capitalize",
          justifyContent: "flex-start",
          border: "none",
        }}
        key="Payment"
        onClick={() => {
          setPageName("Payment");
        }}
      >
        <PaymentsIcon />
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            marginLeft: "20px",
          }}
        >
          Payment
        </Typography>
      </Button>,
      <Button
        sx={{
          textTransform: "capitalize",
          justifyContent: "flex-start",
          border: "none",
        }}
        key="ChangePassword"
        onClick={() => {
          setPageName("ChangePassword");
        }}
      >
        <LockOutlinedIcon />
        <Typography
          variant="body1"
          gutterBottom
          sx={{
            marginLeft: "20px",
          }}
        >
          Change Password
        </Typography>
      </Button>,
    ];
  };
  useEffect(() => {
    props.ControllerFunction(pageName);
  }, [pageName]);
  return (
    <Box
      sx={{
        flexGrow: 1,
        border: "1px solid black",
        width: "20vw",
        height: "80vh",
        margin: "5vw",
        zIndex: "-1",
      }}
    >
      <Avatar
        sx={{ width: 100, height: 100, marginLeft: "6vw", marginTop: "10vh" }}
      >
        N
      </Avatar>
      <Box
        sx={{
          display: "flex",
          "& > *": {
            m: 1,
          },
        }}
      >
        <ButtonGroup
          orientation="vertical"
          aria-label="vertical outlined button group"
          sx={{ marginLeft: "1vw", marginTop: "18vh", width: "20vw" }}
        >
          {buttons(props)}
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default ProfileLeftContent;

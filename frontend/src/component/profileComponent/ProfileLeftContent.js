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
import quinnAvatar from "../../assets/avatar.jpg"; // mock avatar
import { Marginer } from "../../css/CommonStyle";
const containerBoxStyle = {
  flexGrow: 1,
  borderRadius: "19px",
  backgroundColor: "white",
  width: "15vw",
  height: "70vh",
  margin: "5vw",
  boxShadow: "0 0 2px rgb(20 20 20 / 50%)",
};
function ProfileLeftContent(props) {
  const [pageName, setPageName] = useState("");
  let CSSButtonStyle = {
    textTransform: "capitalize",
    justifyContent: "flex-start",
    border: "none",
  };
  const buttons = (props) => {
    return [
      <Button
        sx={CSSButtonStyle}
        key="personalInformation"
        onClick={() => {
          setPageName("personalInformation");
        }}
        // onClick={handleController("personalInformation")}
      >
        <PersonIcon />
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginLeft: "1vw",
          }}
        >
          Personal Information
        </Typography>
      </Button>,
      <Marginer direction="vertical" margin="1vh" />,
      <Button
        sx={CSSButtonStyle}
        key="Payment"
        onClick={() => {
          setPageName("Payment");
        }}
      >
        <PaymentsIcon />
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginLeft: "3vw",
          }}
        >
          Payment
        </Typography>
      </Button>,
      <Marginer direction="vertical" margin="1vh" />,
      <Button
        sx={CSSButtonStyle}
        key="ChangePassword"
        onClick={() => {
          setPageName("ChangePassword");
        }}
      >
        <LockOutlinedIcon />
        <Typography
          variant="body2"
          gutterBottom
          sx={{
            marginLeft: "1vw",
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
    <Box sx={containerBoxStyle}>
      <Marginer direction="vertical" margin="10vh" />
      <Avatar
        src={quinnAvatar}
        sx={{ width: 100, height: 100, marginLeft: "4vw" }}
      />
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
          sx={{ marginLeft: "1vw", marginTop: "10vh", width: "20vw" }}
        >
          {buttons(props)}
        </ButtonGroup>
      </Box>
    </Box>
  );
}

export default ProfileLeftContent;

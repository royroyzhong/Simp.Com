import React, { useContext } from "react";
import {
  BoldSpan,
  BoxContainer,
  SmallSpan,
  SubmitButton,
  Marginer,
} from "./CommonStyle";
import { CssTextField } from "./CommonMuiStyle";
import { useState } from "react";
import { SwitcherContext } from "./LoginPage";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
function SignUpForm() {
  const handerSwitch = useContext(SwitcherContext);
  const [isCustomer, setSwitchCustomerRole] = useState(true);
  const handleSwitchCustomerRole = () => {
    setSwitchCustomerRole(!isCustomer);
  };
  const [value, setValue] = React.useState(0);

  return (
    <BoxContainer>
      <Box sx={{ width: 500 }}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Customer"
            icon={<PersonIcon />}
            onClick={handleSwitchCustomerRole}
          />
          <BottomNavigationAction
            label="Business"
            icon={<BusinessIcon />}
            onClick={handleSwitchCustomerRole}
          />
        </BottomNavigation>
        <Marginer direction="vertical" margin="1vh" />
      </Box>
      {isCustomer === true && (
        <CssTextField
          id="outlined-email-input"
          label="Company Name"
          type="Name"
        />
      )}
      {isCustomer === true && <Marginer direction="vertical" margin="1vh" />}
      <CssTextField id="outlined-email-input" label="First Name" type="Name" />
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField id="outlined-email-input" label="Last Name" type="Name" />
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField id="outlined-email-input" label="Email" type="email" />{" "}
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField
        id="outlined-password-input"
        label="Password"
        type="password"
      />
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField
        id="outlined-password-input"
        label="Confirm Password"
        type="password"
      />
      <Marginer direction="vertical" margin="3vh" />
      <SubmitButton type="submit">Create</SubmitButton>
      <Marginer direction="vertical" margin="2vh" />
      <SmallSpan href="#">
        Already have an account?{" "}
        <BoldSpan href="#" onClick={handerSwitch}>
          Sign in
        </BoldSpan>
      </SmallSpan>
      <Marginer direction="vertical" margin="2vh" />
    </BoxContainer>
  );
}

export default SignUpForm;

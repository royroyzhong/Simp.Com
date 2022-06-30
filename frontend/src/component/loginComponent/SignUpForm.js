import React, { useContext } from "react";
import {
  BoldSpan,
  BoxContainer,
  SmallSpan,
  SubmitButton,
  Marginer,
} from "../../css/CommonStyle";
import { CssTextField } from "./CommonMuiStyle";
import { useState } from "react";
import { SwitcherContext } from "./LoginPage";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import { useDispatch } from "react-redux";
import { signupAsync } from "../../controller/login/thunks";

function SignUpForm() {
  const dispatch = useDispatch();
  const handerSwitch = useContext(SwitcherContext);
  const [isCustomer, setSwitchCustomerRole] = useState(true);
  const [isSeller, setSwitchSellerRole] = useState(true);
  const handleSwitchCustomerRole = () => {
    setSwitchCustomerRole(true);
    setSwitchSellerRole(false);
  };
  const handleSwitchSellerRole = () => {
    setSwitchCustomerRole(false);
    setSwitchSellerRole(true);
  };
  const [value, setValue] = React.useState(0);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");
  const [company, setCompany] = React.useState("");
  const handleCreate = (event) => {
    event.preventDefault();
    let account;
    if (isCustomer) {
      account = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        isSeller: !isCustomer,
      };
    } else {
      account = {
        firstName,
        lastName,
        email,
        password,
        passwordConfirm,
        company,
        isSeller,
      };
    }
    dispatch(signupAsync(account));
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setCompany("");
  };
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
            onClick={handleSwitchSellerRole}
          />
        </BottomNavigation>
        <Marginer direction="vertical" margin="1vh" />
      </Box>
      {isCustomer === false && isSeller === true && (
        <CssTextField
          id="outlined-email-input"
          label="Company Name"
          value={company || ""}
          type="Name"
          onChange={(event) => setCompany(event.target.value)}
        />
      )}
      {isCustomer === false && <Marginer direction="vertical" margin="1vh" />}
      <CssTextField
        id="outlined-email-input"
        label="First Name"
        value={firstName || ""}
        type="Name"
        onChange={(event) => setFirstName(event.target.value)}
      />
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField
        id="outlined-email-input"
        label="Last Name"
        value={lastName || ""}
        type="Name"
        onChange={(event) => setLastName(event.target.value)}
      />
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField
        id="outlined-email-input"
        label="Email"
        value={email || ""}
        type="email"
        onChange={(event) => setEmail(event.target.value)}
      />
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField
        id="outlined-password-input"
        label="Password"
        value={password || ""}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <Marginer direction="vertical" margin="1vh" />
      <CssTextField
        id="outlined-password-input"
        label="Confirm Password"
        value={passwordConfirm || ""}
        type="password"
        onChange={(event) => setPasswordConfirm(event.target.value)}
      />
      <Marginer direction="vertical" margin="3vh" />
      <SubmitButton type="submit" onClick={handleCreate}>
        Create
      </SubmitButton>
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

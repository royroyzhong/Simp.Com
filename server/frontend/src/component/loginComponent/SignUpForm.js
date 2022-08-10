import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import Box from "@mui/material/Box";
import React, { useContext, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupAsync } from "../../controller/login/thunks";
import {
  BoldSpan,
  BoxContainer,
  Marginer,
  SmallSpan,
  SubmitButton,
} from "../../css/CommonStyle";
import { CssTextField } from "./CommonMuiStyle";
import { SwitcherContext } from "./LoginPage";

const boxCSS = {
  "@media (max-width:900px)": {
    marginLeft: "30vw",
  },
};

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
  const [firstNameError, setFirstNameError] = React.useState("");
  const [lastNameError, setLastNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [passwordConfirmError, setPasswordConfirmError] = React.useState("");
  const [companyError, setCompanyError] = React.useState("");
  const handleError = (err) => {
    if (err !== undefined) {
      if (err.includes("first name")) setFirstNameError(err);
      if (err.includes("last name")) setLastNameError(err);
      if (err.includes("email")) setEmailError(err);
      if (err.includes("Missing") || err.includes("shorter"))
        setPasswordError(err);
      if (err.includes("password not match")) setPasswordConfirmError(err);
      if (err.includes("company")) setCompanyError(err);
    }
  };
  let navigate = useNavigate();
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
    dispatch(signupAsync(account)).then((result) => {
      if (result.payload.status !== 201) {
        handleError(result.payload.error);
      } else {
        if (!result.payload.role) {
          navigate("../");
        } else {
          navigate("/seller/dashboard");
        }
      }
    });
  };
  return (
    <BoxContainer>
      <Box sx={boxCSS}>
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

        {isCustomer === false && isSeller === true && (
          <CssTextField
            id="outlined-error-helper-text"
            label="Company Name"
            type="Name"
            error={companyError !== ""}
            helperText={companyError !== "" ? companyError : ""}
            onChange={(event) => {
              setCompanyError("");
              setCompany(event.target.value);
            }}
          />
        )}
        {isCustomer === false && <Marginer direction="vertical" margin="1vh" />}
        <CssTextField
          id="outlined-error-helper-text"
          label="First Name"
          type="Name"
          error={firstNameError !== ""}
          helperText={firstNameError !== "" ? firstNameError : ""}
          onChange={(event) => {
            setFirstNameError("");
            setFirstName(event.target.value);
          }}
        />
        <Marginer direction="vertical" margin="1vh" />
        <CssTextField
          id="outlined-error-helper-text"
          label="Last Name"
          type="Name"
          error={lastNameError !== ""}
          helperText={lastNameError !== "" ? lastNameError : ""}
          onChange={(event) => {
            setLastNameError("");
            setLastName(event.target.value);
          }}
        />
        <Marginer direction="vertical" margin="1vh" />
        <CssTextField
          id="outlined-error-helper-text"
          label="Email"
          type="email"
          error={emailError !== ""}
          helperText={emailError !== "" ? emailError : ""}
          onChange={(event) => {
            setEmailError("");
            setEmail(event.target.value);
          }}
        />
        <Marginer direction="vertical" margin="1vh" />
        <CssTextField
          id="outlined-error-helper-text"
          label="Password"
          type="password"
          error={passwordError !== ""}
          helperText={passwordError !== "" ? passwordError : ""}
          onChange={(event) => {
            setPasswordError("");
            setPassword(event.target.value);
          }}
        />
        <Marginer direction="vertical" margin="1vh" />
        <CssTextField
          id="outlined-error-helper-text"
          label="Confirm Password"
          type="password"
          error={passwordConfirmError !== ""}
          helperText={passwordConfirmError !== "" ? passwordConfirmError : ""}
          onChange={(event) => {
            setPasswordConfirmError("");
            setPasswordConfirm(event.target.value);
          }}
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
      </Box>
    </BoxContainer>
  );
}

export default SignUpForm;

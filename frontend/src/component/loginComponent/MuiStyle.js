import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styled } from "@mui/material/styles";

import "../../css/login.css";
const Root = styled("div")(({ theme }) => ({
  padding: theme.spacing(1),
  [theme.breakpoints.down("md")]: {
    marginLeft: "5vw",
  },
  [theme.breakpoints.down("sm")]: {
    marginLeft: "2vw",
  }
}));
function MuiStyle() {
  return (
    <Root>
      <FormGroup className="rememberMe">
        <FormControlLabel
          defaultChecked
          size="small"
          control={<Checkbox defaultChecked />}
          label="Remember Me"
        />
      </FormGroup>
    </Root>
  );
}

export default MuiStyle;

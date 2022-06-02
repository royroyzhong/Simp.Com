import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import "../../css/login.css";
function MuiStyle() {
  return (
    <>
      <FormGroup className="rememberMe">
        <FormControlLabel
          defaultChecked
          size="small"
          control={<Checkbox defaultChecked />}
          label="Remember Me"
        />
      </FormGroup>
    </>
  );
}

export default MuiStyle;

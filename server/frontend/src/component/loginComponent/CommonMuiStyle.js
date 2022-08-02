import TextField from "@mui/material/TextField";
import { styled } from "@mui/material/styles";

export const CssTextField = styled(TextField)({
  width: "24.5vw",
  "@media (max-width:900px)": {
    width: "50.5vw",
  },
});

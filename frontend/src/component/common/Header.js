// MUI Components
import { Avatar, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

import { quinn } from "../../utils/mockFetch"; // mock user
import quinnAvatar from "../../assets/avatar.jpg"; // mock avatar

export default function Header(prop) {
  return (
    <Grid container spacing={3}>
      <Grid item xs>
        <Box>
          <p>Hello {quinn.name}</p>
        </Box>
      </Grid>
      <Grid item xs={"auto"}>
        {prop.display == null && <SearchBar />}
      </Grid>
      <Grid item xs={"auto"}>
        <Box>
          <h4>{quinn.name}</h4>
        </Box>
      </Grid>
      <Grid item xs={"auto"}>
        <Avatar alt="Remy Sharp" src={quinnAvatar} />
      </Grid>
    </Grid>
  );
}

function SearchBar(props) {
  return (
    <Box>
      <SearchIcon sx={{ fontSize: 40, color: "grey" }}></SearchIcon>
      <TextField variant="outlined" label="Search" size="small"></TextField>
    </Box>
  );
}

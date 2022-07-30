// MUI Components
import {
  Card,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Stack
} from "@mui/material";
import { Box, Container } from "@mui/system";
// Other Imports
import { useSelector } from "react-redux";
// Recahrt Components
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import { getSellerOrder, getStats, getTopProducts } from "../../controller/sellerSlice";
import "../../css/dashboard.css";
import Title from "../common/Title";

// Fake resources...

export default function Dashboard(props) {
  //let orders = useSelector(getSellerOrder);

  let infographStyle = {
    padding: 2,
    marginTop: 4,
  };

  return (
    <Container maxWidth="lg" className="dashboard" sx={{md:4, mt:4}}>
      <Card
        className="infograph-wrapper"
        variant="outlined"
        sx={infographStyle}
      >
        <InfoGraph />
      </Card>
      <Box sx={{ marginTop: 4 }}>
        <ProcessingList />
      </Box>
    </Container>
  );
}

function InfoGraph() {
  let stats = useSelector(getStats);

  let data = [
    {
      day: "Monday",
      numorders: 1000,
    },
    {
      day: "Tuesday",
      numorders: 1299,
    },
    {
      day: "Wednesday",
      numorders: 1023,
    },
    {
      day: "Thursday",
      numorders: 889,
    },
    {
      day: "Friday",
      numorders: 1120,
    },
    {
      day: "Saturday",
      numorders: 996,
    },
    {
      day: "Sunday",
      numorders: 667,
    },
  ];
  return (
    <Stack
      direction={"row"}
      spacing={2}
      divider={<Divider orientation="vertical" flexItem></Divider>}
    >
      <Box>
        <Title>Weekly Overview</Title>
        <LineChart
          width={600}
          height={300}
          data={data}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="day" />
          <YAxis></YAxis>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line
            type="monotone"
            dataKey="numorders"
            stroke="#3751FF"
            yAxisId={0}
          />
        </LineChart>
      </Box>
      <Box sx={{ width: "100%" }}>
        <List>
          <ListItem>Best Seller</ListItem>
          <ListItem>
            <ListItemText primary={stats.bestSeller} />
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Stack>
  );
}

function ProcessingList(props) {
  //let awaitingActions = ["#266898", "#749877"];
  let orders = useSelector(getSellerOrder);
  let topProducts = useSelector(getTopProducts);

  return (
    <Stack direction={"row"} spacing={2}>
      <Card variant="outlined" sx={{ width: "50%" }}>
        <Title>Statistics</Title>
        <List>
          {orders.map((a, i) => (
            <ListItem key={i}>{a}</ListItem>
          ))}
        </List>
      </Card>
      <Card variant="outlined" sx={{ width: "50%" }}>
        <Title>Top Products</Title>
        <List>
          {topProducts.map((p, i) => (
            <ListItem key={i}>{p}</ListItem>
          ))}
        </List>
      </Card>
    </Stack>
  );
}

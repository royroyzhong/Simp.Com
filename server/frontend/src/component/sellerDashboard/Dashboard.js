// MUI Components
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemText,
  Stack,
} from "@mui/material";
import { Box, Container } from "@mui/system";
// Other Imports
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// Recahrt Components
import {
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Legend,
  Bar,
} from "recharts";
import {
  getSellerOrder,
  getStats,
  getTopProducts,
  getSellerOrderDetail,
  getSellerOrderStatus,
  getDatasets,
} from "../../controller/sellerSlice";
import { getSellerOrderAsync } from "../orders/orderThunks";
import "../../css/dashboard.css";
import Title from "../common/Title";
import { REQUEST_STATE } from "../../controller/utils";

export default function Dashboard(props) {
  let orderStats = useSelector(getSellerOrder);
  let datasets = useSelector(getDatasets);
  let topProducts = useSelector(getTopProducts);
  let stats = useSelector(getStats);
  let sellerOrderStatus = useSelector(getSellerOrderStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    if (sellerOrderStatus !== REQUEST_STATE.FULFILLED) {
      dispatch(getSellerOrderAsync());
    }
  }, [dispatch, sellerOrderStatus]);

  let infographStyle = {
    padding: 2,
    marginTop: 4,
  };

  return (
    <Container maxWidth="lg" className="dashboard" sx={{ md: 4, mt: 4 }}>
      <Card
        className="infograph-wrapper"
        variant="outlined"
        sx={infographStyle}
      >
        <InfoGraph stats={stats} />
      </Card>

      <Box sx={{ marginTop: 4 }}>
        <ProcessingList
          orders={orderStats}
          topProducts={topProducts}
          datasets={datasets}
        />
      </Box>
    </Container>
  );
}

function InfoGraph(props) {
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
            <ListItemText primary={props.stats.bestSeller} />
          </ListItem>
          <Divider />
        </List>
      </Box>
    </Stack>
  );
}

function ProcessingList(props) {
  console.log(props.datasets.barChart);
  return (
    <Stack direction={"row"} spacing={2}>
      <Card variant="outlined" sx={{ width: "50%" }}>
        <Title>Statistics</Title>
        <BarChart
          width={500}
          height={300}
          data={props.datasets.barChart}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="length" fill="#8884d8" />
        </BarChart>
      </Card>

      <Card variant="outlined" sx={{ width: "50%" }}>
        <Title>Top Products</Title>
        <BarChart
          width={500}
          height={300}
          data={props.datasets.product}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Incomes" fill="#8884d8" />
          <Bar dataKey="Quantity" fill="#82ca9d" />
        </BarChart>
      </Card>
    </Stack>
  );
}

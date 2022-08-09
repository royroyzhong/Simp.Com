// MUI Components
import {
  Card,
  Stack,
} from "@mui/material";
import { Box, Container } from "@mui/system";
// Other Imports
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
// Recahrt Components
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Legend,
  Bar,
  Label
} from "recharts";
import {
  getSellerOrder,
  getTopProducts,
  getSellerOrderStatus,
  getDatasets,
} from "../../controller/sellerSlice";
import { getSellerOrderAsync } from "../orders/orderThunks";
import "../../css/dashboard.css";
import Title from "../common/Title";
import { REQUEST_STATE } from "../../controller/utils";

export default function Dashboard(props) {
  let datasets = useSelector(getDatasets);
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
        <InfoGraph lineChartSet={datasets.lineChart} />
      </Card>

      <Box sx={{ marginTop: 2 }}>
        <ProcessingList
          datasets={datasets}
        />
      </Box>
    </Container>
  );
}

function InfoGraph(props) {
  return (
      <Box>
        <Title>Monthly Overview</Title>
        <LineChart
          width={1000}
          height={300}
          data={props.lineChartSet}
          margin={{ top: 4, right: 20, left: 10, bottom: 5 }}
        >
          <XAxis dataKey="month" />
          <YAxis><Label value='Dollar($)' angle={-90} position='insideLeft'/></YAxis>
          <Tooltip />
          <CartesianGrid stroke="#f5f5f5" />
          <Line
            type="monotone"
            dataKey="totalSale"
            stroke="#3751FF"
            yAxisId={0}
          />
        </LineChart>
      </Box>
  );
}

function ProcessingList(props) {
  return (
    <Stack direction={"row"} spacing={2}>
      <Card variant="outlined" sx={{ width: "50%" }}>
        <Title>Order Stat</Title>
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
          <YAxis><Label value='# of Order' angle={-90} position='insideLeft'/></YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="Quantity" fill="#8884d8" />
        </BarChart>
      </Card>

      <Card variant="outlined" sx={{ width: "50%" }}>
        <Title>Product Stat</Title>
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
          <YAxis><Label value='Dollar($)' angle={-90} position='insideLeft'/></YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="Incomes" fill="#8884d8" />
          <Bar dataKey="Quantity" fill="#82ca9d" />
        </BarChart>
      </Card>
    </Stack>
  );
}

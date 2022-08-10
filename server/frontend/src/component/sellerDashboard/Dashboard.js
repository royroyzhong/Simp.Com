// MUI Components
import { Card, Stack } from "@mui/material";
import { Box, Container } from "@mui/system";
// Other Imports
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Recahrt Components
import {
  Bar,
  BarChart,
  CartesianGrid,
  Label,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  Pie,
  PieChart,
  Cell
} from "recharts";
import { getDatasets } from "../../controller/sellerSlice";
import "../../css/dashboard.css";
import Title from "../common/Title";
import { getSellerOrderAsync } from "../orders/orderThunks";

export default function Dashboard(props) {
  let datasets = useSelector(getDatasets);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getSellerOrderAsync());
  }, [dispatch]);

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
        <ProcessingList datasets={datasets} />
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
        <YAxis>
          <Label value="Dollar($)" angle={-90} position="insideLeft" />
        </YAxis>
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

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', "#8884d8"];

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
          <YAxis>
            <Label value="# of Order" angle={-90} position="insideLeft" />
          </YAxis>
          <Tooltip />
          <Legend />
          <Bar dataKey="Quantity" fill="#8884d8" />
        </BarChart>
      </Card>

      <Card variant="outlined" sx={{ width: "50%" }}>
        <Title>Top 5 Product Stat</Title>
        <PieChart width={500} height={300} >
          <Pie
            dataKey="Quantity"
            data={props.datasets.product}
            isAnimationActive={false}
            cx="50%"
            cy="50%"
            label
            outerRadius={110}
            fill="#8884d8"
          >
          {props.datasets.product?.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </Card>
    </Stack>
  );
}

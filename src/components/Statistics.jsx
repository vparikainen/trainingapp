import { useEffect, useState } from "react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  Label,
} from "recharts";
import _ from "lodash";
import Container from "@mui/material/Container";

function Statistics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = () => {
    fetch(import.meta.env.VITE_API_URL + "/gettrainings")
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "Error while fetching training data." + response.statusText
          );
      })
      .then((trainings) => {
        const groupedActivities = _.groupBy(trainings, "activity");
        const summarizedActivities = _.map(
          groupedActivities,
          (activities, name) => ({
            name,
            amount: _.sumBy(activities, "duration"),
          })
        );
        setData(summarizedActivities);
      })
      .catch((err) => console.error(err));
  };

  return (
    <Container maxWidth="xl">
      <BarChart width={730} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis>
          <Label
            value="Duration (min)"
            position="insideLeft"
            angle={-90}
            style={{ textAnchor: "middle" }}
          />
        </YAxis>
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </Container>
  );
}

export default Statistics;

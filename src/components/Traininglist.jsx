import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import AddTraining from "./AddTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const [columnDefs] = useState([
    { cellRenderer: params =>
    <Button
      size="small"
      startIcon={<DeleteIcon />}
      onClick={() => deleteTraining(params.data.id)}
      >
    </Button>,
    width: 70 },
    { field: "activity", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true, valueFormatter: (params) => {
      return dayjs(params.value).format("DD.MM.YYYY hh:mm")}},
    { field: "duration", sortable: true, filter: true },
    { headerName: "customer", valueGetter: (params) => {
      return params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : '';
    }, sortable: true, filter: true },
]);

  const fetchTrainings = () => {
    fetch(import.meta.env.VITE_API_URL + "/gettrainings")
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "Error while fetching traingings." + response.statusText
          );
      })
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  const deleteTraining = (id) => {
    if (window.confirm("Are you sure you want to delete training?")) {
      const deleteUrl = `${import.meta.env.VITE_API_URL}/api/trainings/${id}`;
      fetch(deleteUrl, { method: "DELETE" })
      .then((response) => {
        if (response.ok) fetchTrainings();
        else throw new Error("Error in DELETE: " + response.statusText);
      })
      .catch((err) => console.error(err))
    }
  };

  <AddTraining fetchTrainings={fetchTrainings}/> 
  
    return (
    <>

      <div className="ag-theme-material" style={{ width: "80%", height: 600 }}>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          Trainings
        </Typography>
        <AgGridReact
          rowData={trainings}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default Traininglist;

import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from 'dayjs';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Traininglist() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const [columnDefs] = useState([
    { field: "activity", sortable: true, filter: true },
    { field: "date", sortable: true, filter: true, valueFormatter: (params) => {
      return dayjs(params.value).format("DD.MM.YYYY hh:mm")}},
    { field: "duration", sortable: true, filter: true },
    { headerName: "customer", valueGetter: (params) => {
      return params.data.customer ? `${params.data.customer.firstname} ${params.data.customer.lastname}` : '';
    }, sortable: true, filter: true },
]);

  const fetchTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
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

  return (
    <>
      <div className="ag-theme-material" style={{ width: "80%", height: 600 }}>
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

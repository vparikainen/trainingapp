import { useEffect, useState, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import Typography from "@mui/material/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customerlist() {
  const [customers, setCustomers] = useState([]);
  const gridRef = useRef(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [columnDefs] = useState([
    {
      cellRenderer: (params) => {
        const customerId = extractCustomerId(params.data.links);
        return (
          <Tooltip title="Delete">
            <Button
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => deleteCustomer(customerId)}
            ></Button>
          </Tooltip>
        );
      },
      exportSuppress: true,
      width: 70,
    },

    {
      cellRenderer: (params) => {
        const customerId = extractCustomerId(params.data.links);
        return (
          <EditCustomer
            fetchCustomers={fetchCustomers}
            data={params.data}
            customerId={customerId}
          />
        );
      },
      exportSuppress: true,
      width: 70,
    },
    {
      cellRenderer: (params) => {
        const customerData = params.data.links.find(
          (link) => link.rel === "customer"
        );
        const customerLink = customerData ? customerData.href : "";
        return <AddTraining data={params.data} customerLink={customerLink} />;
      },
      exportSuppress: true,
    },
    { field: "firstname", sortable: true, filter: true, width: 150 },
    { field: "lastname", sortable: true, filter: true, width: 150 },
    { field: "email", sortable: true, filter: true, width: 150 },
    { field: "phone", sortable: true, filter: true, width: 150 },
    { field: "streetaddress", sortable: true, filter: true, width: 150 },
    { field: "postcode", sortable: true, filter: true, width: 150 },
    { field: "city", sortable: true, filter: true, width: 150 },
  ]);

  const fetchCustomers = () => {
    fetch(import.meta.env.VITE_API_URL + "/api/customers")
      .then((response) => {
        if (response.ok) return response.json();
        else
          throw new Error(
            "Error while fetching customers." + response.statusText
          );
      })
      .then((data) => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const extractCustomerId = (links) => {
    const customerLink = links.find((link) => link.rel === "customer");
    if (customerLink) {
      const parts = customerLink.href.split("/");
      return parts[parts.length - 1];
    }
    return null;
  };

  const deleteCustomer = (customerId) => {
    if (window.confirm("Are you sure you want to delete customer?")) {
      fetch(import.meta.env.VITE_API_URL + `/api/customers/${customerId}`, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) fetchCustomers();
          else throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch((err) => console.error(err));
    }
  };

  const exportToCSV = () => {
    if (gridRef && gridRef.current && gridRef.current.api) {
      const columnsToExport = gridRef.current.columnApi
        .getAllColumns()
        .filter((column) => !column.getColDef().exportSuppress);

      const params = {
        columnKeys: columnsToExport.map((column) => column.getColId()),
        fileName: "customers.csv",
        suppressQuotes: true,
        includeHeaders: false,
      };

      gridRef.current.api.exportDataAsCsv(params);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" component="div">
          Customers
        </Typography>
        <ButtonGroup variant="text">
            <AddCustomer fetchCustomers={fetchCustomers} />
          <Tooltip title="Download CSV">
            <Button
              startIcon={<FileDownloadIcon />}
              onClick={exportToCSV}
            ></Button>
          </Tooltip>
        </ButtonGroup>
      </div>

      <div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
          ref={gridRef}
        />
      </div>
    </>
  );
}

export default Customerlist;

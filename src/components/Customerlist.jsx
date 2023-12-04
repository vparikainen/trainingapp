import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import AddTraining from "./AddTraining";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

function Customerlist() {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const [columnDefs] = useState([
    {
      cellRenderer: params => {
        const customerId = extractCustomerId(params.data.links);
        return (
          <Button
          size ="small"
          startIcon={<DeleteIcon />}
          onClick={() => deleteCustomer(customerId)}
          >
        </Button>
        );
      }, width: 70
    },

    {
      cellRenderer: params => {
        const customerId = extractCustomerId(params.data.links);
        return (
          <EditCustomer
            fetchCustomers={fetchCustomers}
            data={params.data}
            customerId={customerId}
          />
        );
      },
      width: 70,
    },
    { 
      cellRenderer: params => {
        const customerData = params.data.links.find(link => link.rel === "customer");
        const customerLink = customerData ? customerData.href : '';
        return (
          <AddTraining
          data={params.data}
          customerLink={customerLink}
          />
        );
    }
    },
    { field: "firstname", sortable: true, filter: true, width: 150, },
    { field: "lastname", sortable: true, filter: true, width: 150, },
    { field: "email", sortable: true, filter: true, width: 150, },
    { field: "phone", sortable: true, filter: true, width: 150, },
    { field: "streetaddress", sortable: true, filter: true, width: 150, },
    { field: "postcode", sortable: true, filter: true, width: 150, },
    { field: "city", sortable: true, filter: true, width: 150, },
    
  ]);

  const fetchCustomers = () => {
    fetch(import.meta.env.VITE_API_URL + "/api/customers")
      .then((response) => {
        if (response.ok) return response.json();
        else throw new Error("Error while fetching customers." + response.statusText);
      })
      .then(data => setCustomers(data.content))
      .catch((err) => console.error(err));
  };

  const extractCustomerId = (links) => {
    const customerLink = links.find(link => link.rel === "customer");
    if (customerLink) {
      const parts = customerLink.href.split("/");
      return parts[parts.length - 1];
    }
    return null;
  };

  const deleteCustomer = (customerId) => {
    if(window.confirm("Are you sure you want to delete customer?")) {
      fetch(import.meta.env.VITE_API_URL + `/api/customers/${customerId}`, { method: 'DELETE' })
        .then((response) => {
          if (response.ok) fetchCustomers();
          else throw new Error("Error in DELETE: " + response.statusText);
        })
        .catch((err) => console.error(err)); 
    }
  };

  return (
    <>
    <AddCustomer fetchCustomers={fetchCustomers} />
      <div className="ag-theme-material" style={{ width: "90%", height: 600 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
          Customers
        </Typography>
        <AgGridReact
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationAutoPageSize={true}
        />
      </div>
    </>
  );
}

export default Customerlist;

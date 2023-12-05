import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import { useState } from "react";

import Customerlist from "./components/Customerlist.jsx";
import Traininglist from "./components/Traininglist.jsx";
import TrainingCalendar from "./components/TrainingCalendar.jsx";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuItemClick = (menu) => {
  setSelectedMenu(menu);
  setIsDrawerOpen(false);
}

const renderSelectedList = () => {
  switch (selectedMenu) {
    case "Customer": return <Customerlist />;
    case "Training": return <Traininglist />;
    case "Calendar": return <TrainingCalendar />;
    default: return <Customerlist />
  }
}
 
  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2}}
            onClick={() => setIsDrawerOpen(true)}
            >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Training App</Typography>
          
          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <List>
              <ListItem>
                <ListItemButton onClick={() => handleMenuItemClick("Customer")}>
                <ListItemText primary="Customer"/>
              </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={()=> handleMenuItemClick("Training")}>
                <ListItemText primary="Training"/>
              </ListItemButton>
              </ListItem>    
              <ListItem>
                <ListItemButton onClick={() => handleMenuItemClick("Calendar")}>
                <ListItemText primary="Calendar"/>
              </ListItemButton>
              </ListItem>
            </List>
          </Drawer>

        </Toolbar>
      </AppBar>
      {renderSelectedList()}
    </Container>
  );
}

export default App
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
import ListItemIcon from "@mui/material/ListItemIcon";
import { useState } from "react";
import PortraitIcon from "@mui/icons-material/Portrait";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartIcon from "@mui/icons-material/BarChart";

import Customerlist from "./components/Customerlist.jsx";
import Traininglist from "./components/Traininglist.jsx";
import TrainingCalendar from "./components/TrainingCalendar.jsx";
import Statistics from "./components/Statistics.jsx";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);

  const handleMenuItemClick = (menu) => {
    setSelectedMenu(menu);
    setIsDrawerOpen(false);
  };

  const renderSelectedList = () => {
    switch (selectedMenu) {
      case "Customer":
        return <Customerlist />;
      case "Training":
        return <Traininglist />;
      case "Calendar":
        return <TrainingCalendar />;
      case "Statistics":
        return <Statistics />;
      default:
        return <Customerlist />;
    }
  };

  return (
    <Container maxWidth="xl">
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setIsDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Training App</Typography>

          <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
            <List>
              <ListItem>
                <ListItemButton onClick={() => handleMenuItemClick("Customer")}>
                  <ListItemIcon>
                    <PortraitIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Customer" />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => handleMenuItemClick("Training")}>
                  <ListItemIcon>
                    <DirectionsRunIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Training" />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton onClick={() => handleMenuItemClick("Calendar")}>
                  <ListItemIcon>
                    <CalendarMonthIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Calendar" />
                </ListItemButton>
              </ListItem>

              <ListItem>
                <ListItemButton
                  onClick={() => handleMenuItemClick("Statistics")}>
                  <ListItemIcon>
                    <BarChartIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText primary="Statistics" />
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

export default App;

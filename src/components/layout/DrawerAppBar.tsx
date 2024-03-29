import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import AttachEmailIcon from "@mui/icons-material/AttachEmail";

import DashboardHome from "../navbar/Home";
import About from "../navbar/About";
import Contact from "../navbar/Contact";
import DashboardSelectEvents from "../../components/SelectEvents";

import Category2 from "../category/UserRegCategory";
import SelectPayload from "../template/SelectPayload";

interface Props {
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];
const navItemsSideBar = ["Home", "Template"];

export default function DrawerAppBar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        <AttachEmailIcon />
      </Typography>
      <Divider />
      <List>
        {navItemsSideBar.map((item) => (
          <Link
            key={item}
            to={`/${item.toLowerCase()}`}
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: "center" }}>
                <ListItemText primary={item} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1,fontStyle:"italic", display: { xs: "none", sm: "block" } }}
          >
              <img style={{height:"80px"}} src="/media/emailTemplate.png" alt="girl one"/>
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: "#fff" }}>
                <Link
                  key={item}
                  to={`/${item.toLowerCase()}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ListItem disablePadding>
                    <ListItemButton sx={{ textAlign: "center" }}>
                      <ListItemText primary={item} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>

      <nav>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
        <div>
          <Routes>
            <Route path="/" element={<DashboardHome />} />
            <Route path="/home" element={<DashboardHome />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/template" element={<SelectPayload />} />
            <Route
              path="/dashboard/about"
              element={<DashboardSelectEvents />}
            />

            <Route path="/UserReg" element={<Category2 />} />
          </Routes>
        </div>
      </Box>
    </Box>
  );
}

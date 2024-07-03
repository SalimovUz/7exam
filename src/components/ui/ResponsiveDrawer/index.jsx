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
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, ListItemText } from "@mui/material";
import { LogOut } from "@modal";
import routes from "../../../router/routes";
import Logo from "../../../assets/Logo.svg";
import { Profile } from "@modal";
// import { Menu, Transition } from "@headlessui/react";
// import { ChevronDownIcon } from "@heroicons/react";

const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  // const handleIconClick = () => {
  //   setProfileModal(true);
  // };

  const closeModal = () => {
    setProfileModal(false);
  };

  const saveProfile = (profile) => {
    setUserProfile(profile);
  };

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div>
      <Toolbar>
        <img src={Logo} alt="logo" className="w-[144px]" />
      </Toolbar>
      <Divider />
      <List>
        {routes.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={
              item.path === pathname ? "block bg-[#10898D] text-white" : ""
            }
          >
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <span
                    className={
                      item.path === pathname ? "text-white" : "text-gray-500"
                    }
                  >
                    {item.icon}
                  </span>
                </ListItemIcon>
                <ListItemText primary={item?.content} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: { sm: `#10898D` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <ListItem sx={{ justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap component="div">
              Responsive drawer
            </Typography>
            <div className="flex items-center space-x-4">
              {/* <AccountCircleIcon
                sx={{ height: 40, width: 40 }}
                className="cursor-pointer"
                onClick={handleIconClick}
              /> */}
              <Profile onClose={closeModal} saveProfile={saveProfile} isOpen={isOpen} />
              <LogOut />
            </div>
          </ListItem>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },

            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
      {/* <Profile
        isOpen={isOpen}
        closeModal={closeModal}
        userProfile={{}}
        saveProfile={() => {}}
      /> */}
    </Box>
  );
}

export default ResponsiveDrawer;

import React, { useContext } from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { ExpandLess, ExpandMore, Menu, ReportProblem, StarBorder } from "@mui/icons-material";
import Avatar from "@mui/material/Avatar";
import { Collapse, ListItemButton } from "@mui/material";
import { toast } from "react-toastify";
import { images } from "../../constants/index";

import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import { UserDispatchContext } from "../../context/UserProvider";

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    left: false,
  });
  const setToken = useContext(UserDispatchContext);

  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    toast.success("Logged out!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setToken(localStorage.clear());
    navigate("/login");
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role='presentation'
      className='sidebar'
      onKeyDown={toggleDrawer(anchor, false)}>
      <List>
        <ListItem>
          <Avatar sx={{ padding: "0.75rem" }}>
            {localStorage
              .getItem("name")
              ?.split(" ")
              .map((val) => val[0])}
          </Avatar>
        </ListItem>
        <ListItem sx={{ flexDirection: "column", alignItems: "flex-start" }}>
          <h2>{localStorage.getItem("name")}</h2>
          <ListItemButton
            sx={{ px: "0", pt: "0", pb: "0", width: "100%" }}
            onClick={handleClick}>
            <ListItemText
              sx={{ py: "0" }}
              primary={localStorage.getItem("email")}
            />
          </ListItemButton>
          <Collapse in={open} timeout='auto' unmountOnExit>
            <List component='div' disablePadding>
              <ListItemButton sx={{ pl: 1 }}>
                <ListItemIcon className='sidebar__listIcon'>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary='Starred' />
              </ListItemButton>
            </List>
          </Collapse>
        </ListItem>
      </List>
      <Divider sx={{ opacity: "0.7" }} />
      <List className='sidebar__list'>
        {["Complaint Board", "Terms & Conditions", "Settings"].map(
          (text, index) => (
            <ListItem button key={text}>
              <ListItemIcon className='sidebar__listIcon'>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          )
        )}
      </List>
      <Divider sx={{ opacity: "0.4" }} />
      <List className='sidebar__list'>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon className='sidebar__listIcon'>
            <MailIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>

        <ListItem
          sx={{ flexDirection: "column", alignItems: "flex-start", mt: 3 }}>
          <img src={images.SidebarLogo} alt='Sidebar_LogoIcon' />
          <p className='sidebar__releaseDate'>Bay app v 0.1 beta release</p>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Menu className='header__menu' onClick={toggleDrawer(anchor, true)} />
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}>
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default Sidebar;

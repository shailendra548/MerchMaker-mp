import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useAdminContext } from "../../context/AdminProvider";

const drawerWidth = 230;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DashboardContainer({ children }) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const { logout } = useAdminContext();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        style={{
          color: "#9c3353",
          backgroundColor: "#f0efef",
          height: "70px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            <a className="navbar-brand mt-2 mt-lg-0" href="/main/home">
              <img
                style={{ marginLeft: "30px" }}
                src="\logo.png"
                height={55}
                alt="InvestUp logo"
                loading="lazy"
              />
            </a>
          </Typography>
          <Box sx={{ ml: "auto" }}>
            <button
              onClick={logout}
              type="submit"
              class="btn px-3 me-2"
              style={{ backgroundColor: "#9c3353", color: "white" }}
            >
              Logout
            </button>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: " #f0efef",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <a className="navbar-brand mt-4" href="/main/home">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              <i class="fas fa-home   me-4 "></i>
              &nbsp; Home
            </p>
          </div>
        </a>

        <a className="navbar-brand mt-2 " href="/investor/profile">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              {" "}
              <i class="fa fa-user-circle me-4" aria-hidden="true"></i>
              &nbsp; Edit profile
            </p>
          </div>
        </a>

        <a className="navbar-brand mt-2 " href="/admin/addmerch">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              <i class="fa-solid fa-shirt"></i>
              &nbsp; &nbsp; &nbsp; Add Merch
            </p>
          </div>
        </a>
        <a className="navbar-brand mt-2 " href="/admin/managemerch">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              <i class="fa-solid fa-shirt"></i>
              &nbsp; &nbsp; &nbsp; Manage Merch
            </p>
          </div>
        </a>

        <a className="navbar-brand mt-2 " href="/main/investorlist">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              <i class="fa fa-th-list me-4" aria-hidden="true"></i>
              &nbsp; Investor List
            </p>
          </div>
        </a>
        <Divider />
        <a className="navbar-brand mt-4" href="/startup/chat">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              <i class="fas fa-inbox  me-4 "></i>
              &nbsp; Chat
            </p>
          </div>
        </a>

        <a className="navbar-brand mt-2" href="/main/consultancy">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              <i class="fas fa-comment-dots  me-4  "></i>
              &nbsp; Consultancy
            </p>
          </div>
        </a>

        {/* <List  >
          {['StartupList', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
        <Divider />

        <a className="navbar-brand mt-4" href="/main/blogbrowser">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              <i class="fab fa-readme me-4  " style={{ color: "black" }}></i>
              &nbsp; Blog
            </p>
          </div>
        </a>

        <a className="navbar-brand mt-2 " href="/main/newsbrowser">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              <i class="fas fa-book-open fa-xm me-4  "></i>
              &nbsp; News
            </p>
          </div>
        </a>

        <a className="navbar-brand mt-2 " href="/main/campaignbrowser">
          <div
            className="col ms-4"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p>
              <i class="fa fa-bookmark me-4" aria-hidden="true"></i>
              &nbsp; Campaign
            </p>
          </div>
        </a>
        <Divider />

        {/* <List >
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding  >
              <ListItemButton >
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText  primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}

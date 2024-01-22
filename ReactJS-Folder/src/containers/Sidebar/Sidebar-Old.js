import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import './Overide.css'

// Importing Icons
import MaterialIcon from 'material-icons-react';
const drawerWidth = 240;
// Array of all the pages that our sidebar will have, Title represents the text that will be displayed on the sidebar
// desc is the component that will be rendered when the page is selected


const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleTabClick = (idx) =>{
    props.changeTab(idx+1)
  }
  return (
    <Box sx={{ display: 'flex', height: "100vh" }}>
      <CssBaseline />
      <Drawer variant="permanent" sx={{backgroundColor: "#f2f2f2"}} open={open}>
        <Box sx={{ backgroundColor: "#7694ff", width: "100%", flexGrow: "1"}}> </Box>
        <List>
          <ListItem button sx={{height: "40px", justifyContent: !open? "flex-start":"flex-end"}} onClick={open ? handleDrawerClose:handleDrawerOpen}>
            {!open && <MaterialIcon icon="menu" size='small' color="#000000" />}
            {open && <MaterialIcon icon="chevron_left" size='small' color="#000000" />}
          </ListItem>
          {props.tabs.map((tab, index) => (
            <ListItem button key={index}  onClick={()=> handleTabClick(index)}>
              <ListItemIcon>
                {tab.icon}
              </ListItemIcon>
              <ListItemText primary={tab.title} />
            </ListItem>
          ))}
        </List>
        <Box sx={{ backgroundColor: "#7694ff", width: "100%", flexGrow: "1" }}> </Box>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
            {props.tabs[props.activeTab-1].desc}
        </Typography>
      </Box>
    </Box>
  );
}

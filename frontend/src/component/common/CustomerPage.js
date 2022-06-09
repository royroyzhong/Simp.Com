import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Navigator from '../navigator/Navigator';
import CustomerPageRigheContent from "../customerPageComponent/CustomerPageRightContent";
import ProductBoard from '../sellerDashboard/ProductCompactView';
import Dashboard from '../sellerDashboard/Dashboard';

let theme = createTheme({});
theme = {
  ...theme,
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#363740',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            color: '#4fc3f7',
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontSize: 14,
          fontWeight: theme.typography.fontWeightMedium,
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: 'inherit',
          minWidth: 'auto',
          marginRight: theme.spacing(2),
          '& svg': {
            fontSize: 20,
          },
        },
      },
    },
  },
};

const drawerWidth = 256;

export default function Paperbase(props) {

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', minHeight: '200vh' }}>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          <Navigator
            PaperProps={{ style: { width: drawerWidth } }}
            sx={{ display: { sm: 'block', xs: 'none' } }}
          />
        </Box>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#F7F8FC'}}>

            {/* <CustomerPageRigheContent /> */}
          {/* <ProductBoard />  */}
          {/* <Dashboard />  */}
          {props.children}
        </Box>
      </Box>
    </ThemeProvider>
  );
}


import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { DemoProvider, useDemoRouter } from '@toolpad/core/internal';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import Visualize from './Visualize';
import Profile from './Profile';


const NAVIGATION = [
  {
    segment: 'visualize',
    title: 'Visualize',
    icon: <EqualizerIcon />,
  },
  {
    segment: 'history',
    title: 'History',
    icon: <HistoryIcon />,
  },
   {
    segment: 'profile',
    title: 'Profile',
    icon: <PersonIcon />,
  },
];

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: 'data-toolpad-color-scheme',
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DemoPageContent({ pathname }) {
  if (pathname === '/visualize') {
    return <Visualize />;
  }
   if (pathname === '/profile') {
    return <Profile/>;
  }
   if (pathname === '/history') {
    return <p>History</p>
  }
  return (
  <Visualize/>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function DashboardLayoutBranding(props) {
  const { window } = props;

  const router = useDemoRouter('/dashboard');

  // Remove this const when copying and pasting into your project.
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    // Remove this provider when copying and pasting into your project.
    <DemoProvider window={demoWindow}>
        <AppProvider
          navigation={NAVIGATION}
          branding={{
            logo: <img style={{ paddingBottom:"8px", height:"3rem"}} src="/dashboardLogo.png" alt="excel-logo" />,
            title: <b style={{fontSize:"1.5rem"}}>Excellytics</b>,
            // homeUrl: '/toolpad/core/introduction',
          }}
          router={router}
          theme={demoTheme}
          window={demoWindow}
        >
          <DashboardLayout>
            <DemoPageContent pathname={router.pathname} />
          </DashboardLayout>
        </AppProvider>
    </DemoProvider>
  );
}

DashboardLayoutBranding.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default DashboardLayoutBranding;

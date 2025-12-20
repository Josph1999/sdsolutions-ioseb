import { createTheme, ThemeOptions } from '@mui/material/styles';

export const createAppTheme = (mode: 'light' | 'dark') => {
  const lightThemeOptions: ThemeOptions = {
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
        light: '#42a5f5',
        dark: '#1565c0',
        contrastText: '#fff',
      },
      secondary: {
        main: '#9c27b0',
        light: '#ba68c8',
        dark: '#7b1fa2',
        contrastText: '#fff',
      },
      success: {
        main: '#2e7d32',
        light: '#4caf50',
        dark: '#1b5e20',
      },
      warning: {
        main: '#ed6c02',
        light: '#ff9800',
        dark: '#e65100',
      },
      error: {
        main: '#d32f2f',
        light: '#ef5350',
        dark: '#c62828',
      },
      background: {
        default: '#f5f5f5',
        paper: '#ffffff',
      },
    },
  };

  const darkThemeOptions: ThemeOptions = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#90caf9',
        light: '#e3f2fd',
        dark: '#42a5f5',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      secondary: {
        main: '#ce93d8',
        light: '#f3e5f5',
        dark: '#ab47bc',
        contrastText: 'rgba(0, 0, 0, 0.87)',
      },
      success: {
        main: '#66bb6a',
        light: '#81c784',
        dark: '#388e3c',
      },
      warning: {
        main: '#ffa726',
        light: '#ffb74d',
        dark: '#f57c00',
      },
      error: {
        main: '#f44336',
        light: '#e57373',
        dark: '#d32f2f',
      },
      background: {
        default: '#121212',
        paper: '#1e1e1e',
      },
    },
  };

  const themeOptions = mode === 'light' ? lightThemeOptions : darkThemeOptions;

  return createTheme({
    ...themeOptions,
    typography: {
      fontFamily: '"Noto Sans", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontSize: '2.5rem',
        fontWeight: 500,
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 500,
      },
      h3: {
        fontSize: '1.75rem',
        fontWeight: 500,
      },
      h4: {
        fontSize: '1.5rem',
        fontWeight: 500,
      },
      h5: {
        fontSize: '1.25rem',
        fontWeight: 500,
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 500,
      },
    },
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            fontWeight: 500,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === 'light'
              ? '0 2px 8px rgba(0,0,0,0.1)'
              : '0 2px 8px rgba(0,0,0,0.3)',
            transition: 'box-shadow 0.3s ease-in-out',
            '&:hover': {
              boxShadow: mode === 'light'
                ? '0 4px 16px rgba(0,0,0,0.15)'
                : '0 4px 16px rgba(0,0,0,0.4)',
            },
          },
        },
      },
    },
  });
};

export const theme = createAppTheme('light');

import { createTheme } from "@mui/material";
import { grey, blue } from "@mui/material/colors";
const theme = createTheme({
  palette: {
    primary: {
      main: blue[900],
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: "1.5rem",
          color: grey[500],
          "&:hover": {
            color: grey[200],
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: grey[500],
            },
            "&:hover fieldset": {
              borderColor: grey[500],
            },
            "&.Mui-focused fieldset": {
              borderColor: grey[200],
            },
          },
          "& .MuiInputBase-input": {
            color: grey[800],
          },
          "& .MuiInputLabel-root": {
            color: grey[600],
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: grey[200],
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: grey[500],
          textDecoration: "none",
          "&:hover": {
            color: grey[200],
            textDecoration: "none",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "15px",
          color: grey[500],
        },
      },
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
    h3: {
      fontSize: "2rem",
      fontWeight: 600,
      color: grey[500],
    },
    body1: {
      fontSize: "1rem",
      color: grey[500],
    },
    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },
});
export default theme;

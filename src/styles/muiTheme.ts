import { createTheme, PaletteOptions, Theme } from "@mui/material/styles";
import { TypographyOptions } from "@mui/material/styles/createTypography";
import { typography } from "./typography";
import { palette } from "./palette";

const muiTheme: Theme = createTheme({
  typography: typography as TypographyOptions,
  palette: palette as PaletteOptions,
  components: {
    MuiSelect: {
      styleOverrides: {
        select: {
          display: "flex",
          padding: "10.5px 12px",
        },
        icon: {
          display: "none",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: ({ theme, ownerState }) => ({
          padding: 0,
          borderRadius: "8px",
          borderColor: ownerState.error
            ? theme.palette.error.main
            : theme.palette.grey[200],
          borderWidth: "1px",
          fontWeight: "400",
          fontSize: "16px",
          lineHeight: "24px",
        }),
      },
    },
  },
});

export default muiTheme;

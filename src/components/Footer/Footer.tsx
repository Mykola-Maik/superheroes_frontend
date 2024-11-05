import { Box, Typography } from "@mui/material";
import theme from "@/styles/muiTheme";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: theme.palette.custom.red,
        minHeight: "100px",
        color: theme.palette.common.white,
        backgroundImage: `url('/src/assets/images/footer_bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0, 0, 0, 0.4)",
          zIndex: 1,
        },
        zIndex: 0,
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2 }}>
        <Typography variant="body2">
          © {new Date().getFullYear()} Made by Mykola Maik
        </Typography>
      </Box>
    </Box>
  );
};

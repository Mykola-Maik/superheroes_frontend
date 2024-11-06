import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Footer, Header } from "@/components";
import theme from "@/styles/muiTheme";

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Box
        component="main"
        sx={{
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "10px 15px",
          backgroundColor: theme.palette.custom.yellow,
        }}
      >
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
}

import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

export default function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="main"
        sx={{
          overflow: "hidden",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          padding: "10px 15px",
          backgroundColor: "rgba(80, 95, 111, 1)",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

import { Footer, Header } from "@/components";
import { Box, Typography } from "@mui/material";
import theme from "@/styles/muiTheme";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

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
          alignItems: "center",
          justifyContent: "center",
          flexGrow: 1,
          padding: "10px 15px",
          backgroundColor: theme.palette.custom.yellow,
        }}
      >
        <Box
          component="img"
          src="/oops.png"
          alt="Oops! Something went wrong."
          height="300px"
          width="300px"
          sx={{
            background: "transparent",
          }}
        />
        {error instanceof Error ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography variant="h3">Oops! Something went wrong.</Typography>
            <Typography variant="body1">{error.message}</Typography>
          </Box>
        ) : (
          <Typography variant="h3">Oops! Something went wrong.</Typography>
        )}
      </Box>
      <Footer />
    </Box>
  );
}

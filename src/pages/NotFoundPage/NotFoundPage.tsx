import { Box, Typography } from "@mui/material";

export default function NotFoundPage() {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box component="img" src="/no-results.png" />

      <Typography variant="h3" sx={{ mb: 2 }}>
        Oops! Page Not Found
      </Typography>
      <Typography variant="body1">
        Sorry, the page you are looking for doesn't exist or has been moved.
        Please check the URL or return to the homepage.
      </Typography>
    </Box>
  );
}

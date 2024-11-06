import { useAppDispatch, useAppSelector } from "@/hooks";
import { Box, Grid2, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import theme from "@/styles/muiTheme";
import { getSuperheroRequest } from "@/redux/slices/currentSuperheroSlice/currentSuperheroSlice";
import ImageSlider from "@/components/ImageSlider/ImageSlider";

export default function SuperheroDetailsPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const superhero = useAppSelector(
    (state) => state.currentSuperheroSlice.superhero
  );
  const isLoading = useAppSelector(
    (state) => state.currentSuperheroSlice.isLoading
  );

  useEffect(() => {
    if (id) {
      dispatch(getSuperheroRequest(id));
    }
  }, [id]);

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        Loading...
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Typography
        variant="h3"
        sx={{ color: theme.palette.common.black, mb: 4 }}
      >
        {superhero?.nickname}
      </Typography>
      <Grid2
        container
        spacing={4}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
          mb: 6,
        }}
      >
        <Grid2
          sx={{
            display: "flex",
            overflow: "hidden",
          }}
        >
          <ImageSlider images={superhero?.images || []} />
        </Grid2>
        <Grid2
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: { xs: "center", sm: "center", md: "flex-start" },
            flexDirection: { xs: "column", sm: "column", md: "row" },
          }}
        >
          <Grid2 sx={{ width: { xs: "100%", sm: "100%", md: "30%" } }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                color: theme.palette.common.black,
                mb: 2,
              }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Real name:
              </Box>

              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                {superhero?.real_name}
              </Typography>
            </Box>

            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.black, mb: 2 }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Description:
              </Box>
              {superhero?.origin_description}
            </Typography>

            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.black, mb: 2 }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Catch phrase:
              </Box>
              {superhero?.catch_phrase}
            </Typography>
          </Grid2>

          <Grid2 sx={{ width: { xs: "100%", sm: "100%", md: "30%" } }}>
            <Typography
              variant="body1"
              sx={{ color: theme.palette.common.black, mb: 2 }}
            >
              <Box
                component="strong"
                sx={{ fontWeight: 600, textDecoration: "underline", mr: 1 }}
              >
                Superpowers:
              </Box>
              {superhero?.superpowers}
            </Typography>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
}

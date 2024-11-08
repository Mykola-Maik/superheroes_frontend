import { Card, Loader } from "@/components";
import { Box, Button, Pagination } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { getSuperheroesRequest } from "@/redux/slices/superheroSlice/superheroSlice";
import theme from "@/styles/muiTheme";
import { addServiceModal } from "@/redux/slices/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { itemsPerPage } from "@/constants";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const superheroes = useAppSelector(
    (state) => state.superheroSlice.superheroes
  );
  const isLoading = useAppSelector((state) => state.superheroSlice.isLoading);
  const totalCount = useAppSelector((state) => state.superheroSlice.count);
  const currentPage = Number(searchParams.get("page")) || 1;

  useEffect(() => {
    dispatch(getSuperheroesRequest({ page: currentPage }));
  }, [currentPage]);

  useEffect(() => {
    const query: { [key: string]: string } = {};
    if (currentPage) query.page = String(currentPage);

    setSearchParams(query);
  }, [currentPage, setSearchParams]);

  if (isLoading) {
    return <Loader />;
  }

  const createSuperheroHandler = () => {
    dispatch(
      addServiceModal({
        type: ServiceModalName.AddSuperhero,
      })
    );
  };

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    searchParams.set("page", value.toString());
    setSearchParams(searchParams);
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 6,
        }}
      >
        <Grid size={{ xs: 12, sm: 12, md: 2, lg: 2 }}>
          <Button
            variant="contained"
            onClick={createSuperheroHandler}
            sx={{
              textTransform: "none",
              width: "100%",
              backgroundColor: theme.palette.custom.red,
            }}
          >
            + Add
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={4} sx={{ mb: 8, flexGrow: 1 }}>
        {superheroes.length > 0 ? (
          superheroes.map((superhero) => (
            <Grid
              key={superhero.id}
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Card superhero={superhero} />
            </Grid>
          ))
        ) : (
          <Grid
            size={{ xs: 12 }}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <p>No superheroes found</p>
          </Grid>
        )}
      </Grid>

      <Grid container sx={{ width: "100%", alignSelf: "flex-end" }}>
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root": {
                background: theme.palette.custom.yellow,
                border: `1px solid ${theme.palette.custom.red}`,
                color: theme.palette.custom.red,
                transition: "all 0.3s ease",
                "&:hover": {
                  transition: "all 0.3s ease",
                  background: theme.palette.custom.red,
                  color: theme.palette.common.white,
                },
              },
              "& .MuiPaginationItem-root.Mui-selected": {
                background: theme.palette.custom.red,
                color: theme.palette.common.white,
                transition: "background 0.3s ease, color 0.3s ease",
                "&:hover": {
                  transition: "all 0.3s ease",
                  opacity: 1,
                },
              },
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

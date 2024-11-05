import { Box, Typography } from "@mui/material";
import theme from "@/styles/muiTheme";
import { Link } from "react-router-dom";
import { Superhero } from "@/types";

interface CardProps {
  superhero: Superhero;
}

export const Card = ({ superhero }: CardProps) => {
  return (
    <Box
      component={Link}
      to={`/superhero/${superhero.id}`}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        width: "250px",
        height: "490px",
        backgroundColor: theme.palette.custom.dark,
        transition: "transform 0.3s ease",

        "&:hover img": {
          transition: "transform 0.3s ease",
          transform: "scale(1.1)",
        },
        "&::before": {
          content: '""',
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 30,
          height: 30,
          zIndex: 2,
          backgroundColor: theme.palette.custom.yellow,
          clipPath: "polygon(0 0, 100% 100%, 0 100%)",
          transform: "rotate(270deg)",
          transformOrigin: "center center",
        },

        "&::after": {
          content: "''",
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "39%",
          backgroundColor: theme.palette.custom.red,
          opacity: 0.9,
          transition: "opacity 0.3s ease, transform 0.3s ease",
          zIndex: 0,
          transform: "translateY(-93%)",
        },
        "&:hover::after": {
          transition: "transform 0.3s ease",
          transform: "translateY(0%)",
        },

        "&:hover .hover-opacity": {
          transition: "opacity 0.3s ease",
          opacity: 1,
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          zIndex: 3,
        }}
      >
        <Box
          component="img"
          src={
            superhero.images[0]
              ? superhero.images[0]
              : "/src/assets/images/no-image.webp"
          }
          rel={`${superhero.nickname} image`}
          sx={{
            display: "block",
            height: "300px",
            objectFit: "cover",
            transition: "transform 0.3s ease",
          }}
        />
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          flexGrow: 1,
          py: 2,
          px: 1,
          gap: 1,
          color: theme.palette.common.white,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: theme.palette.common.white,
            zIndex: 2,
          }}
        >
          {superhero.nickname}
        </Typography>

        <Typography
          variant="body1"
          className="hover-opacity"
          sx={{
            opacity: 0.5,
            color: theme.palette.common.white,
            zIndex: 2,
            transition: "opacity 0.3s ease",
          }}
        >
          {superhero.real_name}
        </Typography>
      </Box>
    </Box>
  );
};

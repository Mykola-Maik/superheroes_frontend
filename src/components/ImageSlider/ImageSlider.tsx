import { useEffect, useRef, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

type Props = {
  images: string[];
};

export default function ImageSlider({ images }: Props) {
  const maxImages =
    images.length > 0 ? images : ["/src/assets/images/no-image.webp"];

  const firstImage =
    maxImages.length > 0 ? maxImages[0] : "/src/assets/images/no-image.webp";
  const [currImg, setCurrImg] = useState(firstImage);

  const thumbnailsRef = useRef<HTMLDivElement | null>(null);

  const selectImg = (img: string) => {
    setCurrImg(img);
  };

  const toggleImg = (direction: "next" | "prev") => {
    if (maxImages.length === 0) return;

    setCurrImg((prevImg) => {
      const index = maxImages.findIndex((image) => image === prevImg);
      const directionIndex = direction === "next" ? index + 1 : index - 1;
      const checkIndex =
        directionIndex < 0
          ? maxImages.length - 1
          : directionIndex > maxImages.length - 1
            ? 0
            : directionIndex;

      return maxImages[checkIndex];
    });
  };

  useEffect(() => {
    const currentIndex = maxImages.findIndex((img) => img === currImg);
    const currentThumbnail = thumbnailsRef.current?.children[
      currentIndex
    ] as HTMLElement;

    if (currentIndex === 0) {
      thumbnailsRef.current?.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
      currentThumbnail?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currImg, maxImages]);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          onClick={() => toggleImg("prev")}
          disabled={maxImages.length === 0}
        >
          <ArrowBackIosIcon />
        </IconButton>

        <Box
          component="img"
          src={currImg}
          width={483}
          height={483}
          alt="large"
          style={{ borderRadius: "8px", objectFit: "cover" }}
        />

        <IconButton
          onClick={() => toggleImg("next")}
          disabled={maxImages.length === 0}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      <Box
        ref={thumbnailsRef}
        sx={{
          display: "flex",
          justifyContent: "center",
          overflowX: "auto",
          gap: 1,
          width: "100%",
          maxWidth: 500,
          padding: "0 10px",
        }}
      >
        {maxImages.map((img) => (
          <Button
            key={img}
            onClick={() => selectImg(img)}
            sx={{
              minWidth: "auto",
              p: 0.5,
              border:
                img === currImg ? "2px solid #1976d2" : "2px solid transparent",
              borderRadius: "4px",
            }}
          >
            <Box
              component="img"
              src={img}
              width={100}
              height={100}
              alt="thumb"
              style={{ borderRadius: "4px", objectFit: "cover" }}
            />
          </Button>
        ))}
      </Box>
    </Box>
  );
}

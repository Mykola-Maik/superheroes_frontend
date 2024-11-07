import Box from "@mui/material/Box";
import type { WithSx } from "@/types";

type CloseIconProps = WithSx<{}>;

const CloseIcon = (props: CloseIconProps) => {
  return (
    <Box {...props}>
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11 1L1 11M1 1L11 11"
          stroke="#D4D7DD"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11 1L1 11M1 1L11 11"
          stroke="black"
          strokeOpacity="0.2"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </Box>
  );
};

export default CloseIcon;

import Box from "@mui/material/Box";
import type { WithSx } from "@/types";

type TrashIconProps = WithSx<{}>;

const TrashIcon = (props: TrashIconProps) => {
  return (
    <Box {...props}>
      <svg
        width="20"
        height="21"
        viewBox="0 0 20 21"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M2.33337 4.5H17.3334"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M7.33337 2.5H12.3334"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M8.16675 8.90039V13.7004"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11.5 8.90039V13.7004"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M4 4.5L4.66537 15.6783C4.75971 17.2631 6.07245 18.5 7.66007 18.5H12.0066C13.5942 18.5 14.907 17.2631 15.0013 15.6783L15.6667 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </Box>
  );
};

export default TrashIcon;

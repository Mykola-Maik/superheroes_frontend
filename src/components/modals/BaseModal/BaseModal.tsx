import { Box, IconButton, Modal, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { CloseIcon } from "@/assets/icons";
import theme from "@/styles/muiTheme";
import type { ServiceModalConfig } from "@/types";

interface BaseModalProps extends ServiceModalConfig {
  title?: string;
  width: string;
  children?: React.ReactNode;
}

function BaseModal({
  onClose,
  index = 1000,
  width,
  title,
  children,
}: BaseModalProps) {
  return (
    <Modal
      open
      sx={{
        zIndex: index,
        backdropFilter: "blur(10px)",
        padding: "0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: "rgba(80, 95, 111, 0.50)",
          },
        },
      }}
    >
      <Paper
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "left",
          padding: {
            xs: "16px",
            sm: "32px",
          },
          width: "100%",
          maxWidth: {
            xs: "90%",
            sm: "600px",
            md: width,
          },
          borderRadius: "12px",
          backgroundColor: theme.palette.custom.dark,
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{
            width: "20px",
            height: "20px",
            position: "absolute",
            top: "16px",
            right: "16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CloseIcon
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              svg: {
                width: "10px",
                height: "10px",
              },
            }}
          />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            backgroundColor: theme.palette.custom.dark,
            color: theme.palette.common.white,
          }}
        >
          {title && (
            <Typography
              variant="h4"
              sx={{ pb: 4, color: theme.palette.common.white }}
            >
              {title}
            </Typography>
          )}
          {children}
        </Box>
      </Paper>
    </Modal>
  );
}

export default BaseModal;

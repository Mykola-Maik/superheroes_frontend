import { Box, Button, Typography } from "@mui/material";
import { ServiceModalName } from "@/enums";
import { NotificationErrorIcon } from "@/assets/icons";
import theme from "@/styles/muiTheme";
import BaseModal from "../BaseModal/BaseModal";
import { removeServiceModal } from "@/redux/slices/serviceModalSlice/serviceModalSlice";
import { useAppDispatch } from "@/hooks";
import { deleteSuperheroRequest } from "@/redux/slices/superheroSlice/superheroSlice";
import { selectServiceModalPayload } from "@/redux/selectors/serviceModalSelector";
import { toast } from "react-toastify";

const DeleteSuperheroModal = () => {
  const dispatch = useAppDispatch();

  const payload = selectServiceModalPayload(ServiceModalName.DeleteSuperhero);
  const { superheroId } = payload || {};

  const handleCancelButton = () => {
    dispatch(removeServiceModal(ServiceModalName.DeleteSuperhero));
  };

  const handleDeleteButton = () => {
    const toastId = toast.loading("Waiting...");

    dispatch(deleteSuperheroRequest({ superheroId, toastId }));
  };

  return (
    <BaseModal width="556px" onClose={handleCancelButton} index={1000}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <NotificationErrorIcon
          sx={{ mb: 4, color: theme.palette.custom.red }}
        />
        <Typography
          sx={{
            fontSize: "24px",
            fontWeight: "700",
            mb: 2.5,
            color: theme.palette.common.white,
          }}
        >
          Are you sure you want to delete superhero?
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            fontWeight: "400",
            mb: 5,
            color: theme.palette.common.white,
          }}
        >
          The information for this superhero won't be saved
        </Typography>
        <Box
          sx={{
            width: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            onClick={handleCancelButton}
            sx={{
              width: "47%",
              textTransform: "none",
              color: theme.palette.custom.yellow,
              backgroundColor: "transparent",
              border: `1px solid ${theme.palette.custom.yellow}`,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transition: "all 0.3s ease",
                backgroundColor: theme.palette.custom.yellow,
                color: theme.palette.common.white,
                boxShadow: "none",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDeleteButton}
            sx={{
              width: "47%",
              textTransform: "none",
              color: theme.palette.common.white,
              backgroundColor: theme.palette.custom.red,
              border: `1px solid ${theme.palette.custom.red}`,
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transition: "all 0.3s ease",
                backgroundColor: "transparent",
                borderColor: theme.palette.custom.red,
                color: theme.palette.custom.red,
                boxShadow: "none",
              },
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </BaseModal>
  );
};

export default DeleteSuperheroModal;

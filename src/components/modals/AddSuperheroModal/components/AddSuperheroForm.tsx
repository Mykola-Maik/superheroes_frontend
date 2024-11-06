import { Box, Button } from "@mui/material";
import { useForm, useFormState } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { removeServiceModal } from "@/redux/slices/serviceModalSlice/serviceModalSlice";
import { ServiceModalName } from "@/enums";
import { validationSchema } from "./validationScheme";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import type { SubmitHandler } from "react-hook-form";
import { getSuperheroRequest } from "@/redux/slices/currentSuperheroSlice/currentSuperheroSlice";
import {
  createSuperheroRequest,
  updateSuperheroRequest,
} from "@/redux/slices/superheroSlice/superheroSlice";
import { Superhero } from "@/types";

type FormData = yup.InferType<ReturnType<typeof validationSchema>>;

interface AddSuperheroFormProps {
  superheroId?: string;
}

export const AddSuperheroForm = ({ superheroId }: AddSuperheroFormProps) => {
  const superheroData = useAppSelector(
    (state) => state.currentSuperheroSlice.superhero
  );
  const isLoading = useAppSelector(
    (state) => state.currentSuperheroSlice.isLoading
  );
  const dispatch = useAppDispatch();

  const defaultValues: FormData = {
    nickname: "",
    origin_description: "",
    superpowers: "",
    real_name: "",
    catch_phrase: "",
    images: [],
  };

  const { handleSubmit, control, setValue, getValues, reset } =
    useForm<FormData>({
      defaultValues,
      resolver: yupResolver(validationSchema()),
      mode: "onChange",
    });

  useEffect(() => {
    reset(defaultValues);
    if (superheroId) {
      dispatch(getSuperheroRequest(superheroId));
    }
  }, [superheroId, dispatch, reset]);

  useEffect(() => {
    if (superheroId && superheroData) {
      (Object.keys(defaultValues) as Array<keyof FormData>).forEach((key) => {
        const value = superheroData[key as keyof typeof superheroData];
        if (key in superheroData) {
          setValue(
            key,
            typeof value === "number" ? String(value) : (value ?? null)
          );
        }
      });
    }
  }, [superheroId, superheroData, setValue, getValues]);

  const { isDirty, isValid } = useFormState({ control });

  const handleOnCancel = () => {
    dispatch(
      removeServiceModal(
        superheroId
          ? ServiceModalName.EditSuperhero
          : ServiceModalName.AddSuperhero
      )
    );
  };

  const handleFormSubmit: SubmitHandler<FormData> = (
    superhero: Omit<Superhero, "id">
  ) => {
    if (superheroId) {
      dispatch(updateSuperheroRequest({ superheroId, superhero }));
    } else {
      dispatch(createSuperheroRequest(superhero));
    }
  };

  return (
    <Box sx={{ backgroundColor: "transparent", width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        {/* Add form elements */}

        <Box
          sx={{ display: "flex", justifyContent: "flex-start", gap: "24px" }}
        >
          <Button
            onClick={handleOnCancel}
            type="button"
            variant="outlined"
            color="primary"
            disabled={isLoading}
            sx={{
              width: "50%",
              textTransform: "capitalize",
              borderRadius: "8px",
              padding: "10px 18px",
              borderColor: "palette.primary.main",
              "&:disabled": {
                borderColor: "action.disabled",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={!isValid || !isDirty}
            sx={{
              width: "50%",
              textTransform: "none",
              borderRadius: "8px",
              padding: "10px 18px",
              "&:hover": {
                backgroundColor: "custom.buttonContainedHover",
              },
              "&:disabled": {
                color: "common.white",
                backgroundColor: "action.disabled",
              },
            }}
          >
            {superheroId ? "Save" : "Add"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

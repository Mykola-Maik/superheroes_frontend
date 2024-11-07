import { Box, Button } from "@mui/material";
import { useForm, useFormState } from "react-hook-form";
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
import { SuperheroFormData } from "@/types";
import theme from "@/styles/muiTheme";
import { AddSuperheroFormView } from "./AddSuperheroFormView";

type FormData = SuperheroFormData;

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
    superpowers: [],
    real_name: "",
    catch_phrase: "",
    images: [{ url: "" }],
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
    superhero: SuperheroFormData
  ) => {
    const formatedData = {
      ...superhero,
      superpowers: superhero.superpowers.join(","),
      images: superhero.images.map((image) => image.url),
    };

    if (superheroId) {
      dispatch(
        updateSuperheroRequest({ superheroId, superhero: formatedData })
      );
    } else {
      dispatch(createSuperheroRequest(formatedData));
    }
  };

  return (
    <Box sx={{ backgroundColor: "transparent", width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <AddSuperheroFormView control={control} />

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
              borderColor: theme.palette.custom.red,
              color: theme.palette.custom.red,

              "&:hover": {
                backgroundColor: "transparent",
                boxShadow: `0px 4px 8px rgba(230, 36, 41, 0.5)`,
              },
              "&:disabled": {
                borderColor: theme.palette.action.disabled,
              },
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={handleSubmit(handleFormSubmit)}
            disabled={!isValid || !isDirty}
            sx={{
              width: "50%",
              textTransform: "none",
              borderRadius: "8px",
              padding: "10px 18px",
              backgroundColor: theme.palette.custom.yellow,
              transition: "box-shadow 0.3s ease",
              "&:hover": {
                boxShadow: `4px 4px 24px rgba(243, 212, 3, 0.5)`,
                transition: "box-shadow 0.3s ease",
              },
              "&:disabled": {
                color: theme.palette.common.white,
                backgroundColor: theme.palette.action.disabled,
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

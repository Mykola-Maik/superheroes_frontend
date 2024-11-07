import { Box, IconButton, Stack, type SxProps } from "@mui/material";
import type { SuperheroFormData } from "@/types";
import {
  useFormState,
  type Control,
  useFieldArray,
  Path,
} from "react-hook-form";
import { FormAutocompleteDropdown, FormInputText } from "@/components";
import { TrashIcon } from "@/assets/icons";
import theme from "@/styles/muiTheme";
import AddIcon from "@mui/icons-material/Add";

interface AddSuperheroFormViewProps {
  control: Control<SuperheroFormData>;
  sx?: SxProps;
}

export const AddSuperheroFormView = ({
  control,
}: AddSuperheroFormViewProps) => {
  const { errors } = useFormState({ control });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const isFirstField = fields.length === 1;
  const isMaxFields = fields.length >= 10;

  return (
    <Stack
      spacing={3}
      sx={{
        maxHeight: { xs: "400px", sm: "400px", md: "516px" },
        overflowY: "auto",
        mb: 4,
        pr: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "column", md: "row" },
          gap: "24px",
        }}
      >
        <FormInputText
          name="nickname"
          control={control}
          label="Nickname"
          placeholder="Enter nickname"
          required={true}
          sx={{ width: { sm: "100%", md: "320px" } }}
        />
        <FormInputText
          name="real_name"
          control={control}
          label="Real name"
          placeholder="Enter real name"
          required={true}
          sx={{ width: { sm: "100%", md: "320px" } }}
        />
      </Box>
      <FormInputText
        name="origin_description"
        control={control}
        label="Description"
        placeholder="Enter the superhero description"
        required={true}
        minRows={3}
        maxRows={3}
        multiline
        helperText="Provide a brief background of the hero. Include details like place of birth, notable events, or a short story."
        sx={{ width: "100%" }}
      />
      <FormInputText
        name="catch_phrase"
        control={control}
        label="Catch phrase"
        placeholder="Enter the superhero catch phrase"
        required={true}
        minRows={3}
        maxRows={3}
        multiline
        helperText="Enter the superhero's catchphrase or famous saying."
        sx={{ width: "100%" }}
      />

      <FormAutocompleteDropdown
        name="superpowers"
        control={control}
        label="Superpowers"
        placeholder="Add superpowers"
        required={true}
        options={[]}
        error={errors.superpowers?.message}
        sx={{ width: "100%" }}
      />

      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        {fields.map((item, index) => (
          <Box
            key={item.id}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              mb: 2,
              position: "relative",
              width: "95%",
            }}
          >
            <FormInputText
              name={`images[${index}].url` as Path<SuperheroFormData>}
              control={control}
              label={`Image url ${index + 1}`}
              placeholder="Enter image URL"
              required={true}
              helperText="Add image links for this superhero. Find a photo online (e.g., Google), copy the image URL, paste it here, and press Enter to confirm."
              sx={{ width: "100%" }}
            />
            <IconButton
              onClick={() => remove(index)}
              disabled={isFirstField}
              sx={{
                position: "absolute",
                right: "8px",
                top: "44px",
                transform: "translateY(-50%)",
                width: "32px",
                height: "32px",
                "&:hover": {
                  boxShadow: 2,
                },
                "&:disabled": {
                  opacity: 0.3,
                },
              }}
            >
              <TrashIcon
                sx={{
                  color: theme.palette.custom.red,
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              />
            </IconButton>

            {index === fields.length - 1 && (
              <IconButton
                onClick={() => append({ url: "" })}
                disabled={isMaxFields || !!errors.images?.[index]?.url}
                sx={{
                  position: "absolute",
                  top: "28px",
                  right: "-35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "32px",
                  height: "32px",
                  color: theme.palette.common.white,

                  "&:hover": {
                    boxShadow: 2,
                  },
                  "&:disabled": {
                    opacity: 0.3,
                  },
                }}
              >
                <AddIcon />
              </IconButton>
            )}
          </Box>
        ))}
      </Box>
    </Stack>
  );
};

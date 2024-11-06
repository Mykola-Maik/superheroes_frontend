import { Box, Stack, type SxProps } from "@mui/material";
import type { SuperheroFormData } from "@/types";
import { useFormState, type Control } from "react-hook-form";
import { FormAutocompleteDropdown, FormInputText } from "@/components";

interface AddSuperheroFormViewProps {
  control: Control<SuperheroFormData>;
  sx?: SxProps;
}

export const AddSuperheroFormView = ({
  control,
}: AddSuperheroFormViewProps) => {
  const { errors } = useFormState({ control });

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

      <FormAutocompleteDropdown
        name="images"
        control={control}
        label="Images"
        placeholder="Add links to superhero images"
        required={true}
        options={[]}
        error={errors.images?.message}
        helperText="Add image links for this superhero. Find a photo online (e.g., Google), copy the image URL, paste it here, and press Enter to confirm."
        sx={{ width: "100%" }}
      />
    </Stack>
  );
};

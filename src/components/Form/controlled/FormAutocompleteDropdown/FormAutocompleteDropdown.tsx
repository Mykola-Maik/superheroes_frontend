import {
  Controller,
  Control,
  RegisterOptions,
  FieldValues,
  Path,
} from "react-hook-form";
import type { SxProps } from "@mui/system";
import AutocompleteDropdown from "@/components/Form/uncontrolled/AutocompleteDropdown/AutocompleteDropdown";

interface FormAutocompleteDropdownProps<TFieldValues extends FieldValues> {
  name: Path<TFieldValues>;
  control: Control<TFieldValues>;
  rules?: RegisterOptions<TFieldValues>;
  label: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  options: string[];
  helperText?: string;
  sx?: SxProps;
}

export const FormAutocompleteDropdown = <TFieldValues extends FieldValues>({
  name,
  control,
  rules,
  label,
  placeholder,
  required,
  options,
  helperText,
  sx,
}: FormAutocompleteDropdownProps<TFieldValues>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { value, onChange }, fieldState }) => {
        return (
          <AutocompleteDropdown
            value={value}
            name={name}
            onChange={(_event, newValue) => onChange(newValue)}
            options={options}
            label={label}
            placeholder={placeholder}
            error={fieldState.error?.message}
            required={required}
            helperText={helperText}
            sx={sx}
          />
        );
      }}
    />
  );
};

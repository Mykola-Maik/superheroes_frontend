import Chip from "@mui/material/Chip";
import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import { Paper, SxProps } from "@mui/material";
import { InputText } from "../InputText";
import theme from "@/styles/muiTheme";
import ClearIcon from "@mui/icons-material/Clear";

interface AutocompleteDropdownProps {
  value: string[];
  name: string;
  onChange: (event: React.ChangeEvent<{}>, newValue: string[]) => void;
  options: string[];
  label: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  helperText?: string;
  sx?: SxProps;
}

const AutocompleteDropdown: React.FC<AutocompleteDropdownProps> = ({
  value,
  name,
  onChange,
  options,
  label,
  placeholder,
  error,
  required,
  helperText,
  sx,
}) => {
  return (
    <Stack spacing={3} sx={{ width: "100%" }}>
      <Autocomplete
        multiple
        freeSolo
        id="tags-outlined"
        options={options}
        value={value}
        onChange={onChange}
        filterSelectedOptions
        clearIcon={
          <ClearIcon
            sx={{
              color: theme.palette.common.white,
              transition: "color 0.3s ease",
              "&:hover": {
                transition: "color 0.3s ease",
                color: theme.palette.custom.yellow,
              },
            }}
          />
        }
        PaperComponent={(props) => (
          <Paper
            {...props}
            sx={{
              maxHeight: "200px",
              mt: 0.25,
              boxShadow: "4px 4px 24px 0px rgba(42, 43, 47, 0.1216)",
              borderRadius: "8px",
            }}
          />
        )}
        renderTags={(value: readonly string[], getTagProps) =>
          value.map((option: string, index: number) => {
            const { key, ...tagProps } = getTagProps({ index });

            return (
              <Chip
                key={option}
                variant="outlined"
                label={option}
                sx={{
                  color: theme.palette.common.white,
                  "& .MuiChip-deleteIcon": {
                    color: theme.palette.common.white,
                    opacity: 1,
                    borderRadius: "50%",
                    transition: "color 0.3s ease, opacity 0.3s ease",
                    "&:hover": {
                      transition: "color 0.3s ease, opacity 0.3s ease",
                      opacity: 0.5,
                      color: theme.palette.common.white,
                    },
                  },
                }}
                {...tagProps}
              />
            );
          })
        }
        renderInput={(params) => (
          <InputText
            {...params}
            label={label}
            placeholder={placeholder}
            error={error}
            required={required}
            name={name}
            value={value.join(", ")}
            helperText={helperText}
          />
        )}
        sx={{ ...sx }}
      />
    </Stack>
  );
};

export default AutocompleteDropdown;

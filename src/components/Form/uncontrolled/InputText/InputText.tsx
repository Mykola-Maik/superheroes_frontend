import React, { forwardRef, useState } from "react";
import { Box, Typography, TextField, Tooltip } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import type { WithSx } from "@/types";
import FormHelperText from "@mui/material/FormHelperText";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface InputTextProps extends WithSx {
  name: string;
  label: string;
  error?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  value: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  helperText?: string;
  minRows?: number;
  maxRows?: number;
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  (
    {
      name,
      label,
      error,
      onBlur,
      onChange,
      placeholder,
      required,
      value,
      sx = {},
      inputRef,
      multiline = false,
      minRows = 1,
      maxRows = 1,
      helperText,
      ...rest
    },
    _ref
  ) => {
    const theme = useTheme();
    const [_focused, setFocused] = useState(false);

    const handleFocus = () => setFocused(true);
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setFocused(false);
      if (onBlur) onBlur(event);
    };

    return (
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "4px",
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{ display: "flex", color: theme.palette.common.white }}
          >
            {label}

            {required && (
              <Typography
                sx={{
                  lineHeight: "18px",
                  color: theme.palette.error.main,
                }}
              >
                *
              </Typography>
            )}
          </Typography>

          {helperText && (
            <Tooltip title={helperText}>
              <InfoOutlinedIcon sx={{ width: "17px", height: "17px" }} />
            </Tooltip>
          )}
        </Box>
        <TextField
          inputRef={inputRef}
          name={name}
          error={!!error}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          required={required}
          fullWidth
          sx={{
            "& .MuiOutlinedInput-root": {
              padding: "0px",
              "& fieldset": {
                borderColor: error ? theme.palette.error.main : null,
                borderWidth: "1px",
                borderRadius: "8px",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "24px",
              },
              "& .MuiInputBase-input": {
                padding: "11px 12px",
                fontSize: "16px",
                lineHeight: "normal",
                color: theme.palette.common.white,
                "&::placeholder": {
                  color: "rgba(255, 255, 255, 0.8)",
                },
              },
              "&:hover fieldset": {
                borderColor: error
                  ? theme.palette.error.main
                  : theme.palette.custom.yellow,
                boxShadow: "0px 4px 10px 0px rgba(3, 9, 80, .15)",
              },
              "&.Mui-focused fieldset": {
                border: `1px solid ${theme.palette.custom.yellow}`,
                boxShadow: "none",
              },
              "&.Mui-focused .MuiInputBase-input::placeholder": {
                opacity: 0,
              },
            },
            margin: 0,
            ...sx,
          }}
          multiline={multiline}
          minRows={minRows}
          maxRows={maxRows}
          {...rest}
        />
        {error && (
          <FormHelperText component={Box}>
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.error.main,
                marginTop: "4px",
                fontWeight: theme.typography.fontWeightRegular,
                width: minRows > 1 ? "100%" : "320px",
              }}
            >
              {error}
            </Typography>
          </FormHelperText>
        )}
      </Box>
    );
  }
);

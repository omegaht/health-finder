/* eslint-disable no-shadow */
import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import useDebounce from "hooks/useDebounce";
import React from "react";

type TextFieldProps = {
  disabled?: boolean;
  error?: boolean;
  helperText?: string;

  icon?: any;

  inputRef?: any;
  label?: string;

  name?: string;
  placeholder?: string;
  type?: string;
  value: string;
  onBlur?: (event: any) => void;
  onChange: (event: any) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  helperText,
  disabled = false,
  error,
  inputRef,
  label = "",
  name,
  placeholder = "",

  value,
  onBlur,
  onChange,
}) => {
  const { _value, set_value } = useDebounce({
    value,
    onChange,
    timeoutMs: 400,
  });

  return (
    <FormControl isInvalid={error}>
      <FormLabel>Email</FormLabel>
      <Input
        name={name || "input-field"}
        onBlur={() => onBlur && onBlur(_value)}
        value={_value || ""}
        onChange={({ target: { value } }) => set_value(value)}
        {...{
          placeholder,
          label,
          disabled,
          inputRef,
        }}
      />
      {!error ? (
        <FormHelperText>{helperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{helperText}</FormErrorMessage>
      )}
    </FormControl>
  );
};

export default TextField;

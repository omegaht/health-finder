import React from "react";
import TextField from "./TextField";
import useFormikField from "./useFormikField";

type FormikTextInputProps = {
  disabled?: boolean;
  icon?: React.ReactNode;
  label?: string;

  name: string;
  placeholder?: string;
  type?: string;
  onErrors?: (parm1: boolean, param2: string) => void;
};

export const FormikTextInput: React.FC<FormikTextInputProps> = ({
  disabled = false,

  icon = null,
  label = "",

  name,
  placeholder = "",
  type = "text",

  onErrors = null,
  ...props
}) => {
  const { value, setValue, touched, setTouched, hasError, errorMsg } =
    useFormikField(name);

  const onChange = (fieldValue: string) => {
    setTouched(true);
    setValue(fieldValue);
  };

  if (onErrors) {
    onErrors(hasError, value);
  }

  return (
    <TextField
      onBlur={() => setTouched(true)}
      onChange={(inputValue) => onChange(inputValue)}
      error={hasError}
      helperText={touched ? errorMsg : undefined}
      {...{
        disabled,

        icon,
        label,

        name,
        placeholder,
        type,
        value,

        ...props,
      }}
    />
  );
};

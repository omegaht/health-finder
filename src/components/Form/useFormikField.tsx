import { useField } from "formik";

const useFormikField = (name: string) => {
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;

  const { error, touched } = meta;

  const hasError: boolean = (error && error !== "" && touched) || false;

  return {
    value: field.value,
    touched,
    setValue,
    setTouched,
    hasError,
    errorMsg: error,
  };
};

export default useFormikField;

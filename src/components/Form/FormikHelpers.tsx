import { useFormikContext } from "formik";
import React, { useEffect } from "react";
import { isObject } from "utils";

const FormikErrorFocus = () => {
  const { isSubmitting, isValidating, errors } = useFormikContext();

  useEffect(() => {
    if (isSubmitting && !isValidating) {
      const keys = Object.keys(errors);

      if (keys.length > 0) {
        const selector = keys.reduce<string>((selector, key) => {
          const value = errors[key];
          const subSelector = isObject(value) ? `[${key}]` : `[name="${key}"]`;
          return selector ? `${selector} ${subSelector}` : subSelector;
        }, "");

        const errorElement = document.querySelector(
          selector
        ) as HTMLElement | null;
        if (errorElement) {
          errorElement.focus();
        }
      }
    }
  }, [errors, isSubmitting, isValidating]);

  return <div />;
};

export default FormikErrorFocus;

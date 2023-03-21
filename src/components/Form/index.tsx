import { Form as FormikForm, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import FormikErrorFocus from "./FormikHelpers";

export interface Field {
  label: string;
  name: string;
  initialValue: any;
  validation: any;
  icon?: React.ReactNode;
}

interface FormProps {
  children: JSX.Element;
  className?: string;
  fields: Field[];
  onSubmit: (values: any, resetForm?: any) => void;
  initialValues?: any;
}

const Form: React.FC<FormProps> = ({
  children,
  className,
  fields,
  onSubmit,
  initialValues = {},
  ...otherProps
}) => {
  const validationSchema = React.useMemo(() => {
    return yup.object().shape(
      fields.reduce(
        (validations, field) => ({
          ...validations,
          [field.name]: field.validation,
        }),
        {}
      )
    );
  }, [fields]);

  const initialFieldValues = React.useMemo(() => {
    return Object.fromEntries(
      fields.map((field) => [field.name, field.initialValue])
    );
  }, [fields]);

  return (
    <Formik
      initialValues={initialFieldValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      validateOnBlur
      {...otherProps}
    >
      {() => (
        <FormikForm className={className} autoComplete="on">
          {children}
          <FormikErrorFocus />
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;

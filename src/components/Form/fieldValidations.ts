import * as yup from "yup";

const passwordMatchesMessage =
  "Must contain 8 characters, one uppercase, one lowercase, one number and one special character. (!, @, #, $, %, ^, &, *)";

export const yupEmail = yup
  .string()
  .email("Invalid email")
  .required("Email is required");

export const yupPassword = yup
  .string()
  .matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
    passwordMatchesMessage
  )
  .required(passwordMatchesMessage);

export const yupPasswordConfirmation = yup
  .string()
  .oneOf([yup.ref("password")], "Passwords do not match")
  .required("Password confirmation is required");

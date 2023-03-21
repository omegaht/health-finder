import { EmailIcon, LockIcon } from "@chakra-ui/icons";
import { Field } from "components/Form";
import {
  yupEmail,
  yupPassword,
  yupPasswordConfirmation,
} from "components/Form/fieldValidations";
import React from "react";

const signUpFields: Field[] = [
  {
    label: "Email",
    name: "email",
    initialValue: "",
    validation: yupEmail,
    icon: <EmailIcon />,
  },
  {
    label: "Password",
    name: "password",
    initialValue: "",
    validation: yupPassword,
    icon: <LockIcon />,
  },
  {
    label: "Confirm Password",
    name: "confirm_password",
    initialValue: "",
    validation: yupPasswordConfirmation,
    icon: <LockIcon />,
  },
];

export default signUpFields;

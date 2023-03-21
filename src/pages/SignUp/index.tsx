import { Text, Box } from "@chakra-ui/react";
import api from "api";
import Form from "components/Form";
import { FormikTextInput } from "components/Form/FormikFields";
// import FormikSubmitButton from "components/Form/FormikSubmitButton";
import React, { useState } from "react";
import styled from "styled-components";

import signUpFields from "./fields";

const SignUpForm = styled(Form)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const textFieldsUI = (
  <>
    {signUpFields.map((field) => (
      <FormikTextInput key={`${field.name}`} type="text" {...field} />
    ))}
  </>
);

const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: any) => {
    setIsLoading(true);
    try {
      const { data } = await api.post("/users", {
        user: {
          email: values.email,
          password: values.password,
          sign_up_stage: 1,
          role: values.role,
        },
      });

      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
    }
  };

  return (
    <Box justifyContent="space-between">
      <SignUpForm fields={signUpFields} onSubmit={onSubmit}>
        <Box width="100%" gap="24px 0">
          <Box maxWidth="340px" gap="28px">
            {textFieldsUI}

            {/* <FormikSubmitButton disableOnErrors disabled={isLoading}>
              <Text>Sign Up</Text>
            </FormikSubmitButton> */}
          </Box>
        </Box>
      </SignUpForm>
    </Box>
  );
};

export default SignUp;

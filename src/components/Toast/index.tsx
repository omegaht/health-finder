import { Alert } from "@chakra-ui/alert";
import { CloseButton } from "@chakra-ui/close-button";
import { Box } from "@chakra-ui/layout";
import React, { CSSProperties } from "react";
import toast, {
  ToastBar,
  Toaster,
  ToastPosition,
  ToastOptions,
  ToastType,
} from "react-hot-toast";

const defaultDuration = 5000;
const defaultPosition: ToastPosition = "bottom-center";
const toastBorderRadius = 4;
const toastMaxWidth = 600;

export const addToast = (
  msg: JSX.Element | string,
  type: ToastType = "blank",
  toastOptions: ToastOptions = {}
): void => {
  const options: ToastOptions = {
    duration: defaultDuration,
    position: defaultPosition,
    ...toastOptions,
  };
  const toastFn = type === "blank" ? toast?.loading : toast[type];
  toastFn(msg, options);
};

const toastContainerCss: CSSProperties = {
  padding: 0,
  borderRadius: toastBorderRadius,
  boxShadow: "none",
  maxWidth: toastMaxWidth,
};

const toastTypeStyles = {
  success: {
    severity: "success" as const,
  },
  error: {
    severity: "error" as const,
  },
  blank: {
    severity: "info" as const,
  },
  loading: {
    severity: "info" as const,
  },
  custom: {
    severity: "info" as const,
  },
};

const Toast = () => (
  <Toaster
    toastOptions={{
      style: toastContainerCss,
    }}
  >
    {(t) => (
      <ToastBar toast={t}>
        {({ message }) => {
          const { severity } = toastTypeStyles[t.type] || {};

          return (
            <Alert status={severity}>
              <Box>{message}</Box>
              <CloseButton
                alignSelf="flex-start"
                position="relative"
                right={-1}
                top={-1}
                onClick={() => toast.dismiss(t.id)}
              />
            </Alert>
          );
        }}
      </ToastBar>
    )}
  </Toaster>
);

export default Toast;

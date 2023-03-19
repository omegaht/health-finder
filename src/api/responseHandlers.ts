// import { addToast } from "components/common/HIHHToast";

interface ErrorResponse {
  data: {
    errors?: string[];
    error_message?: string;
    message?: string;
    error?: string | { message: string };
  };
}

const getErrorMessage = (response: ErrorResponse): string => {
  const { data } = response;

  return (
    data?.errors?.join(", ") ??
    data?.error_message ??
    data?.message ??
    (typeof data?.error === "string" ? data.error : data?.error?.message) ??
    "An error occurred, please try again later"
  );
};

export const handleSuccess = (msg: string) => {
  //   addToast(msg, "success");
  alert(msg);
};

type HandleError = (err: any, errorMsg?: string) => void;

export const handleError: HandleError = (err, errMsg = undefined) => {
  const { error, response } = err ?? {};

  if (
    error === "popup_closed_by_user" ||
    response?.error === "popup_closed_by_user"
  ) {
    return;
  }

  let msg = errMsg ?? "Connection Error";

  if (response) {
    switch (response.status) {
      case 500:
        msg = "An error has occurred on our server. Please try again later";
        break;
      default:
        msg = getErrorMessage(response);
        break;
    }
  }

  //   addToast(msg, "error");
  alert(msg);
};

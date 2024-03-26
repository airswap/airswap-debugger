/**
 * @param isEnableCheck only gets set to true when user clicks `handleSubmit` function
 * @param errors is either a list of errors returned from other functions, or it's an console.error message indicating an invalid JSON input
 * @param setIsNoErrors this only needs to get called after the `check` smart contract function runs. Setting this to `true` indicates that no errors are found, and causes the UI to render a special "no errors" message. Validations that happen before SC functions are pre-checks before the `check` SC function runs
 * @returns null
 */
export const handleSetErrors = ({
  isEnableCheck,
  errors,
  setErrors,
}: {
  isEnableCheck: boolean;
  errors: string[] | [] | undefined | false;
  setErrors: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  if (!isEnableCheck) {
    return;
  } else if (!errors) {
    return;
  } else if (Array.isArray(errors)) {
    setErrors(() => {
      // const updatedErrors = [...prevErrors, ...errors];
      const updatedErrors = [...errors];
      const uniqueErrors = [...new Set(updatedErrors)];
      return uniqueErrors;
    });
  } else {
    return;
  }
};

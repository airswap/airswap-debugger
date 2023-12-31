import { Dispatch, SetStateAction } from 'react';

export const checkSmartContractError = ({
  errorCheck,
  setErrors,
}: {
  errorCheck: Error | null;
  setErrors: Dispatch<SetStateAction<string[]>>;
}) => {
  if (
    errorCheck?.message.includes('unknown') ||
    errorCheck?.message.includes('reverted')
  ) {
    console.error(errorCheck);
    const unknownError =
      'Unknown error from SwapERC20 contract. Please double check all your inputs';

    setErrors((prevErrors) => {
      const updatedErrors = [unknownError, ...prevErrors];
      return [...new Set(updatedErrors)];
    });
  }
};

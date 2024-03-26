// import { Dispatch, SetStateAction } from 'react';
import { ReadContractErrorType } from 'viem';

/**
 *
 * @param errorCheck takes in a return value from Wagmi useContractRead function for `check` function
 * @returns generic error if contract returns an otherwise unhelpful error
 */
export const checkSmartContractGenericError = ({
  errorCheck,
}: {
  errorCheck: ReadContractErrorType | null;
}) => {
  if (
    errorCheck?.message.includes('unknown') ||
    errorCheck?.message.includes('reverted')
  ) {
    const genericError =
      'Unknown error from SwapERC20 contract. Please double check all your inputs';

    return genericError;
  }
};

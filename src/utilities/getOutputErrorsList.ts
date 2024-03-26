import { hexToString } from 'viem';

/**
 * @returns human readable errors from SwapERC20 `check` function
 */
export const getOutputErrorsList = (
  checkFunctionData: readonly `0x${string}`[] | undefined
) => {
  if (!checkFunctionData) {
    return undefined;
  } else {
    return checkFunctionData.map((error: `0x${string}`) => hexToString(error));
  }
};

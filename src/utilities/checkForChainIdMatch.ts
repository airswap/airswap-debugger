import { chainIdOptions } from './chainIdOptions';

/**
 * @remarks function checks if chainIdFromJson is found in chainIdOptions
 * @param chainIdFromJson comes from user-inputted JSON
 * @returns true if valid
 */
export const checkForChainIdMatch = (
  chainIdFromJson: string | number | undefined
): boolean => {
  if (isNaN(Number(chainIdFromJson))) {
    return false;
  }
  return chainIdOptions.some(
    (option) => option.value === chainIdFromJson?.toString()
  );
};

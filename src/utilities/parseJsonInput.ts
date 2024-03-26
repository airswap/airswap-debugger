import { FullOrderERC20 } from '@airswap/types';
import { InputType } from '../../types';

/**
 *
 * @param inputType is either urlString or jsonString
 * @returns json or undefined
 */
export const parseJsonInput = ({
  inputType,
  jsonString,
  decompressedOrderFromUrl,
}: {
  inputType: InputType;
  jsonString: string | undefined;
  decompressedOrderFromUrl: FullOrderERC20 | undefined;
}) => {
  if (!jsonString && !decompressedOrderFromUrl) {
    return;
  }

  if (inputType === InputType.JSON && jsonString) {
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return e;
    }
  } else {
    try {
      const jsonString = JSON.stringify(decompressedOrderFromUrl);
      return JSON.parse(jsonString);
    } catch (e) {
      return e;
    }
  }
};

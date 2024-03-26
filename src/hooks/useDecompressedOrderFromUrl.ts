import { decompressFullOrderERC20 } from '@airswap/utils';
import { FullOrderERC20 } from '@airswap/types';
import { InputType } from '../../types';

export const useDecompressedOrderFromUrl = ({
  inputType,
  compressedOrder,
}: {
  inputType: InputType;
  compressedOrder: string | undefined;
}): FullOrderERC20 | undefined => {
  if (inputType === InputType.JSON) {
    return undefined;
  } else if (!compressedOrder) {
    return undefined;
  } else {
    try {
      if (compressedOrder.includes('order/')) {
        const orderValueSplit = compressedOrder.split('order/');
        const splitOrderValue = orderValueSplit[1];
        const decompressedOrder = decompressFullOrderERC20(splitOrderValue);
        return decompressedOrder;
      } else {
        const decompressedOrder = decompressFullOrderERC20(compressedOrder);
        return decompressedOrder;
      }
    } catch (e) {
      console.error('Error: issue with decompressedOrderFromUrl');
      return;
    }
  }
};

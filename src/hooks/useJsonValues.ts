import { FullOrderERC20 } from '@airswap/types';
import { ParsedJsonParams, InputType } from '../../types';

export const useJsonValues = ({
  inputType,
  parsedJson,
  decompressedOrderFromUrl,
}: {
  inputType: InputType;
  parsedJson: Partial<ParsedJsonParams> | undefined;
  decompressedOrderFromUrl: FullOrderERC20 | undefined;
}) => {
  const json =
    inputType === InputType.JSON ? parsedJson : decompressedOrderFromUrl;

  const senderWallet = json?.senderWallet;
  const nonce = isNaN(Number(json?.nonce))
    ? BigInt(0)
    : BigInt(Number(json?.nonce));
  const expiry = isNaN(Number(json?.expiry))
    ? BigInt(0)
    : BigInt(Number(json?.expiry));
  const signerWallet = json?.signerWallet;
  const signerToken = json?.signerToken;
  const signerAmount = isNaN(Number(json?.signerAmount))
    ? BigInt(0)
    : BigInt(Number(json?.signerAmount));
  const senderToken = json?.senderToken;
  const senderAmount = isNaN(Number(json?.senderAmount))
    ? BigInt(0)
    : BigInt(Number(json?.senderAmount));
  const v = Number(json?.v);
  const r = json?.r as `0x${string}`;
  const s = json?.s as `0x${string}`;

  return {
    senderWallet,
    nonce,
    expiry,
    signerWallet,
    signerToken,
    signerAmount,
    senderToken,
    senderAmount,
    v,
    r,
    s,
  };
};

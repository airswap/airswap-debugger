import { Erc712Domain } from '../../types';

/**
 *
 * @returns human readable array of errors     and filters out null values
 */
/* eslint-disable no-control-regex */
export const displayErrors = ({
  errorsList,
  eip712Domain,
  protocolFee,
}: {
  errorsList: string[] | undefined;
  eip712Domain: Erc712Domain;
  protocolFee: bigint | undefined;
}): string[] | undefined => {
  if (!errorsList) {
    return undefined;
  }

  const name = eip712Domain?.[1];
  const version = eip712Domain?.[2];
  const chainId = eip712Domain?.[3];
  const verifyingContract = eip712Domain?.[4];

  // remove null values
  const filteredErrors = errorsList
    .filter((error) => {
      // reget checks for null values (x00...), which indicates no error
      const nullRegex = /^[\x00]+$/;
      return !nullRegex.test(error);
    })
    .map((error) => error.replace(/\x00/g, '').toLowerCase());

  const erc721DomainValues = `${name}, ${chainId}, ${verifyingContract}, ${version}, ${Number(
    protocolFee
  )}`;

  const errorMessages = filteredErrors.map((error) => {
    if (
      error.includes(
        'unauthorized' || 'SignatoryUnauthorized' || 'Unauthorized'
      )
    ) {
      return `Signature invalid. Check that you're using the correct erc721Domain values: ${erc721DomainValues}, ${protocolFee}`;
    } else if (error.includes('NonceAlreadyUsed')) {
      return `Nonce: the nonce entered is invalid.`;
    } else if (error.includes('expired')) {
      return `expiry: the date entered has expired.`;
    } else if (error.includes('senderallowance')) {
      return `senderAmount: the senderWallet has not approved the spending allowance of the senderToken.`;
    } else if (error.includes('senderbalance')) {
      return `senderAmount: the senderWallet does not have enough balance of the senderToken.`;
    } else if (error.includes('signerallowance')) {
      return `signerAmount: the signerWallet has not approved the spending allowance of the signerToken.`;
    } else if (error.includes('signerbalance')) {
      return `signerAmount: the signerWallet does not have enough balance of the signerToken.`;
    } else {
      return `An unexpected error occured: ${error}`;
    }
  });

  return errorMessages;
};

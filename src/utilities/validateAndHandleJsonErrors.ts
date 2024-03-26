import { isAddress } from 'viem';
import { ParsedJsonParams } from '../../types';
import { ChainIds } from '../../tools/constants';

/**
 *
 * @remarks this function does not check for errors returned from the smart contract, it only checks for valid JSON inputs
 * @param parsedJson is the JSON that is being checked for errors
 * @returns a list of errors, or undefined. Undefined indicates that no errors are found
 */
export const validateAndHandleJsonErrors = ({
  parsedJson,
  swapContractAddress,
  protocolFee,
}: {
  parsedJson: Partial<ParsedJsonParams> | undefined;
  swapContractAddress: string | undefined;
  protocolFee: bigint | undefined;
}): string[] | undefined => {
  if (!parsedJson) {
    return;
  }

  const errorsList: string[] = [];
  try {
    const requiredKeys: (keyof ParsedJsonParams)[] = [
      'nonce',
      'expiry',
      'signerWallet',
      'signerToken',
      'signerAmount',
      'senderToken',
      'senderAmount',
      'v',
      'r',
      's',
    ];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isNotValidNumberString = (value: string) => !/^\d+$/.test(value);
    const isBytes32 = (jsonKey: string) =>
      !/^(0x)?[0-9a-fA-F]{64}$/.test(jsonKey);
    const isUint8 = (v: string) =>
      !/^(0|[1-9]\d?|1\d\d|2[0-4]\d|25[0-5])$/.test(v);
    const chainIdList = Object.keys(ChainIds);

    // Check for valid values
    if (parsedJson) {
      if (
        parsedJson['chainId'] &&
        !chainIdList.includes(parsedJson['chainId'].toString())
      ) {
        errorsList.push('chainId: double check your chain id');
      }
      if (
        parsedJson['senderWallet'] &&
        !isAddress(parsedJson['senderWallet'])
      ) {
        errorsList.push('senderWallet must be a valid ERC20 address');
      }
      if (
        parsedJson['nonce'] &&
        isNotValidNumberString(parsedJson['nonce'].toString())
      ) {
        errorsList.push(
          'nonce: must be a number. Make sure it\'s wrapped in quotation marks, e.g. "99"'
        );
      }
      if (
        parsedJson['expiry'] &&
        isNotValidNumberString(parsedJson['expiry'])
      ) {
        errorsList.push(
          'expiry: must be a number. Make sure it\'s wrapped in quotation marks, e.g. "1566941284"'
        );
      }
      if (
        parsedJson['signerWallet'] &&
        !isAddress(parsedJson['signerWallet'])
      ) {
        errorsList.push('signerWallet: must be a valid ERC20 address');
      }
      if (parsedJson['signerToken'] && !isAddress(parsedJson['signerToken'])) {
        errorsList.push('signerToken: must be a valid ERC20 address');
      }
      if (
        parsedJson['signerAmount'] &&
        isNotValidNumberString(parsedJson['signerAmount'])
      ) {
        errorsList.push(
          'signerAmount: must be a number string. (a number wrapped in quotes, e.g. "100000000")'
        );
      }
      if (parsedJson['senderToken'] && !isAddress(parsedJson['senderToken'])) {
        errorsList.push('senderToken: must be a valid ERC20 address');
      }
      if (
        parsedJson['senderAmount'] &&
        isNotValidNumberString(parsedJson['senderAmount'])
      ) {
        errorsList.push(
          'senderAmount: must be a number. Make sure it\'s wrapped in quotation marks, e.g. "100000000"'
        );
      }
      if (parsedJson['v'] && isUint8(parsedJson['v'])) {
        errorsList.push(`v: must be a value between 0-255.`);
      }
      if (parsedJson['r'] && isBytes32(parsedJson['r'])) {
        errorsList.push(
          `r: must be bytes32, a 64-character hex value, e.g. '0x1a2b...c9d0'.`
        );
      }
      if (parsedJson['s'] && isBytes32(parsedJson['s'])) {
        errorsList.push(
          `s: must be bytes32, a 64-character hex value, e.g. '0x4c1g...j4a0'.`
        );
      }
      if (parsedJson['chainId']) {
        const isValidChainId = Object.values(ChainIds).includes(
          Number(parsedJson['chainId'])
        );
        if (!isValidChainId) {
          errorsList.push(
            'chainId: must be a valid chain ID. Check deployed AirSwap contracts here: https://about.airswap.io/technology/deployments.'
          );
        }
      }
      if (
        parsedJson['swapContract'] &&
        !isAddress(parsedJson['swapContract'])
      ) {
        // first check if valid ERC20 address
        errorsList.push('swapContract: must be a valid ERC20 address');
        // then check if address is correct
        if (parsedJson['swapContract'] !== swapContractAddress) {
          errorsList.push(`swapContract: SwapERC20 address is not valid.`);
        }
      }
      if (
        parsedJson['protocolFee'] &&
        parsedJson['protocolFee'] !== Number(protocolFee).toString()
      ) {
        errorsList.push(
          `protocolFee: protocol fee should be ${Number(protocolFee)}`
        );
      }
    }

    // Check for missing keys
    const missingKeys = requiredKeys.filter(
      (key) => parsedJson && !parsedJson[key]
    );

    missingKeys.forEach((missingKey) => {
      errorsList.push(`JSON is missing an "${missingKey}" key and its value.`);
    });

    console.log('json errors (not SC errors)', errorsList);

    if (errorsList.length === 0) {
      return undefined;
    } else {
      return errorsList;
    }
  } catch (error) {
    console.error('error in validateJson function', error);
    return [String(error)];
  }
};

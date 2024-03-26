// ParsedJsonParams is used to validate JSON, not for smart contract read function
export interface ParsedJsonParams {
  nonce: string | number;
  expiry: string;
  signerWallet: `0x${string}`;
  signerToken: `0x${string}`;
  signerAmount: string;
  senderToken: `0x${string}`;
  senderAmount: string;
  v: string;
  r: string;
  s: string;
  senderWallet?: `0x${string}`;
  chainId?: string | number;
  swapContract?: `0x${string}`;
  protocolFee?: '5';
}

// checkArgs is used for the smart contract read function
export type CheckFunctionArgs = [
  `0x${string}`,
  bigint,
  bigint,
  `0x${string}`,
  `0x${string}`,
  bigint,
  `0x${string}`,
  bigint,
  number,
  `0x${string}`,
  `0x${string}`
];

export enum InputType {
  JSON,
  URL,
}

export type SelectOptions = {
  value: string;
  label: string;
}[];

export type Erc712Domain =
  | readonly [
      `0x${string}`,
      string,
      string,
      bigint,
      `0x${string}`,
      `0x${string}`,
      readonly bigint[]
    ]
  | undefined;

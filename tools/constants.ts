export enum ChainIds {
  AVALANCHE = 43114,
  ARBITRUM = 42161,
  ARBITRUMGOERLI = 421613,
  BASE = 8453,
  BASEGOERLI = 84531,
  BSC = 56,
  BSCTESTNET = 97,
  FUJI = 43113,
  GOERLI = 5,
  HOLESKY = 17000,
  LINEA = 59144,
  LINEAGOERLI = 59140,
  MAINNET = 1,
  MUMBAI = 80001,
  POLYGON = 137,
  RSK = 30,
  RSKTESTNET = 31,
  SEPOLIA = 11155111,
  TELOS = 40,
  TELOSTESTNET = 41,
}

export const apiUrls: Record<number, string> = {
  [ChainIds.AVALANCHE]: 'https://api.avax.network/ext/bc/C/rpc',
  [ChainIds.ARBITRUM]: 'https://arb1.arbitrum.io/rpc',
  [ChainIds.ARBITRUMGOERLI]: 'https://goerli-rollup.arbitrum.io/rpc',
  [ChainIds.BASE]: 'https://mainnet.base.org',
  [ChainIds.BASEGOERLI]: 'https://goerli.base.org',
  [ChainIds.BSC]: 'https://bsc-dataseed.binance.org',
  [ChainIds.BSCTESTNET]: 'https://data-seed-prebsc-1-s1.binance.org:8545',
  [ChainIds.FUJI]: 'https://api.avax-test.network/ext/bc/C/rpc',
  [ChainIds.GOERLI]: 'https://ethereum-goerli.publicnode.com',
  [ChainIds.HOLESKY]: 'https://ethereum-holesky.publicnode.com',
  [ChainIds.LINEA]: 'https://rpc.linea.build',
  [ChainIds.LINEAGOERLI]: 'https://rpc.goerli.linea.build',
  [ChainIds.MAINNET]: 'https://ethereum.publicnode.com',
  [ChainIds.MUMBAI]: 'https://rpc-mumbai.maticvigil.com',
  [ChainIds.POLYGON]: 'https://polygon-rpc.com',
  [ChainIds.RSK]: 'https://public-node.rsk.co',
  [ChainIds.RSKTESTNET]: 'https://public-node.testnet.rsk.co',
  [ChainIds.SEPOLIA]: 'https://ethereum-sepolia.publicnode.com',
  [ChainIds.TELOS]: 'https://mainnet.telos.net/evm',
  [ChainIds.TELOSTESTNET]: 'https://testnet.telos.net/evm',
};
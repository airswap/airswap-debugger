import { createConfig, http } from '@wagmi/core';
import { rsk, rskTestnet } from './customChains';
import {
  arbitrum,
  arbitrumGoerli,
  avalanche,
  avalancheFuji,
  base,
  baseGoerli,
  bsc,
  bscTestnet,
  holesky,
  linea,
  lineaTestnet,
  mainnet,
  polygon,
  polygonMumbai,
  sepolia,
  telos,
  telosTestnet,
} from '@wagmi/core/chains';

import { createClient } from 'viem';

export const config = createConfig({
  chains: [
    arbitrum,
    arbitrumGoerli,
    avalanche,
    avalancheFuji,
    base,
    baseGoerli,
    bsc,
    bscTestnet,
    holesky,
    linea,
    lineaTestnet,
    mainnet,
    polygon,
    polygonMumbai,
    rsk,
    rskTestnet,
    sepolia,
    telos,
    telosTestnet,
  ],
  client({ chain }) {
    return createClient({ chain, transport: http() });
  },
});

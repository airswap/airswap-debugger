import { twMerge } from 'tailwind-merge';
import airswapLogo from '../../src/assets/airswap-logo.svg';
import { Select } from './Select';

export const Header = ({
  protocolFee,
  setSelectedChainId,
  chainIdFromJson,
}: {
  protocolFee: bigint | undefined;
  setSelectedChainId: (value: number) => void;
  chainIdFromJson: number | string | undefined;
}) => {
  return (
    <div
      className={twMerge(
        'flex flex-col mx-auto my-4 md:relative md:flex-row justify-between',
        'text-2xl xs:text-3xl uppercase text-white font-medium',
        'w-full xs:w-[90%] sm:w-4/5 md:w-[95%] lg:w-[90%] xl:w-4/5'
      )}
    >
      <div className="flex p-2 items-center justify-center md:justify-start">
        <img src={airswapLogo} alt="AirSwap logo" className="mr-3" />
        <h1>AirSwap Debugger</h1>
      </div>
      <div className="flex flex-row md:w-1/2 text-sm items-center justify-end">
        <span className="flex w-fit mr-4">
          Protocol fee: {Number(protocolFee) || '5'}
        </span>
        <div>
          <Select
            setSelectedChainId={setSelectedChainId}
            chainIdFromJson={chainIdFromJson}
          />
        </div>
      </div>
    </div>
  );
};

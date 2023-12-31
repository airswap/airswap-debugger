import { SelectOptions } from '../../types';
import * as RadixSelect from '@radix-ui/react-select';
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

export const Select = ({
  setIsEnableCheck,
  setSelectedChainId,
  selectOptions,
}: {
  setIsEnableCheck: (value: boolean) => void;
  setSelectedChainId: (value: number) => void;
  selectOptions: SelectOptions;
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const handleIsSelectOpen = () => {
    setIsSelectOpen((isSelectOpen) => !isSelectOpen);
  };

  const renderOptions = () => {
    return selectOptions.map((chain) => (
      <RadixSelect.Item
        value={chain.value}
        key={chain.value}
        className="py-1 px-2 bg-blueGray text-lightGray border border-blueExtraDark first:rounded-t-sm last:rounded-b-sm hover:bg-blueExtraDark hover:border-blueExtraDark active:border-white"
      >
        <RadixSelect.ItemText>
          {chain.label}: {chain.value}
        </RadixSelect.ItemText>
        <RadixSelect.ItemIndicator>{chain.value}</RadixSelect.ItemIndicator>
      </RadixSelect.Item>
    ));
  };
  const options = renderOptions();

  const handleSelectChange = (chain: string) => {
    setIsEnableCheck(false);
    setSelectedChainId(Number(chain));
  };

  return (
    <>
      <RadixSelect.Root
        onValueChange={(val) => handleSelectChange(val)}
        onOpenChange={handleIsSelectOpen}
      >
        <RadixSelect.Trigger
          className="flex items-center px-3 py-1 bg-blueGray border border-blueGray rounded-md font-semibold uppercase"
          aria-label="chain id"
        >
          <RadixSelect.Value placeholder="chain id" />
          <RadixSelect.Icon className="ml-2">
            <div
              className={`${
                isSelectOpen
                  ? 'transition-transform rotate-180'
                  : 'transition-transform rotate-0'
              }`}
            >
              <FaChevronDown />
            </div>
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
        <RadixSelect.Portal>
          <RadixSelect.Content
            position="popper"
            className="h-[340px] border border-blueExtraDark rounded-md"
          >
            <RadixSelect.ScrollUpButton />
            <RadixSelect.Viewport>{options}</RadixSelect.Viewport>
            <RadixSelect.ScrollDownButton />
            <RadixSelect.Arrow />
          </RadixSelect.Content>
        </RadixSelect.Portal>
      </RadixSelect.Root>
    </>
  );
};

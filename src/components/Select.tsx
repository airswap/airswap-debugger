import { chainIdOptions } from '../utilities/chainIdOptions';
import * as RadixSelect from '@radix-ui/react-select';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { checkForChainIdMatch } from '../utilities/checkForChainIdMatch';

/**
 * @remarks `selectedValue` in this component handles changes within the scope of Select.tsx. `setSelectedChainId` handles changes for smart contract inputs
 * @param setSelectedChainId handles chain Id that gets passed into WAGMI smart contract functions
 * @param chainIdFromJson is parsed from user-input JSON
 * @returns
 */
export const Select = ({
  setSelectedChainId,

  chainIdFromJson,
}: {
  setSelectedChainId: (value: number) => void;
  chainIdFromJson: number | string | undefined;
}) => {
  const [isSelectorDisabled, setIsSelectorDisabled] = useState(false);
  // selectedValue handles chainId within Select component
  const [selectedValue, setSelectedValue] = useState(
    chainIdFromJson || chainIdOptions[0].value
  );
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);

  const handleOpenSelect = () => {
    setIsSelectOpen((isSelectOpen) => !isSelectOpen);
  };

  // if chainIdFromJson is valid, disable the selector and override it with chainIdFromJson
  const isChainIdFromJsonValid = checkForChainIdMatch(chainIdFromJson);

  const renderOptions = () => {
    return chainIdOptions.map((chain) => (
      <RadixSelect.Item
        defaultValue={chainIdOptions[2].value}
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

  useEffect(() => {
    if (chainIdFromJson && isChainIdFromJsonValid) {
      setSelectedValue(chainIdFromJson);
      setSelectedChainId(+chainIdFromJson);
    }
  }, [chainIdFromJson, setSelectedChainId, isChainIdFromJsonValid]);

  // handle disabling of selector
  useEffect(() => {
    if (!!chainIdFromJson && isChainIdFromJsonValid) {
      setIsSelectorDisabled(true);
    } else if (!isChainIdFromJsonValid) {
      setIsSelectorDisabled(false);
    }
  }, [chainIdFromJson, isChainIdFromJsonValid]);

  return (
    <>
      <RadixSelect.Root
        onValueChange={() => selectedValue}
        onOpenChange={handleOpenSelect}
        disabled={isSelectorDisabled}
      >
        <RadixSelect.Trigger
          className="flex items-center px-3 py-1 bg-blueGray border border-blueGray rounded-md font-semibold uppercase"
          aria-label="chain id"
        >
          <RadixSelect.Value
            placeholder={
              isChainIdFromJsonValid
                ? `Chain ID: ${chainIdFromJson}`
                : 'Ethereum: 1'
            }
          />
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

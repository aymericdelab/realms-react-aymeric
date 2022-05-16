import { useStarknet, useStarknetInvoke } from '@starknet-react/core';
import { toBN } from 'starknet/dist/utils/number';
import { bnToUint256, uint256ToBN } from 'starknet/dist/utils/uint256';
import {
  useSettlingContract,
  useRealms721Contract,
} from '@/hooks/settling/stark-contracts';

type Settling = {
  settleRealm: (tokenId: number) => void;
  unsettleRealm: (tokenId: number) => void;
  mintRealm: (tokenId: number) => void;
};

const useSettling = (): Settling => {
  const { contract: settlingContract } = useSettlingContract();
  const { contract: realmsContract } = useRealms721Contract();
  const { account } = useStarknet();

  const settleRealmAction = useStarknetInvoke({
    contract: settlingContract,
    method: 'settle',
  });

  const unsettleRealmAction = useStarknetInvoke({
    contract: settlingContract,
    method: 'unsettle',
  });

  const mintRealmAction = useStarknetInvoke({
    contract: realmsContract,
    method: 'mint',
  });

  return {
    settleRealm: (tokenId: number) => {
      settleRealmAction.invoke({
        args: [bnToUint256(toBN(tokenId))],
      });
    },
    unsettleRealm: (tokenId: number) => {
      unsettleRealmAction.invoke({
        args: [bnToUint256(toBN(tokenId))],
      });
    },
    mintRealm: (tokenId: number) => {
      mintRealmAction.invoke({
        args: [toBN(account as string).toString(), bnToUint256(toBN(tokenId))],
      });
    },
  };
};

export default useSettling;

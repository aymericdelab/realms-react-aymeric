import {
  Button,
  Card,
  CardStats,
  CardTitle,
  InputNumber,
} from '@bibliotheca-dao/ui-lib/base';
import { BigNumber } from 'ethers';
import Image from 'next/image';
import type { ValueType } from 'rc-input-number/lib/utils/MiniDecimal';
import React, { useState, useEffect } from 'react';
import {
  RealmBuildingId,
  WORK_HUT_OUTPUT,
  WORK_HUT_COST,
} from '@/constants/buildings';
import { useCommandList } from '@/context/CommandListContext';
import type { GetRealmQuery, Realm } from '@/generated/graphql';
import { ModuleAddr } from '@/hooks/settling/stark-contracts';
import { createBuildingCall } from '@/hooks/settling/useBuildings';
import useFood from '@/hooks/settling/useFood';
import { useGameConstants } from '@/hooks/settling/useGameConstants';
import { Entrypoints } from '@/hooks/settling/useResources';
import useIsOwner from '@/hooks/useIsOwner';
import { getTrait } from '@/shared/Getters/Realm';
import type { BuildingDetail, RealmFoodDetails } from '@/types/index';

type Prop = {
  realm: GetRealmQuery;
  buildings: BuildingDetail[] | undefined;
  realmFoodDetails: RealmFoodDetails;
  availableFood: number | undefined;
  open: boolean;
  loading: boolean;
};

interface ResourceAndFoodInput {
  farmsToBuild: string;
  fishingVillagesToBuild: string;
  workHutsToBuild: string;
}

const Harvests: React.FC<Prop> = (props) => {
  const realm = props.realm?.realm;

  const { create, harvest } = useFood(realm as Realm);

  const isOwner = useIsOwner(realm?.settledOwner);

  const { getBuildingCostById } = useGameConstants();

  const txQueue = useCommandList();

  const [enqueuedHarvestTx, setEnqueuedHarvestTx] = useState(false);

  const farmCapacity = getTrait(realm, 'River');
  const fishingVillageCapacity = getTrait(realm, 'Harbor');

  const [input, setInput] = useState<ResourceAndFoodInput>({
    farmsToBuild: '1',
    fishingVillagesToBuild: '1',
    workHutsToBuild: '1',
  });

  useEffect(() => {
    setEnqueuedHarvestTx(
      !!txQueue.transactions.find(
        (t) =>
          t.contractAddress == ModuleAddr.ResourceGame &&
          t.entrypoint == Entrypoints.claim &&
          t.calldata &&
          BigNumber.from(t.calldata[0] as string).eq(
            BigNumber.from(realm?.realmId)
          )
      )
    );
    setInput({
      farmsToBuild: farmCapacity,
      fishingVillagesToBuild: fishingVillageCapacity,
      workHutsToBuild: '1',
    });
  }, [
    txQueue.transactions,
    farmCapacity,
    fishingVillageCapacity,
    realm?.realmId,
  ]);

  if (!realm) {
    return null;
  }

  return (
    <div>
      <div className="grid grid-cols-12 gap-6 py-4">
        <Card className="col-span-12 md:col-start-1 md:col-end-4 ">
          <div className="w-full p-4 mx-auto bg-white rounded bg-opacity-90">
            <Image
              width={200}
              height={200}
              className={'w-72 h-72 mx-auto'}
              src={'/realm-buildings/hut.png'}
              alt="Hut"
            />
          </div>

          <CardTitle>Work huts [labour]</CardTitle>

          <CardStats>
            <span className="text-4xl opacity-80">
              <span className="">
                {
                  props.buildings?.find((a) => a.name === 'House')
                    ?.quantityBuilt
                }
              </span>
            </span>
          </CardStats>
          <div className="p-2">
            {isOwner && (
              <div className="flex mt-2 space-x-2">
                <Button
                  onClick={() =>
                    txQueue.add(
                      createBuildingCall.build({
                        realmId: realm.realmId,
                        buildingId: RealmBuildingId.House,
                        qty: input.workHutsToBuild,
                        costs: {
                          resources: realm.resources?.map((res) => ({
                            resourceId: res.resourceId,
                            resourceName: res.resourceName,
                            amount:
                              WORK_HUT_COST * parseInt(input.workHutsToBuild),
                          })),
                        },
                      })
                    )
                  }
                  size="xs"
                  variant="primary"
                >
                  Build
                </Button>
                <InputNumber
                  value={input.workHutsToBuild}
                  inputSize="sm"
                  colorScheme="transparent"
                  className="w-12 bg-white border rounded border-white/40"
                  min={1}
                  max={10}
                  stringMode
                  onChange={(value: ValueType | null) => {
                    if (value) {
                      setInput({
                        farmsToBuild: input.farmsToBuild,
                        fishingVillagesToBuild: input.fishingVillagesToBuild,
                        workHutsToBuild: value.toString(),
                      });
                    }
                  }}
                />{' '}
              </div>
            )}

            <p className="py-1">
              Workhuts increase your output by {WORK_HUT_OUTPUT} per day cycle.
              They cost {WORK_HUT_COST} of all the resources on your realm.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Harvests;
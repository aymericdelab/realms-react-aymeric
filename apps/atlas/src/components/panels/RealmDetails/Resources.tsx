import {
  Button,
  Card,
  CardBody,
  CardStats,
  CardTitle,
  InputNumber,
  CountdownTimer,
} from '@bibliotheca-dao/ui-lib/base';
import Image from 'next/image';
import type { ValueType } from 'rc-input-number/lib/utils/MiniDecimal';
import React, { useState, useEffect } from 'react';
import { toBN } from 'starknet/dist/utils/number';
import { RealmResources } from '@/components/tables/RealmResources';
import {
  RealmBuildingId,
  HarvestType,
  HARVEST_LENGTH,
  WORK_HUT_OUTPUT,
  WORK_HUT_COST,
} from '@/constants/buildings';
import { useTransactionQueue } from '@/context/TransactionQueueContext';
import type { GetRealmQuery, Realm } from '@/generated/graphql';
import { ModuleAddr } from '@/hooks/settling/stark-contracts';
import useBuildings, {
  createBuildingCall,
} from '@/hooks/settling/useBuildings';
import useFood, { createFoodCall } from '@/hooks/settling/useFood';
import { createCall, Entrypoints } from '@/hooks/settling/useResources';
import useIsOwner from '@/hooks/useIsOwner';
import { getTrait } from '@/shared/Getters/Realm';
import TxAddedToQueueLabel from '@/shared/TxAddedToQueueLabel';
import type {
  BuildingDetail,
  RealmFoodDetails,
  AvailableResources,
} from '@/types/index';
import { BaseRealmDetailPanel } from './BaseRealmDetailPanel';

type Prop = {
  realm: GetRealmQuery;
  buildings: BuildingDetail[] | undefined;
  realmFoodDetails: RealmFoodDetails;
  availableFood: number | undefined;
  availableResources: AvailableResources;
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

  const txQueue = useTransactionQueue();

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
          toBN(t.calldata[0]).eq(toBN(realm?.realmId))
      )
    );
    setInput({
      farmsToBuild: farmCapacity,
      fishingVillagesToBuild: fishingVillageCapacity,
      workHutsToBuild: '1',
    });
  }, [txQueue.transactions]);

  if (!realm) {
    return null;
  }

  return (
    <BaseRealmDetailPanel open={props.open}>
      <div className="grid grid-cols-12 gap-6 py-4">
        <Card className="col-span-12 md:col-start-1 md:col-end-4 ">
          <div className="w-full p-4 mx-auto bg-white rounded bg-opacity-90">
            <Image
              width={200}
              height={200}
              className={'w-72 h-72 mx-auto'}
              src={'/realm-buildings/hut.png'}
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
                  onChange={(value: ValueType) =>
                    setInput({
                      farmsToBuild: input.farmsToBuild,
                      fishingVillagesToBuild: input.fishingVillagesToBuild,
                      workHutsToBuild: value.toString(),
                    })
                  }
                />{' '}
              </div>
            )}

            <p className="py-1">
              Workhuts increase your output by {WORK_HUT_OUTPUT} per day cycle.
              They cost {WORK_HUT_COST} of all the resources on your realm.
            </p>
          </div>
        </Card>
        <Card className="col-span-12 md:col-start-4 md:col-end-8 ">
          <CardTitle>Resources</CardTitle>
          <RealmResources
            availableResources={props.availableResources}
            showClaimable
            realm={realm}
            loading={false}
          />
        </Card>

        <Card className="col-span-12 md:col-start-1 md:col-end-4">
          <div className="flex p-3 bg-white rounded">
            <Image
              width={200}
              height={220}
              className={' mx-auto'}
              src={'/realm-buildings/storehouse.png'}
            />
          </div>

          <CardTitle>Store house [food]</CardTitle>

          <div>
            <div className="text-right">
              <br />
              {props.availableFood && props?.availableFood > 0 ? (
                <div className="flex justify-end text-xl">
                  <CountdownTimer
                    date={(
                      props.availableFood * 1000 +
                      new Date().getTime()
                    ).toString()}
                  />
                </div>
              ) : (
                <span className="text-red-600 animate-pulse">
                  Serfs are starving!!
                </span>
              )}
              <div className="text-5xl ">
                {props.availableFood?.toLocaleString()}
              </div>
            </div>
            <p>
              You consume 1 food per second according to your population. Build
              and harvest Farms and Fishing Villages in order to keep your
              citizens fed. <br /> If you do not have food you are capped at 250
              resources per day and your troops have half health.
            </p>
          </div>
        </Card>
        <Card className="flex col-span-12 md:col-start-4 md:col-end-8 ">
          <CardTitle>Farms Built - Capacity {farmCapacity}</CardTitle>

          <div className="flex flex-wrap justify-between p-2">
            <div className="w-1/2">
              <h5>farms built </h5>
              <div className="text-5xl">
                {props.realmFoodDetails.farmsBuilt}
              </div>
            </div>
            <div className="w-1/2">
              <h5>farms to harvest </h5>
              <div className="text-5xl">
                {props.realmFoodDetails.totalFarmHarvest}
              </div>
            </div>
            <div className="w-1/2">
              <h5>time till next harvest </h5>
              <div className="text-5xl">
                <CountdownTimer
                  date={(
                    (HARVEST_LENGTH -
                      props.realmFoodDetails
                        .totalTimeRemainingUntilFarmHarvest) *
                      1000 +
                    new Date().getTime()
                  ).toString()}
                />
              </div>
            </div>
            <div className="w-1/2">
              <h5>decayed farms</h5>
              <div className="text-5xl">
                {props.realmFoodDetails.decayedFarms}
              </div>
            </div>
          </div>
          {isOwner && (
            <div className="flex mt-2 space-x-2">
              <Button
                onClick={() => {
                  create(
                    realm?.realmId,
                    input.farmsToBuild,
                    RealmBuildingId.Farm
                  );
                }}
                size="xs"
                variant="primary"
              >
                Build
              </Button>
              <InputNumber
                value={input.farmsToBuild}
                inputSize="sm"
                colorScheme="transparent"
                className="w-12 bg-white border rounded border-white/40"
                min={1}
                max={farmCapacity}
                stringMode // to support high precision decimals
                onChange={(value: ValueType) =>
                  setInput({
                    farmsToBuild: value.toString(),
                    fishingVillagesToBuild: input.fishingVillagesToBuild,
                    workHutsToBuild: input.workHutsToBuild,
                  })
                }
              />{' '}
              {/* eslint-disable */}
              <Button
                onClick={() => {
                  harvest(
                    realm?.realmId,
                    HarvestType.Export,
                    RealmBuildingId.Farm
                  );
                }}
                size="xs"
                disabled={props.realmFoodDetails.totalFarmHarvest === 0}
                variant="primary"
              >
                Export
              </Button>
              {/* eslint-disable */}
              <Button
                onClick={() => {
                  harvest(
                    realm?.realmId,
                    HarvestType.Store,
                    RealmBuildingId.Farm
                  );
                }}
                size="xs"
                disabled={props.realmFoodDetails.totalFarmHarvest === 0}
                variant="primary"
              >
                Harvest
              </Button>
            </div>
          )}

          <CardTitle className="mt-10">
            Fishing Villages - Capacity {fishingVillageCapacity}
          </CardTitle>
          <div className="flex flex-wrap justify-between p-2">
            <div className="w-1/2">
              <h5>villages built </h5>
              <div className="text-5xl">
                {props.realmFoodDetails.villagesBuilt}
              </div>
            </div>
            <div className="w-1/2">
              <h5>villages to harvest </h5>
              <div className="text-5xl">
                {props.realmFoodDetails.totalVillageHarvest}
              </div>
            </div>
            <div className="w-1/2">
              <h5>time till next harvest </h5>
              <div className="text-5xl">
                <CountdownTimer
                  date={(
                    (HARVEST_LENGTH -
                      props.realmFoodDetails
                        .totalTimeRemainingUntilVillageHarvest) *
                      1000 +
                    new Date().getTime()
                  ).toString()}
                />
              </div>
            </div>
            <div className="w-1/2">
              <h5>decayed villages</h5>
              <div className="text-5xl">
                {props.realmFoodDetails.decayedVillages}
              </div>
            </div>
          </div>
          {isOwner && (
            <div className="flex space-x-2">
              <Button
                onClick={() => {
                  create(
                    realm?.realmId,
                    input.fishingVillagesToBuild,
                    RealmBuildingId.FishingVillage
                  );
                }}
                size="xs"
                variant="primary"
              >
                Build
              </Button>
              <InputNumber
                value={input.fishingVillagesToBuild}
                inputSize="sm"
                colorScheme="transparent"
                className="w-12 bg-white border rounded border-white/40"
                min={1}
                max={fishingVillageCapacity}
                stringMode
                onChange={(value: ValueType) =>
                  setInput({
                    farmsToBuild: input.farmsToBuild,
                    fishingVillagesToBuild: value.toString(),
                    workHutsToBuild: input.workHutsToBuild,
                  })
                }
              />{' '}
              <Button
                onClick={() => {
                  harvest(
                    realm?.realmId,
                    HarvestType.Export,
                    RealmBuildingId.FishingVillage
                  );
                }}
                size="xs"
                disabled={props.realmFoodDetails.totalVillageHarvest === 0}
                variant="primary"
              >
                Export
              </Button>
              <Button
                onClick={() => {
                  harvest(
                    realm?.realmId,
                    HarvestType.Store,
                    RealmBuildingId.FishingVillage
                  );
                }}
                size="xs"
                disabled={props.realmFoodDetails.totalVillageHarvest === 0}
                variant="primary"
              >
                Harvest
              </Button>
            </div>
          )}
        </Card>
      </div>
    </BaseRealmDetailPanel>
  );
};

export default Harvests;

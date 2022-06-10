import { Button, ResourceIcon, Table } from '@bibliotheca-dao/ui-lib/base';
import { useState } from 'react';
import useCombat from '@/hooks/settling/useCombat';
import { squadStats } from '@/shared/Getters/Realm';
import { Troop } from '@/shared/squad/Troops';
import type { ItemCost, ResourceCost, TroopInterface } from '@/types/index';
import { findResourceName } from '@/util/resources';
interface Props {
  realmId: number;
  statistics: any;
}
const columns = [
  { Header: 'name', id: 1, accessor: 'name' },
  //   { Header: 'agility', id: 2, accessor: 'agility' },
  //   { Header: 'attack', id: 3, accessor: 'attack' },
  //   { Header: 'defense', id: 4, accessor: 'defense' },
  //   { Header: 'vitality', id: 5, accessor: 'vitality' },
  //   { Header: 'wisdom', id: 6, accessor: 'wisdom' },

  { Header: 'cost', id: 6, accessor: 'troopCost' },
  { Header: 'add', id: 6, accessor: 'add' },
];

const tableOptions = { is_striped: true };

type Row = {
  name: string;
  //   agility: number;
  //   attack: number;
  //   defense: number;
  //   vitality: number;
  //   wisdom: number;
  troopCost: any[];
};
export const ArmoryBuilder = (props: Props) => {
  const { buildSquad } = useCombat({ token_id: props.realmId });
  const [toBuy, setToBuy] = useState<TroopInterface[]>([]);

  const getTroopIds = (troops: TroopInterface[]) => {
    return troops.map((a: TroopInterface) => a.troopId);
  };

  const currentTroops = (troops, tier) => {
    return troops
      .filter((a) => a.tier === tier)
      .map((a, index) => {
        return (
          <Troop
            onSubmit={(value: TroopInterface) =>
              setToBuy((current) => [...current, value])
            }
            onRemove={(value: TroopInterface) => trimTroopFromSquad(value)}
            withPurchase={false}
            key={index}
            troop={a}
            troopsStats={props.statistics}
            className="mb-1 mr-1"
          />
        );
      });
  };

  const trimTroopFromSquad = (troop: TroopInterface) => {
    const index = toBuy.findIndex((a) => a.troopId === troop.troopId);

    setToBuy(() => [...toBuy.splice(index, 1)]);
  };

  const troopCostCell = (cost: ItemCost) => {
    console.log(cost);
    return (
      <div className="w-24">
        <div className="flex justify-between">
          {/* <Lords className="w-4" /> {cost.amount} */}
        </div>

        {cost.resources.map((a, index) => {
          return (
            <div key={index} className="flex justify-between">
              <span className="flex">
                <ResourceIcon
                  resource={
                    findResourceName(a.resourceId)?.trait.replace(' ', '') || ''
                  }
                  size="xs"
                  className="self-center mr-4"
                />
                <span>{a.amount}</span>
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  const mappedRowData: Row[] = (props.statistics as any)?.map((re, index) => {
    console.log(props.statistics);
    return {
      name: <span className="tracking-wider uppercase ">{re.troopName}</span>,
      //   agility: re.agility,
      //   attack: re.attack,
      //   defense: re.defense,
      //   vitality: re.vitality,
      //   wisdom: re.wisdom,
      troopCost: troopCostCell(re.troopCost),
      add: (
        <Button
          variant="secondary"
          size="xs"
          onClick={() => {
            setToBuy((current) => [...current, re]);
          }}
        >
          add to squad
        </Button>
      ),
    };
  });

  const getCostSums = (squad: TroopInterface[]) => {
    const troopIds = squad?.map((a: TroopInterface) => {
      return a?.troopCost;
    });

    const resources = troopIds
      .map((a: any) => {
        return a.resources;
      })
      .flat();

    return resources.reduce((acc, curr) => {
      const index = acc.findIndex(
        (item) => item.resourceId === curr.resourceId
      );
      index > -1
        ? (acc[index].amount += curr.amount)
        : acc.push({
            resourceId: curr.resourceId,
            amount: curr.amount,
          });
      return acc;
    }, []);
  };

  return (
    <div className="w-full">
      <div className="my-4 overflow-y-scroll h-72">
        {mappedRowData && (
          <Table
            columns={columns}
            data={mappedRowData}
            options={tableOptions}
          />
        )}
      </div>
      <div className="flex space-x-2">
        <div className="w-1/2 my-4 shadow-inner bg-gray-800/60">
          <div className="self-center w-full p-4 font-semibold tracking-widest uppercase">
            <h4>Squad Statistics</h4>
            <hr className="py-2" />
            <div className="flex justify-between ">
              Vitality: <span> {squadStats(toBuy).vitality}</span>
            </div>
            <div className="flex justify-between">
              Attack: <span>{squadStats(toBuy).attack}</span>
            </div>
            <div className="flex justify-between">
              Defense: <span>{squadStats(toBuy).defense}</span>
            </div>
            <div className="flex justify-between">
              Wisdom: <span>{squadStats(toBuy).wisdom}</span>
            </div>
            <div className="flex justify-between">
              Agility: <span>{squadStats(toBuy).agility}</span>
            </div>
          </div>
        </div>
        <div className="w-1/2 p-4 my-4 font-semibold shadow-inner bg-gray-800/60">
          <h4>Cost</h4>
          <hr className="py-2 " />
          {getCostSums(toBuy).map((a, index) => {
            return (
              <div key={index} className="flex justify-between">
                <span className="flex justify-between w-full">
                  <ResourceIcon
                    resource={
                      findResourceName(a.resourceId)?.trait.replace(' ', '') ||
                      ''
                    }
                    size="xs"
                    className="self-center mr-4"
                  />
                  <span>{a.amount}</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full p-8 rounded bg-gray-800/60">
        <div className="flex flex-wrap">
          <div className="flex flex-wrap w-full my-1">
            {currentTroops(toBuy, 1)}
          </div>
          <div className="flex flex-wrap w-full my-1 ">
            {currentTroops(toBuy, 2)}
          </div>
          <div className="flex flex-wrap w-full my-1">
            {currentTroops(toBuy, 3)}
          </div>
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={() => buildSquad(getTroopIds(toBuy), 1)}
            className="mt-4"
            size="xs"
            variant="primary"
            disabled={!getTroopIds(toBuy).length}
          >
            Muster the troops
          </Button>
          <Button
            onClick={() => setToBuy(() => [])}
            className="mt-4"
            size="xs"
            variant="primary"
            disabled={!getTroopIds(toBuy).length}
          >
            Clear troops
          </Button>
        </div>
      </div>
    </div>
  );
};

import { Button, ResourceIcon } from '@bibliotheca-dao/ui-lib/base';
import DragIcon from '@bibliotheca-dao/ui-lib/icons/drag.svg';
import type { Identifier, XYCoord } from 'dnd-core';
import { BigNumber } from 'ethers';
import { formatEther } from 'ethers/lib/utils';
import Link from 'next/link';
import { useCallback, useRef, useEffect, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import toast from 'react-hot-toast';
import { twMerge } from 'tailwind-merge';
import { RateChange, getTxCosts } from '@/components/bank/MarketGetters';
import type { ENQUEUED_STATUS } from '@/constants/index';
import { useBankContext } from '@/context/BankContext';
import { useCommandList } from '@/context/CommandListContext';
import { useUIContext } from '@/context/UIContext';
import { useUserBalancesContext } from '@/context/UserBalancesContext';
import { useGameConstants } from '@/hooks/settling/useGameConstants';
import { getTxRenderConfig } from '@/hooks/settling/useTxMessage';
import { useUi } from '@/hooks/useUi';
import { useUiSounds, soundSelector } from '@/hooks/useUiSounds';
import type { ItemCost, CallAndMetadata } from '@/types/index';
import { dndTypes } from '@/types/index';

type Prop = {
  onSubmit?: () => void;
};
interface CommandListItem {
  index: number;
  call: CallAndMetadata;
  status?: typeof ENQUEUED_STATUS;
  onRemove?: () => void;
  onReorder?: (dragIndex: number, hoverIndex: number) => void;
}
interface DragTx {
  index: number;
  transactionHash: string;
  type: string;
}

export const CommandListItem = (props: CommandListItem) => {
  // Multicall descriptions are generated by the TransactionQueueContext
  // as array of objects that describe how to render sub-calls.
  const ref = useRef<any>(null);

  const multicalls = props.call.metadata?.multicalls;

  const { title: configTitle, description: configDescription } =
    getTxRenderConfig(props.call);
  const title = props.call.metadata?.title || configTitle;
  const description = (
    <span>{props.call.metadata?.description || configDescription}</span>
  );

  const [{ handlerId }, drop] = useDrop<
    DragTx,
    void,
    { handlerId: Identifier | null }
  >({
    accept: dndTypes.TX,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragTx, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = props.index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      props.onReorder && props.onReorder(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: dndTypes.TX,
    item: () => {
      return {
        index: props.index,
      };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  // no dnd if tx is in status tab
  props.onRemove && drag(drop(ref));

  return (
    <div
      ref={ref}
      data-handler-id={handlerId}
      className={twMerge(
        `rounded-xl flex p-4 w-full mb-2 bg-gray-1000/80 border border-yellow-800`,
        isDragging ? 'opacity-0' : 'opacity-100'
      )}
    >
      {props.onRemove && (
        <DragIcon className="fill-current w-5 -translate-x-1.5 cursor-grab" />
      )}
      <div className="flex flex-wrap w-full p-1 rounded bg-gray-1000/19">
        <div className="flex justify-between w-full pb-2 mb-2 border-b border-white/20">
          <h5 className="self-center text-xs">ENQUEUED</h5>
          <div className="self-center ">
            {props.onRemove && (
              <Button
                size="xs"
                variant="outline"
                texture={false}
                onClick={props.onRemove}
              >
                Remove
              </Button>
            )}
          </div>
        </div>

        <div>
          <h3>{title}</h3>
          <div className="text-gray-700">{description}</div>
        </div>
      </div>
      {/* <span>{props.call.lastUpdatedAt}</span> */}
    </div>
  );
};

export const CommandList: React.FC<Prop> = (props) => {
  const txQueue = useCommandList();
  const { play } = useUiSounds(soundSelector.sign);
  const { checkUserHasCheckoutResources } = useGameConstants();
  const [hasDeficit, setHasDeficit] = useState(false);

  const [resourceCostsById, setResourceCostsById] = useState<
    Record<string, { resourceName: string; amount: number }>
  >({});

  useEffect(() => {
    // Note: All metadata.costs are assumed to follow the ItemCost interface

    const allResourceCosts = getTxCosts(txQueue)
      .map((t) => t.resources)
      .flat(1);

    const costsByResourceId = {};

    setHasDeficit(false);

    allResourceCosts.forEach((c) => {
      const amount = (costsByResourceId[c.resourceId]?.amount ?? 0) + c.amount;
      costsByResourceId[c.resourceId] = {
        ...costsByResourceId[c.resourceId],
        resourceName: c.resourceName,
        amount,
      };

      if (
        !checkUserHasCheckoutResources({
          cost: amount,
          id: c.resourceId,
        })
      ) {
        setHasDeficit(true);
      }
    });

    setResourceCostsById(costsByResourceId);
  }, [txQueue]);

  const reorderCards = useCallback((dragIndex: number, hoverIndex: number) => {
    txQueue.reorderQueue(dragIndex, hoverIndex);
  }, []);

  const signDecree = () => {
    play();
    txQueue
      .executeMulticall([])
      .then((_txResp) => {
        props.onSubmit && props.onSubmit();
      })
      .catch((err) => {
        console.log(err);
        // TODO: Handle error
      });
  };

  const { balance } = useUserBalancesContext();
  const { batchAddResources } = useBankContext();
  const { toggleTrade } = useUIContext();
  return (
    <>
      {txQueue.transactions.length > 0 ? (
        <>
          <p className="z-0 py-2 sm:text-lg">
            Ser, your royal signature is requested to execute the following
            commands:
          </p>
          <div className="flex justify-between mb-6 space-x-2">
            <Button
              disabled={txQueue.transactions.length == 0 || hasDeficit}
              className="flex-1"
              size="md"
              variant="primary"
              onClick={() => {
                signDecree();
              }}
            >
              {txQueue.transactions.length > 0
                ? `Sign for ${txQueue.transactions.length} Command${
                    txQueue.transactions.length > 1 ? 's' : ''
                  }`
                : 'Sign the Decree'}
            </Button>
            <Button
              disabled={txQueue.transactions.length == 0}
              size="md"
              texture={false}
              variant="outline"
              onClick={() => txQueue.empty()}
            >
              Remove All
            </Button>
          </div>
        </>
      ) : (
        <div className="mt-4 text-lg text-center">
          Transaction queue is empty.
        </div>
      )}

      {txQueue.transactions.length && Object.keys(resourceCostsById).length ? (
        <div className="mb-6 ">
          <div className="flex flex-wrap gap-2 mt-2">
            {Object.keys(resourceCostsById).map((resourceId) => {
              const resource = resourceCostsById[resourceId];
              return (
                <div className="flex flex-col items-center" key={resourceId}>
                  <ResourceIcon
                    withTooltip
                    size="xs"
                    resource={resource.resourceName}
                  />
                  <span
                    className={
                      checkUserHasCheckoutResources({
                        cost: resource.amount,
                        id: resourceId,
                      })
                        ? 'text-green-600 shadow-green-100 drop-shadow-lg xs'
                        : 'text-red-200 xs'
                    }
                  >
                    {resource.amount.toFixed(2)}
                  </span>
                </div>
              );
            })}
            <Button
              onClick={() => {
                sessionStorage.setItem('reconcileTrade', 'true');
                batchAddResources(
                  Object.keys(resourceCostsById)
                    .filter(
                      (r) =>
                        !checkUserHasCheckoutResources({
                          cost: resourceCostsById[r].amount,
                          id: r,
                        })
                    )
                    .map((r) => {
                      const resource = resourceCostsById[r];
                      const checkoutBalance =
                        balance.find((a) => a.resourceId === parseInt(r))
                          ?.checkoutAmount || 0;
                      return {
                        resourceId: parseInt(r),
                        resourceName: resource.resourceName,
                        amount:
                          resource.amount * 1.2 -
                          +formatEther(BigNumber.from(checkoutBalance)),
                      };
                    })
                );
                toast(
                  <span>
                    Missing resources added to the cart
                    <Button onClick={toggleTrade}>Open Now</Button>
                  </span>
                );
              }}
              size="xs"
              variant="outline"
              className="ml-auto"
            >
              reconcile deficits
            </Button>
          </div>
        </div>
      ) : (
        ''
      )}
      {txQueue.transactions.map((c, i) => (
        <CommandListItem
          key={`${c.keyId}::${c.contractAddress}:${c.entrypoint}::${c.calldata
            ?.map((bignum) => bignum?.toString())
            .join(':')}`}
          call={c}
          index={i}
          onReorder={reorderCards}
          onRemove={() => txQueue.remove(c)}
        />
      ))}
    </>
  );
};

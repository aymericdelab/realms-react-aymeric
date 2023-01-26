import { Tabs } from '@bibliotheca-dao/ui-lib';

import { useMemo } from 'react';
import { twMerge } from 'tailwind-merge';
import { SwapResources } from '@/components/bank/SwapResources';
import { BaseSideBarPanel } from '@/components/ui/sidebar/BaseSideBarPanel';
import {
  leftExpandedOffsets,
  leftShrinkedOffsets,
  sidebarClassNames,
} from '@/constants/ui';

import { useUIContext } from '@/context/UIContext';
import AtlasSideBar from '../map/AtlasSideBar';
import { LpMerchant } from './LpMerchant';
import { Nexus } from './Nexus';

type ResourceSwapSideBarProps = {
  resources?: string[];
  isOpen: boolean;
  onClose?: () => void;
};

export const ResourceSwapSideBar = ({
  isOpen,
  onClose,
  resources,
}: ResourceSwapSideBarProps) => {
  const { empireSidebar } = useUIContext();
  const offsetClasses = useMemo(() => {
    return empireSidebar ? leftShrinkedOffsets : leftExpandedOffsets;
  }, [empireSidebar]);
  return (
    <AtlasSideBar
      position="left"
      isOpen={isOpen}
      containerClassName={twMerge(sidebarClassNames, offsetClasses, 'z-40')}
      onClose={onClose}
    >
      {isOpen && <ResourceSwapSideBarPanel resources={resources} />}
    </AtlasSideBar>
  );
};

type ResourceSwapSideBarPanelProps = {
  resources?: string[];
  onClose?: () => void;
};
export const ResourceSwapSideBarPanel = (
  props: ResourceSwapSideBarPanelProps
) => {
  const tabs = useMemo(
    () => [
      {
        label: 'Swap',
        component: <SwapResources key="1" />,
      },
      {
        label: 'LP',
        component: <LpMerchant />,
      },
      // {
      //   label: 'Nexus',
      //   component: <Nexus />,
      // },
    ],
    []
  );
  return (
    <BaseSideBarPanel className="z-50" position="left" onClose={props.onClose}>
      <div className="relative px-6 rounded">
        <Tabs className="h-full" variant="primary">
          <Tabs.List className="mt-2 rounded">
            {tabs.map((tab) => (
              <Tabs.Tab key={tab.label} className="">
                {tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          <Tabs.Panels className="h-full py-2 rounded shadow-inner bg-gray-1000/10">
            {tabs.map((tab) => (
              <Tabs.Panel className="mt-0" key={tab.label}>
                {tab.component}
              </Tabs.Panel>
            ))}
          </Tabs.Panels>
        </Tabs>
      </div>
    </BaseSideBarPanel>
  );
};

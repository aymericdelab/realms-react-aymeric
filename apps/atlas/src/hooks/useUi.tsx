import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAtlasContext } from '@/context/AtlasContext';
import type { AssetType } from '@/hooks/useAtlasMap';

export type UIContextType = {
  assetSidebar: AssetType | null;
  toggleAsset: (type: AssetType) => void;
  closeAsset: () => void;
  toggleEmpire: () => void;
  toggleTrade: () => void;
  toggleOnboarding: () => void;
  toggleTransactionCart: () => void;
  toggleChatSidebar: () => void;
  toggleSettleRealms: () => void;
  toggleAccountSettings: () => void;
  toggleResourcesList: () => void;
  toggleLeaderboard: () => void;
  toggleVizir: () => void;
  toggleLore: () => void;
  toggleSplash: () => void;
  closeAll: () => void;
  empireSidebar: boolean;
  accountSettingsModal: boolean;
  tradeSidebar: boolean;
  transactionCart: boolean;
  chatSidebar: boolean;
  settleRealmsSidebar: boolean;
  resourcesListSidebar: boolean;
  loreSidebar: boolean;
  leaderboardSidebar: boolean;
  onboarding: boolean;
  vizirSidebar: boolean;
  showSplash: boolean;
};

export function useUi() {
  const { mapContext } = useAtlasContext();
  const selectedAsset = mapContext.selectedAsset;
  const router = useRouter();
  const [accountSettingsModal, setAccountSettingsModal] =
    useState<boolean>(true);
  const [assetSidebar, setAssetSidebar] = useState<AssetType | null>(null);
  const [empireSidebar, setEmpireSidebar] = useState<boolean>(false);
  const [tradeSidebar, setTradeSidebar] = useState<boolean>(false);
  const [transactionCart, setTransactionCart] = useState<boolean>(false);
  const [chatSidebar, setChatSidebar] = useState<boolean>(false);
  const [settleRealmsSidebar, setSettleRealmsSidebar] = useState(false);
  const [resourcesListSidebar, setResourcesListSidebar] = useState(false);
  const [loreSidebar, setLoreSidebar] = useState(false);
  const [leaderboardSidebar, setLeaderboardSidebar] = useState(false);
  const [vizirSidebar, setVizirSidebar] = useState(false);
  const [showSplash, setShowPlash] = useState(true);

  const [onboarding, setOnboarding] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;
    if (selectedAsset) {
      setAssetSidebar(selectedAsset.type);
      setEmpireSidebar(false);
    }
  }, [router.isReady, selectedAsset]);

  const toggleAccountSettings = () => {
    router.push('/', undefined, { shallow: true });
    closeAll();
    setAccountSettingsModal(!accountSettingsModal);
  };

  const toggleAsset = (type: AssetType) => {
    closeAll();
    if (type == assetSidebar) {
      closeAsset();
      return;
    }
    setAssetSidebar(type);
  };

  const toggleSplash = () => {
    setShowPlash(!showSplash);
    setAccountSettingsModal(false);
  };

  const closeAsset = () => {
    setAssetSidebar(null);
    router.push('/', undefined, { shallow: true });
  };

  const toggleEmpire = () => {
    router.push('/', undefined, { shallow: true });
    closeAll();
    setEmpireSidebar(!empireSidebar);
  };

  const toggleResourcesList = () => {
    setResourcesListSidebar(!resourcesListSidebar);
  };

  const toggleSettleRealms = () => {
    setSettleRealmsSidebar(!settleRealmsSidebar);
  };

  const toggleTrade = () => {
    setTradeSidebar(!tradeSidebar);
  };

  const toggleTransactionCart = () => {
    setTransactionCart(!transactionCart);
  };

  const toggleChatSidebar = () => {
    setChatSidebar(!chatSidebar);
  };

  const toggleOnboarding = () => {
    setOnboarding(!onboarding);
  };

  const toggleLeaderboard = () => {
    setLeaderboardSidebar(!leaderboardSidebar);
  };

  const toggleLore = () => {
    setLoreSidebar(!loreSidebar);
  };

  const closeAll = () => {
    setAccountSettingsModal(false);
    setEmpireSidebar(false);
    setTradeSidebar(false);
    setTransactionCart(false);
    setOnboarding(false);
    setAssetSidebar(null);
    setChatSidebar(false);
    setSettleRealmsSidebar(false);
    setResourcesListSidebar(false);
    setLoreSidebar(false);
    setLeaderboardSidebar(false);
  };

  return {
    toggleAccountSettings,
    accountSettingsModal,
    toggleAsset,
    closeAsset,
    assetSidebar,
    empireSidebar,
    toggleEmpire,
    tradeSidebar,
    toggleTrade,
    transactionCart,
    toggleTransactionCart,
    chatSidebar,
    toggleChatSidebar,
    toggleOnboarding,
    settleRealmsSidebar,
    toggleSettleRealms,
    resourcesListSidebar,
    toggleResourcesList,
    leaderboardSidebar,
    toggleLeaderboard,
    loreSidebar,
    toggleLore,
    toggleSplash,
    showSplash,
    onboarding,
    closeAll,
    vizirSidebar,
    toggleVizir: () => setVizirSidebar(!vizirSidebar),
  };
}

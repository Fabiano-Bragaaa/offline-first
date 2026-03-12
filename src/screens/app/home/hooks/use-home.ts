import { useOrderList, useSyncOrders } from "@domain";
import { getOrderSyncActions } from "@services";
import { useRef, useState } from "react";
import NetInfo from '@react-native-community/netinfo';
import { useEffect } from "react";

export function useHome() {
  const [modalVisible, setModalVisible] = useState(false);
  const { data: orders = [] } = useOrderList();
  const { sync, isSyncing } = useSyncOrders();
  const { setIsOnline } = getOrderSyncActions();
  const hasSyncedOnce = useRef(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      const online = Boolean(state.isConnected && state.isInternetReachable !== false);
      setIsOnline(online);

      if (online && !hasSyncedOnce.current) {
        hasSyncedOnce.current = true;
        sync(undefined);
      } else if (!online) {
        hasSyncedOnce.current = false;
      }
    });

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    orders,
    isSyncing,
    modalVisible,
    setModalVisible,
  };
}
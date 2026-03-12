import { useDeleteOrder, useGetOrder, useUpdateOrder } from "@domain";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

export function useDetails(id: string) {
  const navigation = useNavigation();
  const { data: order, isLoading } = useGetOrder(id);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const { mutate: deleteOrder, isLoading: isDeleting } = useDeleteOrder({
    onSuccess: () => {
      setDeleteModalVisible(false);
      navigation.goBack();
    },
  });
  const { mutate: updateOrder, isLoading: isUpdating } = useUpdateOrder({
    onSuccess: () => setEditModalVisible(false),
  });

  function handleConfirmDelete() {
    deleteOrder(id);
  }

  return {
    order,
    isLoading,
    deleteModalVisible,
    setDeleteModalVisible,
    editModalVisible,
    setEditModalVisible,
    isDeleting,
    isUpdating,
    handleConfirmDelete,
    updateOrder,
  };
}
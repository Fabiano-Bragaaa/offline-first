import type { PropsWithChildren } from 'react';
import { Modal, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

export type CenterModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  contentClassName?: string;
};

export function CenterModal({
  visible,
  onRequestClose,
  children,
  contentClassName,
}: CenterModalProps & PropsWithChildren) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onRequestClose}
    >
      <View className="flex-1 bg-black/40 justify-center items-center">
        <View
          className={twMerge(
            'bg-white rounded-2xl p-6 w-[85%] gap-3',
            contentClassName,
          )}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
}

import React from 'react';
import { Pressable, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  SharedValue,
  withTiming,
} from 'react-native-reanimated';

import { colors, spacing } from '@theme';

import type { IconName } from '../icon/icon';
import { Icon } from '../icon/icon';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;
const ITEM_DELAY_MS = 70;
const OPACITY_DURATION_MS = 120;

type FABItemProps = {
  isExpanded: SharedValue<boolean>;
  index: number;
  iconName: IconName;
  onPress?: () => void;
};

function FABItem({ isExpanded, index, iconName, onPress }: FABItemProps) {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * (index + 1) : 0;
    const translateY = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * ITEM_DELAY_MS;
    const opacityValue = isExpanded.value ? 1 : 0;

    return {
      transform: [{ translateY }],
      opacity: withDelay(delay, withTiming(opacityValue, { duration: OPACITY_DURATION_MS })),
    };
  });

  return (
    <AnimatedPressable
      style={animatedStyles}
      className="absolute bottom-0 self-center mb-2 w-12 h-12 rounded-full bg-white items-center justify-center shadow-md"
      onPress={onPress}
    >
      <Icon name={iconName} size={spacing.s22} color={colors.primary} />
    </AnimatedPressable>
  );
}

type FABAction = {
  iconName: IconName;
  onPress?: () => void;
};

type FloatingActionButtonProps = {
  actions: FABAction[];
  mainColor?: string;
};

export function FloatingActionButton({
  actions,
  mainColor = colors.primary,
}: FloatingActionButtonProps) {
  const isExpanded = useSharedValue(false);

  const handlePress = () => {
    isExpanded.value = !isExpanded.value;
  };

  const plusIconStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(Number(isExpanded.value), [0, 1], [0, 2]);
    const translateValue = withTiming(moveValue);
    const rotateValue = isExpanded.value ? '45deg' : '0deg';

    return {
      transform: [
        { translateX: translateValue },
        { rotate: withTiming(rotateValue) },
      ],
    };
  });

  return (
    <View className="absolute bottom-8 right-6 items-center">
      {actions.map((action, index) => (
        <FABItem
          key={index}
          isExpanded={isExpanded}
          index={index}
          iconName={action.iconName}
          onPress={() => {
            isExpanded.value = false;
            action.onPress?.();
          }}
        />
      ))}

      <AnimatedPressable
        onPress={handlePress}
        style={{ backgroundColor: mainColor }}
        className="z-10 w-14 h-14 rounded-full items-center justify-center shadow-md"
      >
        <Animated.View style={plusIconStyle}>
          <Icon name="plus" color={colors.surface} />
        </Animated.View>
      </AnimatedPressable>
    </View>
  );
}

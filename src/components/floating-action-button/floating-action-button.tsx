import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  SharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const SPRING_CONFIG = {
  duration: 1200,
  overshootClamping: true,
  dampingRatio: 0.8,
};

const OFFSET = 60;

type FABItemProps = {
  isExpanded: SharedValue<boolean>;
  index: number;
  buttonLetter: string;
  onPress?: () => void;
};

function FABItem({ isExpanded, index, buttonLetter, onPress }: FABItemProps) {
  const animatedStyles = useAnimatedStyle(() => {
    const moveValue = isExpanded.value ? OFFSET * (index + 1) : 0;
    const translateY = withSpring(-moveValue, SPRING_CONFIG);
    const delay = index * 70;
    const opacityValue = isExpanded.value ? 1 : 0;

    return {
      transform: [{ translateY }],
      opacity: withDelay(delay, withTiming(opacityValue, { duration: 120 })),
    };
  });

  return (
    <AnimatedPressable
      style={[animatedStyles, styles.shadow, styles.itemButton]}
      onPress={onPress}
    >
      <Text style={styles.itemContent}>{buttonLetter}</Text>
    </AnimatedPressable>
  );
}

type FABAction = {
  label: string;
  onPress?: () => void;
};

type FloatingActionButtonProps = {
  actions: FABAction[];
  mainColor?: string;
};

export function FloatingActionButton({
  actions,
  mainColor = '#4F6EF7',
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
    <View style={styles.container}>
      {actions.map((action, index) => (
        <FABItem
          key={index}
          isExpanded={isExpanded}
          index={index}
          buttonLetter={action.label}
          onPress={() => {
            isExpanded.value = false;
            action.onPress?.();
          }}
        />
      ))}

      <AnimatedPressable
        onPress={handlePress}
        style={[
          styles.shadow,
          styles.mainButton,
          { backgroundColor: mainColor },
        ]}
      >
        <Animated.Text style={[styles.content, plusIconStyle]}>+</Animated.Text>
      </AnimatedPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 32,
    right: 24,
    alignItems: 'center',
  },
  mainButton: {
    zIndex: 1,
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemButton: {
    width: 48,
    height: 48,
    marginBottom: 8,
    borderRadius: 24,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    alignSelf: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: '300',
    lineHeight: 28,
  },
  itemContent: {
    fontSize: 18,
    color: '#4F6EF7',
    fontWeight: '600',
  },
});

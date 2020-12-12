import Animated, {
  useSharedValue,
  withTiming,
  Easing,
  useAnimatedStyle,
  withRepeat,
  withSequence,
} from 'react-native-reanimated';
import {View, Button, StyleSheet} from 'react-native';
import React from 'react';

const ANGLE = 8;
const TIME = 2000;
const EASING = Easing.out(Easing.circle);

export default function WobbleExample() {
  const rotation = useSharedValue(0);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{translateY: rotation.value}],
    };
  });

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 50,
      }}>
      <Animated.View style={[styles.box, style]} />
      <Button
        title="start"
        onPress={() => {
          rotation.value = withSequence(
            // deviate left to start from -ANGLE
            withTiming(200, {duration: TIME / 2, easing: EASING}),
            // wobble between -ANGLE and ANGLE 7 times
            // withRepeat(
            //   withTiming(ANGLE, {
            //     duration: TIME,
            //     easing: EASING,
            //   }),
            //   3,
            //   true,
            // ),
            // go back to 0 at the end
            // withTiming(0, {duration: TIME / 2, easing: EASING}),
          );
        }}
      />
      <Button
        title="start"
        onPress={() => {
          rotation.value = withSequence(
            // deviate left to start from -ANGLE
            // withTiming(-ANGLE, {duration: TIME / 2, easing: EASING}),
            // wobble between -ANGLE and ANGLE 7 times
            // withRepeat(
            //   withTiming(ANGLE, {
            //     duration: TIME,
            //     easing: EASING,
            //   }),
            //   3,
            //   true,
            // ),
            // go back to 0 at the end
            withTiming(0, {duration: TIME / 2, easing: EASING}),
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#001a72',
  },
});

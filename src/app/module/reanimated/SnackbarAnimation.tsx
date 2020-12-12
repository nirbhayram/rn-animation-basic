import React, {useRef} from 'react';
import {Button, View} from 'react-native';
import Animated, {EasingNode} from 'react-native-reanimated';

const {
  set,
  cond,
  eq,
  startClock,
  block,
  timing,
  Value,
  Clock,
  useValue,
  clockRunning,
  and,
  stopClock,
  debug,
} = Animated;

function runTiming2(clock, value, dest) {
  const state = {
    finished: new Value(1),
    position: new Value(value),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 500,
    toValue: new Value(0),
    easing: EasingNode.inOut(EasingNode.exp),
  };

  const reset = [
    set(state.finished, 0),
    set(state.time, 0),
    set(state.frameTime, 0),
  ];

  return block([
    cond(and(state.finished, eq(state.position, value)), [
      ...reset,
      set(config.toValue, dest),
    ]),
    cond(and(state.finished, eq(state.position, dest)), [
      ...reset,
      set(config.toValue, value),
    ]),
    cond(clockRunning(clock), 0, startClock(clock)),
    timing(clock, state, config),
    state.position,
  ]);
}

function runTiming(clock, value) {
  console.log('inside runtiming');
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0),
  };

  const config = {
    duration: 3000,
    toValue: new Value(0),
    easing: EasingNode.inOut(EasingNode.exp),
  };

  const reset = [
    set(state.finished, 0),
    set(state.time, 0),
    set(state.frameTime, 0),
  ];

  return block([
    cond(
      eq(state.finished, new Value(1)),
      [
        // ...reset,
        stopClock(clock),
        // debug('inside block ', set(config.toValue, 1000)),
      ],
      0,
    ),

    set(config.toValue, value),
    cond(clockRunning(clock), 0, startClock(clock)),

    timing(clock, state, config),
    state.position,
  ]);
}

export default () => {
  const clock = new Clock();
  const value = useValue<number>(0);
  console.log('runtiming');
  const base = runTiming(clock, value);
  // const base = runTiming2(clock, 0, 100);
  return (
    <View style={{flex: 1, margin: 32, paddingTop: 200}}>
      <Animated.View
        style={[
          {
            width: '100%',
            height: 50,
            backgroundColor: 'black',
            borderRadius: 10,
          },
          {
            transform: [{translateY: base}],
          },
        ]}
      />
      <Button
        title={'start'}
        onPress={() => {
          value.setValue(100);
        }}
      />
      <Button
        title={'stop'}
        onPress={() => {
          value.setValue(0);
        }}
      />
    </View>
  );
};

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  Animated,
  PanResponder,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  animatedViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    height: 100,
    width: 100,
    borderRadius: 100 / 2,
    position: 'absolute',
  },
  textViewStyle: {color: 'white'},
});

const App = () => {
  const pan = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const location = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const panResponder = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: (_, gesture) => {
        pan.x.setValue(gesture.dx);
        pan.y.setValue(gesture.dy);
      },
      onPanResponderRelease: () => {
        pan.flattenOffset();
        Animated.spring(location, {
          toValue: {
            x: pan.x._value,
            y: pan.y._value,
          },
          speed: 40,
          useNativeDriver: true,
        }).start();
      },
    }),
  )[0];

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Animated.View
        style={styles.safeAreaViewStyle}
        {...panResponder.panHandlers}>
        <Animated.View
          style={[
            styles.animatedViewStyle,
            {
              transform: [{translateX: location.x}, {translateY: location.y}],
            },
          ]}>
          <Text style={styles.textViewStyle}>Swipe outside</Text>
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default App;

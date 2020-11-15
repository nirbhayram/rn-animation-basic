/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useCallback, useState} from 'react';
import {
  Animated,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

const styles = StyleSheet.create({
  safeAreaViewStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
  const value = useState(new Animated.ValueXY({x: 0, y: 0}))[0];
  const moveBall = useCallback(() => {
    Animated.spring(value, {
      toValue: {
        x: Math.random() * (Dimensions.get('screen').width - 100),
        y: Math.random() * (Dimensions.get('screen').height - 100),
      },
      speed: 40,
      useNativeDriver: true,
    }).start();
  }, [value]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeAreaViewStyle}>
        <TouchableOpacity onPress={moveBall}>
          <Animated.View
            style={[
              styles.animatedViewStyle,
              {
                transform: [
                  {translateX: value.getLayout().left},
                  {translateY: value.getLayout().top},
                ],
              },
            ]}>
            <Text style={styles.textViewStyle}>click me</Text>
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default App;

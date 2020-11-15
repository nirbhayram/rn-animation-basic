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
  Text,
  TouchableOpacity,
} from 'react-native';

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
      <SafeAreaView
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity onPress={moveBall}>
          <Animated.View
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'red',
                height: 100,
                width: 100,
                borderRadius: 100 / 2,
                position: 'absolute',
                transform: [
                  {translateX: value.getLayout().left},
                  {translateY: value.getLayout().top},
                ],
              },
            ]}>
            <Text style={{color: 'white'}}>click me</Text>
          </Animated.View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};

export default App;

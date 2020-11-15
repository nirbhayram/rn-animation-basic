import React, {useState} from 'react';
import {Animated, Image, ScrollView, Text, View} from 'react-native';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 100;
const PROFILE_MAX_HEIGHT = 100;
const PROFILE_MIN_HEIGHT = 50;

export default () => {
  const scrollY = useState(new Animated.Value(0))[0];

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileHeight = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [PROFILE_MAX_HEIGHT, PROFILE_MIN_HEIGHT],
    extrapolate: 'clamp',
  });

  const profileImageMarginTop = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [
      HEADER_MAX_HEIGHT - PROFILE_MAX_HEIGHT / 2,
      HEADER_MAX_HEIGHT,
    ],
    extrapolate: 'clamp',
  });

  const zindex = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const headerTitleBottom = scrollY.interpolate({
    inputRange: [
      0,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + PROFILE_MIN_HEIGHT,
      HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + PROFILE_MIN_HEIGHT + 26,
    ],
    outputRange: [-20, -20, -20, 5],
    extrapolate: 'clamp',
  });

  return (
    <View style={{flex: 1}}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: headerHeight,
          backgroundColor: 'lightskyblue',
          zIndex: zindex,
          alignItems: 'center',
        }}>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: headerTitleBottom,
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: 'white'}}>
            Nirbhay Ram
          </Text>
        </Animated.View>
      </Animated.View>
      <ScrollView
        style={{flex: 1}}
        scrollEventThrottle={16}
        onScroll={Animated.event([
          {nativeEvent: {contentOffset: {y: scrollY}}},
        ])}>
        <Animated.View
          style={{
            width: profileHeight,
            height: profileHeight,
            borderRadius: PROFILE_MAX_HEIGHT / 2,
            borderWidth: 3,
            borderColor: 'white',
            overflow: 'hidden',
            marginTop: profileImageMarginTop,
            marginLeft: 10,
          }}>
          <Image
            source={require('../assets/profile.jpeg')}
            style={{flex: 1, width: null, height: null}}
          />
        </Animated.View>
        <Text style={{fontWeight: 'bold', paddingLeft: 10, fontSize: 26}}>
          Nirbhay Ram
        </Text>
        <View style={{height: 1000}} />
      </ScrollView>
    </View>
  );
};

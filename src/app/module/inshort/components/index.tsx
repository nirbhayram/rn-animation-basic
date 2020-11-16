import React, {useEffect, useMemo, useState} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  Text,
  View,
} from 'react-native';

const IMAGES = [
  {uri: require('../assets/img-1.png')},
  {uri: require('../assets/img-2.jpg')},
  {uri: require('../assets/img-3.jpg')},
  {uri: require('../assets/img-4.jpg')},
  {uri: require('../assets/img-5.jpg')},
];

const text =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec sodales lacus dolor, nec interdum tortor aliquet nec. Duis sed accumsan mauris. Proin id sapien ut sem sagittis dictum. Donec sed justo orci. Sed risus quam, sollicitudin tincidunt lobortis a, rhoncus quis tortor. Integer eu efficitur lorem. Aliquam posuere gravida tellus, vitae pellentesque urna viverra sed. Praesent tempus turpis sed molestie lacinia. Morbi id justo id libero interdum pulvinar. Vivamus vel dui lacinia elit rutrum pharetra id in nunc. Nunc quis felis nec odio finibus aliquam quis id sem. Pellentesque eget dolor vitae erat volutpat vehicula. Nullam sit amet blandit diam. Nulla commodo nisi augue, sed viverra est gravida vitae. Morbi tincidunt arcu magna, at ultrices ligula vestibulum ut. Nullam malesuada, massa a egestas euismod, mauris diam scelerisque enim, et gravida nibh nulla et quam. Vestibulum pharetra porta leo, non eleifend nisi fringilla quis.';

export default () => {
  const SCREEN_HEIGHT = Dimensions.get('screen').height;
  const SCREEN_WIDTH = Dimensions.get('screen').width;
  const pan = useState(new Animated.ValueXY())[0];
  const swipedCard = useState(
    new Animated.ValueXY({x: 0, y: -SCREEN_HEIGHT}),
  )[0];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log(currentIndex, ' ******');
  }, [currentIndex]);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderStart: () => true,
        onPanResponderMove: (e, gestureState) => {
          if (gestureState.dy > 0 && currentIndex > 0) {
            swipedCard.y.setValue(-SCREEN_HEIGHT + gestureState.dy);
          } else {
            pan.y.setValue(gestureState.dy);
          }
        },
        onPanResponderRelease: (e, gesture) => {
          if (currentIndex > 0 && gesture.dy > 10 && gesture.vy > 0.1) {
            console.log('swipe down');
            Animated.spring(swipedCard, {
              toValue: {
                x: 0,
                y: 0,
              },
              useNativeDriver: true,
            }).start(() => {
              setCurrentIndex((prevState) => prevState - 1);
              swipedCard.y.setValue(-SCREEN_HEIGHT);
            });
          } else if (-gesture.dy > 10 && -gesture.vy > 0.1) {
            console.log('swipe up');
            Animated.timing(pan, {
              toValue: {
                x: 0,
                y: -SCREEN_HEIGHT,
              },
              duration: 400,
              useNativeDriver: true,
            }).start(() => {
              setCurrentIndex((prevState) => prevState + 1);
              pan.x.setValue(0);
              pan.y.setValue(0);
            });
          } else {
            console.log('swipe back');
            Animated.parallel([
              Animated.spring(pan, {
                toValue: {
                  x: 0,
                  y: 0,
                },
                useNativeDriver: true,
              }),
              Animated.spring(swipedCard, {
                toValue: {
                  x: 0,
                  y: -SCREEN_HEIGHT,
                },
                useNativeDriver: true,
              }),
            ]).start();
          }
        },
      }),
    [currentIndex, pan, swipedCard],
  );

  return (
    <View style={{flex: 1}}>
      {IMAGES.map((item, index) => {
        if (index === currentIndex - 1) {
          return (
            <Animated.View
              {...panResponder.panHandlers}
              style={{
                transform: [
                  {translateX: swipedCard.x},
                  {translateY: swipedCard.y},
                ],
              }}
              key={index}>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  height: SCREEN_HEIGHT,
                  width: SCREEN_WIDTH,
                  backgroundColor: 'white',
                }}>
                <View style={{flex: 2, overflow: 'hidden'}}>
                  <Image
                    source={item.uri}
                    style={{flex: 1, height: null, width: null}}
                  />
                </View>
                <View style={{flex: 3, padding: 20}}>
                  <Text style={{fontSize: 16, fontFamily: 'Verdana'}}>
                    {text}
                  </Text>
                </View>
              </View>
            </Animated.View>
          );
        } else if (index < currentIndex) {
          return null;
        }
        if (index === currentIndex) {
          return (
            <Animated.View
              {...panResponder.panHandlers}
              style={{transform: [{translateX: pan.x}, {translateY: pan.y}]}}
              key={index}>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  height: SCREEN_HEIGHT,
                  width: SCREEN_WIDTH,
                  backgroundColor: 'white',
                }}>
                <View style={{flex: 2, overflow: 'hidden'}}>
                  <Image
                    source={item.uri}
                    style={{flex: 1, height: null, width: null}}
                  />
                </View>
                <View style={{flex: 3, padding: 20}}>
                  <Text style={{fontSize: 16, fontFamily: 'Verdana'}}>
                    {text}
                  </Text>
                </View>
              </View>
            </Animated.View>
          );
        } else {
          return (
            <Animated.View key={index}>
              <View
                style={{
                  flex: 1,
                  position: 'absolute',
                  height: SCREEN_HEIGHT,
                  width: SCREEN_WIDTH,
                  backgroundColor: 'white',
                }}>
                <View style={{flex: 2, overflow: 'hidden'}}>
                  <Image
                    source={item.uri}
                    style={{flex: 1, height: null, width: null}}
                  />
                </View>
                <View style={{flex: 3, padding: 20}}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: 'Verdana',
                      backgroundColor: 'white',
                    }}>
                    {text}
                  </Text>
                </View>
              </View>
            </Animated.View>
          );
        }
      }).reverse()}
    </View>
  );
};

import React, {useRef, useState, useEffect} from 'react';
import {Animated, View, StyleSheet, PanResponder, Text} from 'react-native';

const DraggableItem = props => {
  const {locationX, locationY, onDragRelease, disableDrag, RenderItem} = props;
  const [location, setLocation] = useState({
    x: 0,
    y: 0,
  });
  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    if (locationX && locationY) {
      setLocation({x: locationX, y: locationY});
      pan.setValue({x: locationX, y: locationY});
    } else {
      pan.setValue({x: location.x, y: location.y});
    }
  }, []);

  useEffect(() => {
    if (onDragRelease) {
      onDragRelease(location);
    }
  }, [location]);

  const handleChangePanLocation = (e, gesture) => {
    setLocation({x: pan.x, y: pan.y});
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !disableDrag,
      onPanResponderGrant: (e, gesture) => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gesture) => {
        handleChangePanLocation('AFTER =>', gesture);
        pan.flattenOffset();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={{
        transform: [{translateX: pan.x}, {translateY: pan.y}],
      }}
      {...panResponder.panHandlers}>
      {RenderItem && <RenderItem></RenderItem>}
      {!RenderItem && <View style={styles.box} />}
    </Animated.View>
  );
};
export default React.memo(DraggableItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});

import {Box, Button, Center, HStack, Text} from 'native-base';
import React, {useState} from 'react';
import Draggable from 'react-native-draggable';
import * as RootNavigation from '../../helper';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function ControllerLayout() {
  const [hiddenAction, setHiddenAction] = useState(false);
  const [items, setItems] = useState([
    {
      x: 209.3333282470703,
      y: 399.3333282470703,
      text: null,
      icon_name: 'arrow-down-box',
      icon_color: 'black',
    },
    {
      x: 41.33332824707031,
      y: 32.99999237060547,
      text: null,
      icon_name: 'arrow-left-box',
      icon_color: 'red',
    },
  ]);
  const handleDragItem = ({item = Object, index = Number}) => {
    console.log(item.nativeEvent);
    let pageX = item.nativeEvent.pageX;
    let pageY = item.nativeEvent.pageX;
    let locationX = item.nativeEvent.locationX;
    let locationY = item.nativeEvent.locationY;
    let btnItem = items;
    btnItem[index].x = locationX;
    btnItem[index].y = locationY;
    setItems([...btnItem]);
  };
  const eventDrag = (e, data) => {
    console.log(data);
    console.log(e.nativeEvent);
  };
  const renderShape = ({item = Object, index = Number}) => {
    return (
      <Draggable
        key={index}
        x={item.x}
        y={item.y}
        moveX={() => console.log('Test')}
        onShortPressRelease={() => console.log('touched!!', index)}
        onDragRelease={val => handleDragItem({item: val, index: index})}
        // onDragRelease={eventDrag}
        reverse={false}>
        <MatComIcon name={item.icon_name} size={75} color={item.icon_color} />
      </Draggable>
    );
  };
  const renderFooter = () => {
    return (
      <HStack space={3} justifyContent="center" safeAreaBottom paddingY="1">
        <Button
          colorScheme="success"
          marginX="7"
          onPress={() => console.log('Save')}>
          <Center>
            <Text color="white" fontSize="12">
              Save
            </Text>
          </Center>
        </Button>
        <Button
          colorScheme="amber"
          marginX="7"
          onPress={() => setHiddenAction(true)}>
          <Center>
            <Text color="white" fontSize="12">
              Hidden
            </Text>
          </Center>
        </Button>
        <Button
          colorScheme="danger"
          marginX="7"
          onPress={() => RootNavigation.goBack()}>
          <Center>
            <Text color="white" fontSize="12">
              Exit
            </Text>
          </Center>
        </Button>
      </HStack>
    );
  };
  return (
    <Box flex={1} safeAreaTop width="100%" alignSelf="center">
      <Center flex={1} bg="muted.200">
        {items.length > 0 &&
          items.map((item, index) => {
            return renderShape({item: item, index: index});
          })}
      </Center>
      {!hiddenAction && renderFooter()}
    </Box>
  );
}

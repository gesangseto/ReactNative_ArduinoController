import {Box, Button, Center, HStack, Text} from 'native-base';
import React, {useState} from 'react';
import Draggable from 'react-native-draggable';
import * as RootNavigation from '../../helper';

export default function ControllerLayout() {
  const [hiddenAction, setHiddenAction] = useState(false);
  const [items, setItems] = useState([
    {
      x: 75,
      y: 100,
      name: 'Is Black',
      color: 'black',
    },
    {
      x: 200,
      y: 300,
      name: 'Is Red',
      color: 'red',
    },
  ]);
  const handleDragItem = ({item = Object, index = Number}) => {
    console.log('Drage', item.nativeEvent);
  };
  const renderShape = ({item = Object, index = Number}) => {
    return (
      <Draggable
        key={index}
        x={item.x}
        y={item.y}
        renderColor={`${item.color}`}
        renderText={item.name}
        onShortPressRelease={() => console.log('touched!!', index)}
        onDragRelease={val => handleDragItem({item: val, index: index})}
      />
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

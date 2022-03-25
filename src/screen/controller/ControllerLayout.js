import {Box, Button, Center, HStack, Text, View} from 'native-base';
import React, {useState, useEffect} from 'react';
import Draggable from 'react-native-draggable';
import * as RootNavigation from '../../helper';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {DraggableItem} from '../../components';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FormControllerLayout from './FormControllerLayout';

export default function ControllerLayout() {
  const [hiddenAction, setHiddenAction] = useState(false);
  const [showFormController, setShowFormController] = useState(false);
  const [items, setItems] = useState([
    {
      x: 15.3333282470703,
      y: 250.3333282470703,
      text: 'null',
      icon_name: 'arrow-down-box',
      icon_color: 'black',
    },
    {
      x: 0.33332824707031,
      y: 32.99999237060547,
      text: null,
      icon_name: 'arrow-left-box',
      icon_color: 'red',
    },
  ]);
  const handleDragItem = ({position = Object, index = Number}) => {
    console.log(position);
    console.log(index);
    let temp_item = items;
    temp_item[index].x = position.x;
    temp_item[index].y = position.y;
    setItems([...temp_item]);
  };

  const handleShortPress = ({item = Object, index = Number}) => {
    console.log('Short Press item => ', item);
  };
  const handleLongPress = ({item = Object, index = Number}) => {
    setShowFormController(true);
  };

  useEffect(() => {}, []);

  const renderShape = ({item = Object, index = Number}) => {
    return (
      <DraggableItem
        key={index}
        // disableDrag={true}
        locationX={item.x}
        locationY={item.y}
        onDragRelease={loc => handleDragItem({position: loc, index: index})}
        RenderItem={() => (
          <TouchableOpacity
            style={{alignItems: 'center'}}
            onPress={() => handleShortPress({item: item, index: index})}
            onLongPress={() => handleLongPress({item: item, index: index})}>
            <MatComIcon
              name={item.icon_name}
              size={75}
              color={item.icon_color}
            />
            <Text>{item.text}</Text>
          </TouchableOpacity>
        )}></DraggableItem>
    );
  };
  const renderFooter = () => {
    return (
      <HStack space={3} justifyContent="center" safeAreaBottom paddingY="1">
        <Button
          colorScheme="success"
          w={20}
          onPress={() => console.log('Save')}>
          <Center>
            <Text color="white" fontSize="12">
              Save
            </Text>
          </Center>
        </Button>
        <Button
          colorScheme="info"
          w={20}
          onPress={() => setShowFormController(true)}>
          <Center>
            <Text color="white" fontSize="12">
              Add
            </Text>
          </Center>
        </Button>
        <Button
          colorScheme="amber"
          w={20}
          onPress={() => setHiddenAction(true)}>
          <Center>
            <Text color="white" fontSize="12">
              Hidden
            </Text>
          </Center>
        </Button>
        <Button
          colorScheme="danger"
          w={20}
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

      <FormControllerLayout
        isOpen={showFormController}
        onClose={() => setShowFormController(false)}
      />
    </Box>
  );
}

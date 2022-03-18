import {
  Center,
  Divider,
  Text,
  VStack,
  Button,
  Box,
  Stack,
  HStack,
  ScrollView,
  Heading,
  useTheme,
  Pressable,
} from 'native-base';
import React, {useState} from 'react';
import {Dimensions, SafeAreaView} from 'react-native';
import {arduino_logo} from '../../assets';

const TabBarHeight = 48;
const HeaderHeight = 300;
const boxItemSize = Dimensions.get('window').width - 30;
const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export default function ControllerScreen() {
  const {colors} = useTheme();

  const renderBoxItem = ({item, index}) => {
    return (
      <Center
        key={index}
        size={16}
        margin={2}
        bg="primary.400"
        rounded="md"
        _text={{
          color: 'white',
        }}
        shadow={3}>
        Box 1
      </Center>
    );
  };

  return (
    <ScrollView
      maxW="100%"
      h="100%"
      _contentContainerStyle={{
        px: '20px',
        mb: '4',
        minW: '72',
      }}>
      {Array(100)
        .fill()
        .map((item, index) => renderBoxItem({item, index}))}
    </ScrollView>
  );
}

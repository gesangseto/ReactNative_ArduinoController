import {
  Center,
  Divider,
  Text,
  VStack,
  Image,
  Box,
  ScrollView,
  Heading,
  SwipeListView,
  useTheme,
} from 'native-base';
import React, {useState} from 'react';
import {arduino_logo} from '../../assets';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export default function HomeScreen() {
  const [bluetoothActive, setBluetoothActive] = useState(false);
  const {colors} = useTheme();

  const loadHistory = (item, index) => {
    let warna = 'coolGray.200';
    if (index % 2 == 0) {
      warna = 'coolGray.500';
    }
    return (
      <Box key={index} bg={warna} h={30} borderRadius={5} mar={5}>
        <Text py={1} px={5}>
          WEW
        </Text>
      </Box>
    );
  };
  return (
    <Box>
      <Center
        marginX={1}
        bg={{
          linearGradient: {
            colors: ['warmGray.50', 'coolGray.500'],
            start: [0, 0],
            end: [1, 0],
          },
        }}
        borderBottomRadius={10}>
        <Image
          size={200}
          resizeMode={'contain'}
          borderBottomRadius={10}
          source={arduino_logo}
          alt="Arduino"
        />
      </Center>

      <VStack space={2} alignItems="center" paddingTop={10}>
        <Text bold paddingLeft={5} alignSelf="flex-start">
          Bluetooth Connection
        </Text>
        <Divider thickness="3" />
        {bluetoothActive ? (
          <Center
            onTouchStart={() => setBluetoothActive(false)}
            rounded="md"
            shadow={3}
            w="80"
            h="20"
            bg={{
              linearGradient: {
                colors: ['tertiary.100', 'tertiary.800'],
                start: [0, 0],
                end: [1, 0],
              },
            }}>
            <Text>Connected : 16g7678dhf9</Text>
          </Center>
        ) : (
          <Center
            onTouchStart={() => setBluetoothActive(true)}
            rounded="md"
            shadow={3}
            w="80"
            h="20"
            bg={{
              linearGradient: {
                colors: ['secondary.100', 'secondary.800'],
                start: [0, 0],
                end: [1, 0],
              },
            }}>
            <Text>Not Connected</Text>
          </Center>
        )}
      </VStack>

      <VStack space={2} alignItems="center" paddingTop={10}>
        <Text bold paddingLeft={5} alignSelf="flex-start">
          History Command
        </Text>
        <Divider thickness="3" />
        <Center>
          <ScrollView shadow={3} w="80" h="20">
            <VStack flex="1">
              {Array(100)
                .fill()
                .map((item, index) => loadHistory(item, index))}
            </VStack>
          </ScrollView>
        </Center>
      </VStack>
    </Box>
  );
}

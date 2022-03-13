import {Center, Divider, Text, VStack} from 'native-base';
import React from 'react';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

export default function HomeScreen() {
  return (
    <VStack space={2} alignItems="center" paddingTop={10} paddingBottom={10}>
      <Center
        onTouchStart={() => console.log('tap')}
        rounded="md"
        shadow={3}
        w="80"
        h="20"
        bg={{
          linearGradient: {
            colors: ['lightBlue.300', 'violet.800'],
            start: [0, 0],
            end: [1, 0],
          },
        }}>
        <Text>Bluetooth Connection</Text>
      </Center>
      <Divider />
      <Center w="80" h="20" bg="indigo.300" rounded="md" shadow={3}>
        <Text>Wireless Connection</Text>
      </Center>
    </VStack>
  );
}

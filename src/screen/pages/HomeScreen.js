import {Center, Heading, NativeBaseProvider, VStack} from 'native-base';
import React from 'react';
import NativeBaseIcon from '../../components/NativeBaseIcon';

// Color Switch Component
const HomeScreen = () => {
  return (
    <NativeBaseProvider>
      <Center
        _dark={{bg: 'blueGray.900'}}
        _light={{bg: 'blueGray.50'}}
        px={4}
        flex={1}>
        <VStack space={5} alignItems="center">
          <NativeBaseIcon />
          <Heading size="lg">Welcome to Arduino Controller</Heading>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};
export default HomeScreen;

import * as RootNavigation from '../helper';
import {
  Center,
  Code,
  Heading,
  HStack,
  Link,
  NativeBaseProvider,
  Text,
  VStack,
} from 'native-base';
import React, {useEffect} from 'react';
import NativeBaseIcon from '../components/NativeBaseIcon';
import {
  getDBConnection,
  createTableController,
  insertController,
  getController,
} from '../models';

// Color Switch Component

const initial_data_controller = {
  // id: '0',
  controller_name: 'ADD',
  controller_desc: 'Add more controller',
  code: 'add',
  background_color: 'tertiary',
  icon_name: 'plus-box-outline',
  icon_color: 'black',
};

const SplashScreen = () => {
  useEffect(() => {
    (async function () {
      await initial_controller();
      setTimeout(() => {
        RootNavigation.navigateReplace('MainScreen');
      }, 500);
    })();
  }, []);

  const initial_controller = async () => {
    const db = await getDBConnection();
    await createTableController(db);
    let datas = await getController(db);
    if (datas.length === 0) await insertController(db, initial_data_controller);
  };

  return (
    <NativeBaseProvider>
      <Center
        _dark={{bg: 'blueGray.900'}}
        _light={{bg: 'blueGray.50'}}
        px={4}
        flex={1}>
        <VStack space={5} alignItems="center">
          <NativeBaseIcon />
          <Heading size="lg">Welcome to NativeBase Splash Screen</Heading>
          <HStack space={2} alignItems="center">
            <Text>Edit</Text>
            <Code>App.tsx</Code>
            <Text>and save to reload.</Text>
          </HStack>
          <Link href="https://docs.nativebase.io" isExternal>
            <Text color="primary.500" underline fontSize={'xl'}>
              Learn NativeBase
            </Text>
          </Link>
        </VStack>
      </Center>
    </NativeBaseProvider>
  );
};
export default SplashScreen;

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {NativeBaseProvider} from 'native-base';
import React, {useEffect} from 'react';
import {navigationRef} from './helper';
import Router from './router';

const App = () => {
  return (
    <NativeBaseProvider>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;

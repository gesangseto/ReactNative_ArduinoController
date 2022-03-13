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
import React from 'react';
import {navigationRef} from './helper';
import Router from './router';

const config = {
  dependencies: {
    'linear-gradient': require('react-native-linear-gradient').default,
  },
};

const App = () => {
  return (
    <NativeBaseProvider config={config}>
      <NavigationContainer ref={navigationRef}>
        <Router />
      </NavigationContainer>
    </NativeBaseProvider>
  );
};
export default App;

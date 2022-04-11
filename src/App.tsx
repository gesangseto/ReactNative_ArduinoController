/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { PortalProvider } from 'react-native-portal';
import { navigationRef } from './helper';
import Router from './router';

 
 
 const App = () => {
   return (
      <PortalProvider>
         <NavigationContainer ref={navigationRef}>
            <Router />
         </NavigationContainer>
      </PortalProvider>
   );
 };
 export default App;
 
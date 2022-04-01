import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import HomeScreen from './pages/HomeScreen';
import ControllerScreen from './pages/ControllerScreen';

const Drawer = createDrawerNavigator();

function Component(props) {
  return (
    <>
      <Text mt="12" fontSize="18">
        This is {props.route.name} page.
      </Text>
    </>
  );
}
export default function MainScreen() {
  return (
    <SafeAreaView flex={1}>
      <Drawer.Navigator
        screenOptions={{
          drawerType: 'back',
          drawerStyle: {
            backgroundColor: 'white',
            // width: 240,
          },
        }}>
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Command" component={Component} />
        <Drawer.Screen name="Controller" component={ControllerScreen} />
      </Drawer.Navigator>
    </SafeAreaView>
  );
}

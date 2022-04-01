import * as RootNavigation from '../helper';
import React, {useEffect} from 'react';
import {
  getDBConnection,
  createTableControllerLayout,
  createTableController,
  insertController,
  getController,
} from '../models';
import {Text} from 'react-native';

// Color Switch Component

const initial_data_controller = {
  // id: '0',
  controller_name: 'ADD',
  controller_desc: 'Add more controller',
  code: 'add',
  background_color: '#82db69',
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
    await createTableControllerLayout(db);
    let datas = await getController(db);
    if (datas.length === 0) await insertController(db, initial_data_controller);
  };

  return <Text>HALLO</Text>;
};
export default SplashScreen;

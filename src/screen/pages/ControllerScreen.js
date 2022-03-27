import {Button} from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import * as RootNavigation from '../../helper';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getDBConnection, getController, insertController} from '../../models';
import FormControllerProfile from '../controller/FormControllerProfile';

const initial_data = {
  id: '',
  controller_name: '',
  controller_desc: '',
  code: '',
  background_color: '',
  icon_name: '',
  icon_color: 'black',
};

export default function Example() {
  const [items, setItems] = React.useState([]);
  const [modalForm, setModalForm] = React.useState(false);
  const [modalData, setModalData] = React.useState({});

  useEffect(() => {
    getDataController();
  }, []);

  const getDataController = async () => {
    const db = await getDBConnection();
    let datas = await getController(db);
    console.log(datas);
    setItems([...datas]);
  };

  const handleSubmit = async val => {
    const db = await getDBConnection();
    await insertController(db, val);
    await getDataController();
    RootNavigation.navigate('ControllerLayout', val);
    return;
  };

  const handleClickBoxItem = item => {
    console.log(item);
    if (item.code === 'add') {
      setModalData(initial_data);
      setModalForm(true);
    }
  };
  const handleLongPressBoxItem = item => {
    if (item.code != 'add') {
      setModalData(initial_data);
      setModalForm(true);
    }
  };
  const renderBoxItem = item => {
    return (
      <Button
        onPress={() => handleClickBoxItem(item)}
        onLongPress={() => handleLongPressBoxItem(item)}
        style={[styles.itemContainer]}
        colorScheme={item.background_color}>
        <Text style={styles.itemName}>{item.controller_name}</Text>
        <Text style={styles.itemDesc}>{item.controller_desc}</Text>
        <MatComIcon name={item.icon_name} size={75} color={item.icon_color} />
      </Button>
    );
  };
  return (
    <>
      <FlatGrid
        itemDimension={130}
        data={items}
        style={styles.gridView}
        spacing={10}
        renderItem={({item}) => renderBoxItem(item)}
      />
      <FormControllerProfile
        isOpen={modalForm}
        defaultData={modalData}
        onClose={() => setModalForm(false)}
        onSubmit={val => handleSubmit(val)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'flex-start',
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  itemName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  itemDesc: {
    fontWeight: '600',
    fontSize: 12,
    color: '#fff',
  },
});

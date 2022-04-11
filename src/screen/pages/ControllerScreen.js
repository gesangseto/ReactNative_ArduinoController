import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
// import {Portal} from 'react-native-portalize';
import {WhitePortal} from 'react-native-portal';
import {FlatGrid} from 'react-native-super-grid';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {FormControllerProfile} from '../../components';
import {colors} from '../../constants';
import {
  getController,
  getDBConnection,
  insertController,
  updateController,
} from '../../models';
// import FormControllerProfile from '../controller/FormControllerProfile';

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
  const modalizeRef = useRef(null);
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({});

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
    modalizeRef.current?.close();
    const db = await getDBConnection();
    if (val.id) {
      await updateController(db, val);
    } else {
      await insertController(db, val);
      // RootNavigation.navigate('ControllerLayout', val);
    }
    await getDataController();
    return;
  };

  const handleClickBoxItem = item => {
    console.log(item);
    if (item.code === 'add') {
      setFormData(initial_data);
      modalizeRef.current?.open();
    } else {
      // RootNavigation.navigate('ControllerLayout', item);
    }
  };

  const handleLongPressBoxItem = item => {
    if (item.code != 'add') {
      setFormData(item);
      modalizeRef.current?.open();
    }
  };

  const renderBoxItem = item => {
    return (
      <TouchableOpacity
        onPress={() => handleClickBoxItem(item)}
        onLongPress={() => handleLongPressBoxItem(item)}
        style={{
          justifyContent: 'flex-start',
          borderRadius: 5,
          padding: 10,
          height: 150,
          backgroundColor: item.background_color ?? colors.darkGrey,
        }}>
        <Text style={styles.itemName}>{item.controller_name}</Text>
        <Text style={styles.itemDesc}>{item.controller_desc}</Text>
        <MatComIcon name={item.icon_name} size={75} color={item.icon_color} />
      </TouchableOpacity>
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
      <WhitePortal name="FormController">
        <Modalize ref={modalizeRef}>
          <FormControllerProfile
            onSubmit={val => handleSubmit(val)}
            defaultValue={formData}
          />
        </Modalize>
      </WhitePortal>
    </>
  );
}

const stylesContainer = props =>
  StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      justifyContent: 'flex-start',
      borderRadius: 5,
      padding: 10,
      height: 150,
      backgroundColor: 'red',
    },
  });
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
    backgroundColor: 'red',
    borderColor: 'red',
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

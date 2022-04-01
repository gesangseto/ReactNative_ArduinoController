import React, {useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import * as RootNavigation from '../../helper';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Modalize} from 'react-native-modalize';
import {
  getDBConnection,
  getController,
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
  const [items, setItems] = React.useState([]);
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
    if (val.id) {
      await updateController(db, val);
    } else {
      await insertController(db, val);
      RootNavigation.navigate('ControllerLayout', val);
    }
    await getDataController();
    return;
  };

  const handleClickBoxItem = item => {
    console.log(item);
    if (item.code === 'add') {
      setModalData(initial_data);
      modalizeRef.current?.open();
    } else {
      RootNavigation.navigate('ControllerLayout', item);
    }
  };

  const handleLongPressBoxItem = item => {
    if (item.code != 'add') {
      setModalData(item);
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
          backgroundColor: item.background_color,
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
      <Modalize ref={modalizeRef}>
        <View style={{padding: 5}}>
          <View>
            <Text style={{fontWeight: 'bold'}}>Controller Name</Text>
            <TextInput style={{backgroundColor: 'gray', borderRadius: 10}} />
          </View>
        </View>
      </Modalize>
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

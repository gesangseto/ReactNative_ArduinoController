import {Button} from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet, Text} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import * as RootNavigation from '../../helper';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const boxAdd = {
  name: 'ADD',
  code: 'add',
  desc: 'Add more controller',
  colorScheme: 'tertiary',
  icon_name: 'plus-box-outline',
  icon_color: 'black',
};

export default function Example() {
  const [items, setItems] = React.useState([
    {
      name: 'CAR',
      code: null,
      desc: 'Controller For Car',
      colorScheme: 'lime',
      icon_name: 'plus-box-outline',
      icon_color: 'black',
    },
    {
      name: 'SILVER',
      code: null,
      desc: 'Controller For Home',
      colorScheme: 'amber',
      icon_name: 'plus-box-outline',
      icon_color: 'black',
    },
  ]);

  useEffect(() => {
    setItems([...items, boxAdd]);
  }, []);

  const handleClickBoxItem = item => {
    console.log(item);
    if (item.code === 'add') {
      RootNavigation.navigate('ControllerLayout', item);
      console.log(item);
    }
  };

  const renderBoxItem = item => {
    return (
      <Button
        onPress={() => handleClickBoxItem(item)}
        style={[styles.itemContainer]}
        colorScheme={item.colorScheme}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc}>{item.desc}</Text>
        <MatComIcon name={item.icon_name} size={75} color={item.icon_color} />
      </Button>
    );
  };
  return (
    <FlatGrid
      itemDimension={130}
      data={items}
      style={styles.gridView}
      spacing={10}
      renderItem={({item}) => renderBoxItem(item)}
    />
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

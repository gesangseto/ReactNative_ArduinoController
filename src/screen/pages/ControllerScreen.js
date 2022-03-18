import {Button, Pressable} from 'native-base';
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';

export default function Example() {
  const [items, setItems] = React.useState([
    // {name: 'TURQUOISE', code: '#1abc9c'},
    // {name: 'EMERALD', code: '#2ecc71'},
    // {name: 'PETER RIVER', code: '#3498db'},
    // {name: 'AMETHYST', code: '#9b59b6'},
    // {name: 'WET ASPHALT', code: '#34495e'},
    // {name: 'GREEN SEA', code: '#16a085'},
    // {name: 'NEPHRITIS', code: '#27ae60'},
    // {name: 'BELIZE HOLE', code: '#2980b9'},
    // {name: 'WISTERIA', code: '#8e44ad'},
    // {name: 'MIDNIGHT BLUE', code: '#2c3e50'},
    // {name: 'SUN FLOWER', code: '#f1c40f'},
    // {name: 'CARROT', code: '#e67e22'},
    // {name: 'ALIZARIN', code: '#e74c3c'},
    // {name: 'CLOUDS', code: '#ecf0f1'},
    // {name: 'CONCRETE', code: '#95a5a6'},
    // {name: 'ORANGE', code: '#f39c12'},
    // {name: 'PUMPKIN', code: '#d35400'},
    // {name: 'POMEGRANATE', code: '#c0392b'},
    {name: 'CAR', desc: 'Controller For Car', colorScheme: 'lime'},
    {name: 'SILVER', desc: 'Controller For Home', colorScheme: 'amber'},
    {name: 'ADD', desc: 'Add more controller', colorScheme: 'tertiary'},
  ]);

  const renderBoxItem = item => {
    return (
      <Button
        onPress={() => console.log(item)}
        style={[styles.itemContainer]}
        colorScheme={item.colorScheme}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDesc}>{item.desc}</Text>
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

import {Button, FlatGrid, Box, WarningOutlineIcon, Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {listIcon} from '../constant/icon';

const InputListIcon = props => {
  const {label, required, isInvalid, invalidMessage} = props;
  const [list, setList] = useState([
    {
      name: 'Test',
    },
    {
      name: 'Test2',
    },
    {
      name: 'Test3',
    },
  ]);
  useEffect(() => {
    // console.log(listIcon);
  }, []);

  const renderBoxItem = item => {
    return (
      <Button>
        <MatComIcon name={item} size={75} color={'black'} />
      </Button>
    );
  };
  return (
    <>
      {/* <FlatGrid
        itemDimension={130}
        data={list}
        style={styles.gridView}
        spacing={10}
        renderItem={({item}) => renderBoxItem(item)}
      /> */}
    </>
  );
};
export default React.memo(InputListIcon);

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

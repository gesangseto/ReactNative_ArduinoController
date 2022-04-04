import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import {FlatGrid} from 'react-native-super-grid';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {colors, listIcons} from '../../constants';
import InputText from './InputText';

const wheelStyle = {width: '100%'};
const sliderStyle = {height: 50, width: '100%'};

const PickerIcon = forwardRef((props, ref) => {
  const {title, required, value, onSubmit} = props;
  const [data, setData] = useState('');
  const [list, setList] = useState([]);
  const modalizeRef = useRef(null);

  useEffect(() => {
    setData(value);
  }, [value]);

  useEffect(() => {
    generateListIcon();
  }, []);

  const handleClickBoxItem = item => {
    setData(item);
    modalizeRef.current?.close();
    if (onSubmit) {
      onSubmit(item);
    }
  };

  const generateListIcon = text => {
    let arr = [];
    if (text) {
      arr = listIcons.filter(name => name.includes(text.toLowerCase()));
      arr = arr.slice(0, 60);
    } else {
      arr = listIcons.slice(0, 60);
    }
    setList([...arr]);
  };

  const renderBoxItem = item => {
    return (
      <TouchableOpacity
        onPress={() => handleClickBoxItem(item)}
        onLongPress={() => handleLongPressBoxItem(item)}
        style={{
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          padding: 10,
          height: 60,
          backgroundColor: colors.darkGrey,
        }}>
        <MatComIcon name={item} size={40} />
      </TouchableOpacity>
    );
  };
  return (
    <>
      <InputText
        onPressIn={() => modalizeRef.current?.open()}
        required={required}
        title={title}
        selectTextOnFocus={false}
        editable={false}
      />
      <Portal>
        <Modalize ref={modalizeRef}>
          <InputText
            title={'Search...'}
            onChangeText={text => generateListIcon(text)}
          />
          <FlatGrid
          onEndReached={()=>generateListIcon()}
            itemDimension={60}
            data={list}
            style={styles.gridView}
            spacing={5}
            renderItem={({item}) => renderBoxItem(item)}
          />
        </Modalize>
      </Portal>
    </>
  );
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
    height: 40,
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

export default React.memo(PickerIcon);

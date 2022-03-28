import {
  Button,
  Modal,
  Box,
  FormControl,
  Input,
  WarningOutlineIcon,
} from 'native-base';
import React, {useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, LogBox} from 'react-native';
import {FlatGrid} from 'react-native-super-grid';
import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {listIcon} from '../constant';
const initial_data = {
  id: '',
  controller_name: '',
  controller_desc: '',
  code: '',
  background_color: '',
  icon_name: '',
  icon_color: 'black',
};

export default function InputListIcon(props) {
  const {onChangeText, value, label, required, isInvalid, invalidMessage} =
    props;
  const [items, setItems] = React.useState([]);
  const [modal, setModal] = React.useState(false);
  const [data, setData] = React.useState('');

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    if (value) {
      setData(value);
    }
  }, [props]);

  useEffect(() => {
    getMoreIcon();
  }, []);

  const getMoreIcon = () => {
    let len_current = items.length;
    let arr = listIcon;
    let cur_arr = items;
    arr = arr.slice(len_current, len_current + 24);
    cur_arr = cur_arr.concat(arr);
    setItems(cur_arr);
  };

  const handlePressIcon = icon => {
    console.log(icon);
    setModal(false);
    setData(icon);
  };

  const renderBoxItem = item => {
    return (
      <Button
        justifyContent={'center'}
        key={item}
        colorScheme="blueGray"
        style={[styles.itemContainer]}
        onPress={() => handlePressIcon(item)}>
        <MatComIcon
          name={item}
          size={50}
          style={{
            justifyContent: 'center',
            alignSelf: 'center',
            textAlign: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}></MatComIcon>
      </Button>
    );
  };
  return (
    <>
      <Box alignItems="center" marginBottom={5}>
        <FormControl isInvalid={isInvalid} w="95%">
          <FormControl.Label>
            Icon {required && <Text style={{color: 'red'}}>*</Text>}
          </FormControl.Label>
          <Input
            placeholder={`Select Icon`}
            value={data}
            // isDisabled
            onPressIn={() => setModal(true)}
            InputRightElement={
              data && <MatComIcon name={data} size={30}></MatComIcon>
            }
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            {invalidMessage ?? `${label} is required`}
          </FormControl.ErrorMessage>
        </FormControl>
      </Box>
      <Modal isOpen={modal} onClose={() => setModal(false)} size="full">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Body>
            <SafeAreaView style={{flex: 1}}>
              <FlatGrid
                onEndReached={() => getMoreIcon()}
                itemDimension={75}
                data={items}
                style={styles.gridView}
                spacing={10}
                renderItem={({item}) => renderBoxItem(item)}
              />
            </SafeAreaView>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  itemContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 5,
    padding: 10,
    height: 75,
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

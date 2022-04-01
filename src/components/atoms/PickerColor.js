import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import InputText from './InputText';

const PickerColor = forwardRef((props, ref) => {
  const {title, required, value, onSubmit, onColorSelected} = props;
  const [colorData, setColorData] = useState('');
  const modalizeRef = useRef(null);

  const handleSubmit = color => {
    modalizeRef.current?.close();
    if (onSubmit) {
      onSubmit(color);
    } else if (onColorSelected) {
      onColorSelected(color);
    }
  };

  useEffect(() => {
    setColorData(value);
  }, [value]);

  return (
    <>
      <InputText
        onPressIn={() => modalizeRef.current?.open()}
        required={required}
        title={title}
        bgColor={colorData}
        selectTextOnFocus={false}
        editable={false}
      />
      <Portal>
        <Modalize ref={modalizeRef}>
          <View style={{flex: 1, height: 500}}>
            <Text>Test</Text>
          </View>
        </Modalize>
      </Portal>
    </>
  );
});

export default React.memo(PickerColor);

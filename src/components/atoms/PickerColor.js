import Slider from '@react-native-community/slider';
import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {TriangleColorPicker} from 'react-native-color-picker';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import Button from './Button';
import InputText from './InputText';

import ColorPicker from 'react-native-wheel-color-picker';

import MatComIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
            <ColorPicker
              // ref={r => {
              //   this.picker = r;
              // }}
              // color={this.state.currentColor}
              // swatchesOnly={this.state.swatchesOnly}
              // onColorChange={this.onColorChange}
              onColorChangeComplete={color => handleSubmit(color)}
              thumbSize={40}
              sliderSize={40}
              noSnap={true}
              row={false}
              // swatchesLast={this.state.swatchesLast}
              // swatches={this.state.swatchesEnabled}
              // discrete={this.state.disc}
            />
          </View>
        </Modalize>
      </Portal>
    </>
  );
});

export default React.memo(PickerColor);

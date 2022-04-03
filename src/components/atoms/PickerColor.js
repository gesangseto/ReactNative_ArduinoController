import React, {forwardRef, useEffect, useRef, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {Modalize} from 'react-native-modalize';
import {Portal} from 'react-native-portalize';
import InputText from './InputText';
import {HueSaturationValuePicker} from 'react-native-reanimated-color-picker';

const wheelStyle = {width: '100%'};
const sliderStyle = {height: 50, width: '100%'};

const PickerColor = forwardRef((props, ref) => {
  const {title, required, value, onSubmit, onColorSelected} = props;
  const [colorData, setColorData] = useState('');
  const modalizeRef = useRef(null);

  const handleSubmit = () => {
    modalizeRef.current?.close();
    if (onSubmit) {
      onSubmit(colorData);
    } else if (onColorSelected) {
      onColorSelected(colorData);
    }
  };
  const hslToHex = (h, s, l) => {
    l /= 100;
    const a = (s * Math.min(l, 1 - l)) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const colorChanged = ({h, s, v}) => {
    let hex = hslToHex(h, s * 100, v * 100);
    setColorData(hex);
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

            <HueSaturationValuePicker
              wheelStyle={wheelStyle}
              sliderStyle={sliderStyle}
              onColorChangeComplete={colorChanged}
              initialHue={0}
              initialSaturation={0}
              initialValue={0.7}
            />
          </View>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: 'red',
              width: 60,
              height: 30,
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: 5,
            }}
            onPress={() => handleSubmit()}>
            <Text style={{textAlign: 'center'}}>Save</Text>
          </TouchableOpacity>
        </Modalize>
      </Portal>
    </>
  );
});

export default React.memo(PickerColor);

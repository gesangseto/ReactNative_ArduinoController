import React, {forwardRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import {Button, InputText, PickerColor} from '../atoms';

const init_data = {
  id: '',
  controller_name: '',
  controller_desc: '',
  code: '',
  background_color: '',
  icon_name: '',
  icon_color: 'black',
};

const err_data = {
  controller_name: null,
};
const FormControllerProfile = forwardRef((props, ref) => {
  const {onSubmit, defaultValue} = props;
  const [isSubmit, setIsSubmit] = useState(false);
  const [data, setData] = useState(JSON.parse(JSON.stringify(init_data)));
  const [errData, setErrData] = useState(JSON.parse(JSON.stringify(err_data)));

  useEffect(() => {
    if (isSubmit) {
      handleValidation();
    }
  }, [data]);

  useEffect(() => {
    setData({...defaultValue});
  }, [defaultValue]);

  const handleValidation = () => {
    let init_error = JSON.parse(JSON.stringify(err_data));
    let can_continue = true;
    for (const key in init_error) {
      if (!data[key]) {
        init_error[key] = true;
        can_continue = false;
      }
    }
    setErrData({...init_error});
    return can_continue;
  };

  const handleSubmit = () => {
    setIsSubmit(true);
    if (handleValidation()) {
      if (onSubmit) {
        onSubmit(data);
      }
    }
  };

  return (
    <View>
      <InputText
        required={errData.controller_name}
        title="Controller Name"
        onChangeText={val => setData({...data, controller_name: val})}
        value={data.controller_name}
      />
      <InputText
        required={null}
        title="Controller Desc"
        onChangeText={val => setData({...data, controller_desc: val})}
        value={data.controller_desc}
      />
      <PickerColor
        value={data.background_color}
        title="Background Color"
        onSubmit={val => setData({...data, background_color: val})}
      />
      <InputText
        required={null}
        title="Icon Name"
        onChangeText={val => setData({...data, icon_name: val})}
        value={data.icon_name}
      />
      <PickerColor
        value={data.icon_color}
        title="Icon Color"
        onSubmit={val => setData({...data, icon_color: val})}
      />
      <Button title="Save" onPress={() => handleSubmit()} />
    </View>
  );
});

export default React.memo(FormControllerProfile);

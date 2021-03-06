import React, {forwardRef, useEffect, useState} from 'react';
import {View} from 'react-native';
import {colors} from '../../constants';
import {Button, InputText, PickerColor, PickerIcon} from '../atoms';

const init_data = {
  id: '',
  controller_name: '',
  controller_desc: '',
  code: '',
  background_color: '',
  icon_name: '',
  icon_color: '',
};

const err_data = {
  controller_name: null,
};
const FormControllerProfile = forwardRef((props, ref) => {
  const {onSubmit, onDelete, defaultValue} = props;
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
  const handleDelete = () => {
    if (onDelete) {
      onDelete(data);
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
      <PickerIcon
        required={null}
        title="Icon Name"
        onSubmit={val => setData({...data, icon_name: val})}
        value={data.icon_name}
      />
      <PickerColor
        value={data.icon_color}
        title="Icon Color"
        onSubmit={val => setData({...data, icon_color: val})}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 15,
          alignContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Button
          title="Save"
          onPress={() => handleSubmit()}
          color={colors.success}
          margin={15}
        />
        {data.id ? (
          <Button
            title="Delete"
            onPress={() => handleDelete()}
            color={colors.danger}
            margin={15}
          />
        ) : null}
      </View>
    </View>
  );
});

export default React.memo(FormControllerProfile);

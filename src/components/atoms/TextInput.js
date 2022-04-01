import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

const TextInput = React.forwardRef((props, ref) => {
  const {
    numeric,
    max,
    title,
    defaultText,
    required,
    readOnly,
    upperCase,
    onChange,
    onSubmitEditing,
  } = props;
  const [maxLength, setMaxLength] = useState(20);
  const [text, setText] = useState('');

  useEffect(() => {
    if (max) {
      setMaxLength(max);
    }
    if (defaultText) {
      setText(defaultText);
    }
  }, [defaultText]);

  const handleChange = val => {
    var value = val;
    if (numeric) {
      value = val.replace(/[^0-9]/g, '');
    }
    setText(value);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <TextInput
      ref={ref}
      maxLength={maxLength}
      editable={readOnly ? false : true}
      autoCapitalize={upperCase ? 'characters' : 'none'}
      keyboardType={numeric ? 'numeric' : 'default'}
      underlineColorAndroid="transparent"
      value={text}
      onChangeText={val => {
        handleChange(val);
      }}
      style={props.multiline ? styles.contentTextArea : styles.contentTextInput}
      {...props}></TextInput>
  );
});

export default React.memo(TextInput);

const styles = StyleSheet.create({
  title: {
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    // borderWidth: 1,
  },
  contentTextInput: {
    height: 40,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginHorizontal: 15,
    marginTop: 10,
    borderRadius: 10,
    borderWidth: 0,
  },
  contentTextArea: {
    height: 80,
    backgroundColor: 'white',
    shadowColor: '#000000',
    shadowOpacity: 0.8,
    shadowRadius: 2,
    marginHorizontal: 15,
    marginTop: 5,
    textAlignVertical: 'top',
    borderRadius: 10,
    borderWidth: 0,
  },
});

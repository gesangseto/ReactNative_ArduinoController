import {FormControl, Input, Box, WarningOutlineIcon} from 'native-base';
import React, {useEffect} from 'react';

const InputText = props => {
  const {label, isInvalid, invalidMessage} = props;
  useEffect(() => {}, []);

  return (
    <Box alignItems="center" marginBottom={5}>
      <FormControl isInvalid={isInvalid} w="95%">
        <FormControl.Label>{label}</FormControl.Label>
        <Input placeholder={`Enter ${label}`} {...props} />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {invalidMessage ?? `${label} is required`}
        </FormControl.ErrorMessage>
      </FormControl>
    </Box>
  );
};
export default React.memo(InputText);

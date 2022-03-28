import {Button, Modal, FormControl, Input} from 'native-base';
import React, {useState, useEffect} from 'react';
import {InputText} from '../../components';

const initial_err = {type: null};

const FormControllerLayout = props => {
  const {isOpen, onClose, onSubmit, defaultData, submitTitle} = props;
  const [errData, setErrData] = useState(initial_err);
  const [data, setData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    setData({...defaultData});
  }, [defaultData]);

  useEffect(() => {
    if (isSubmit) {
      handleValidation();
    }
  }, [data]);

  const handleValidation = () => {
    let isError = false;
    let err = initial_err;
    for (var key of Object.keys(errData)) {
      if (!data[key]) {
        isError = true;
        err[key] = true;
      } else {
        err[key] = null;
      }
    }
    setErrData({...err});
    if (isError) {
      return false;
    }
    return true;
  };
  const handleSubmit = () => {
    if (!isSubmit) {
      setIsSubmit(true);
    }
    if (handleValidation()) {
      handleClose();
      if (onSubmit) {
        let thisData = data;
        thisData.x = 0;
        thisData.y = 0;
        onSubmit(data);
        setData({});
      }
    }
    return;
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setShowModal(false);
  };
  return (
    <>
      <Modal isOpen={showModal} onClose={() => handleClose()} size="full">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add new controller</Modal.Header>
          <Modal.Body>
            <InputText
              required={true}
              isInvalid={errData.type}
              label={'Type'}
              value={data.type}
              onChangeText={val => setData({...data, type: val})}
            />
            <InputText
              label={'Icon Name'}
              value={data.icon_name}
              onChangeText={val => setData({...data, icon_name: val})}
            />
            <InputText
              label={'Icon Color'}
              value={data.icon_color}
              onChangeText={val => setData({...data, icon_color: val})}
            />
            <InputText
              label={'Icon Size'}
              value={data.icon_size}
              onChangeText={val => setData({...data, icon_size: val})}
            />
            <InputText
              label={'Command'}
              value={data.command}
              onChangeText={val => setData({...data, command: val})}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => handleClose()}>
                Cancel
              </Button>
              <Button colorScheme="danger" onPress={() => handleClose()}>
                Delete
              </Button>
              <Button colorScheme="success" onPress={() => handleSubmit()}>
                {submitTitle ?? 'Submit'}
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default FormControllerLayout;

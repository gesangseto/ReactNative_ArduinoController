import {Button, Modal, FormControl, Input} from 'native-base';
import React, {useState, useEffect} from 'react';
import {InputText, InputListIcon} from '../../components';

const initial_err = {controller_name: null};

const FormControllerProfile = props => {
  const {isOpen, onClose, onSubmit, defaultData} = props;
  const [data, setData] = useState({});
  const [errData, setErrData] = useState(initial_err);
  const [showModal, setShowModal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isSubmit) {
      handleValidation();
    }
  }, [data]);

  useEffect(() => {
    console.log('defaultData', defaultData);
    if (defaultData) {
      setData({...defaultData});
    }
  }, [props]);

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
        onSubmit(data);
      }
    }
    return;
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
    setIsSubmit(false);
    setShowModal(false);
  };
  return (
    <>
      <Modal isOpen={showModal} onClose={() => handleClose()} size="full">
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Add New Profile</Modal.Header>
          <Modal.Body>
            <InputText
              required
              isInvalid={errData.controller_name}
              label={'Profile Name'}
              value={data.controller_name}
              onChangeText={val => setData({...data, controller_name: val})}
            />
            <InputText
              label={'Description'}
              value={data.controller_desc}
              onChangeText={val => setData({...data, controller_desc: val})}
            />
            <InputText
              label={'Bg Color'}
              value={data.background_color}
              onChangeText={val => setData({...data, background_color: val})}
            />
            <InputText
              // isInvalid={true}
              label={'Icon Name'}
              value={data.icon_name}
              onChangeText={val => setData({...data, icon_name: val})}
            />
            <InputListIcon />
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => handleClose()}>
                Cancel
              </Button>
              <Button colorScheme="success" onPress={() => handleSubmit()}>
                Create
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default FormControllerProfile;

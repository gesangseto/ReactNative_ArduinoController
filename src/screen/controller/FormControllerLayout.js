import {Button, Modal, FormControl, Input} from 'native-base';
import React, {useState, useEffect} from 'react';
import {InputText} from '../../components';

const FormControllerLayout = props => {
  const {isOpen, onClose} = props;
  const [data, setData] = useState({
    x: 0,
    y: 0,
    text: '',
    icon_name: '',
    icon_size: '10',
    icon_color: '',
    command: '',
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  useEffect(() => {
    console.log(data);
  }, [data]);

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
              isInvalid={true}
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
              <Button
                colorScheme="success"
                onPress={() => {
                  setShowModal(false);
                }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
};

export default FormControllerLayout;

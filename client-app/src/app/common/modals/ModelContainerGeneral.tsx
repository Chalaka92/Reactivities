import React, { useContext } from "react";
import { Modal, Button } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

const ModalContainerGeneral = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modalGeneral: { open, body, header,formName },
    closeModalGeneral,
    size,
    
  } = rootStore.modalStore;
  return (
    <Modal size={size} open={open} onClose={closeModalGeneral}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{body}</Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => closeModalGeneral()}
          type="button"
          content="Cancel"
        />
        <Button form={formName} content="Add" primary type="submit"
         />
      </Modal.Actions>
    </Modal>
  );
};

export default observer(ModalContainerGeneral);

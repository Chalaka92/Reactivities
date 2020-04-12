import React, { useContext } from "react";
import { Modal, Button, Message } from "semantic-ui-react";
import { RootStoreContext } from "../../stores/rootStore";
import { observer } from "mobx-react-lite";

const ModalContainerGeneral = () => {
  const rootStore = useContext(RootStoreContext);
  const {
    modalGeneral: { open, body, header, formName },
    closeModalGeneral,
    size,
    errorMessage,
    submitting,
  } = rootStore.modalStore;
  return (
    <Modal
      size={size}
      open={open}
      onClose={closeModalGeneral}
      closeOnEscape={false}
      closeOnDimmerClick={false}
    >
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>
        {body}
        {errorMessage && (
          <Message negative>
            <Message.Header>{errorMessage}</Message.Header>
            <p>Please enter different name.</p>
          </Message>
        )}
      </Modal.Content>
      <Modal.Actions>
        <Button
          onClick={() => closeModalGeneral()}
          type="button"
          content="Cancel"
        />
        <Button
          form={formName}
          content="Add"
          primary
          type="submit"
          loading={submitting}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default observer(ModalContainerGeneral);

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";

const ModalDelete = (props) => {
  return (
    <>
      <Modal show={props.showModalDelete} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, bạn có chắc muốn xóa User: {props.dataModalDelete?.email}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleConfirmDeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDelete;

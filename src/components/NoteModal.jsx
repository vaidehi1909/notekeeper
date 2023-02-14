import React from "react";
import NoteForm from "./NoteForm";
import { Modal, Form } from "antd";

const toCapitlize = (word) => {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const NoteModal = ({ showModal, onSubmit, onCancel, mode, note }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title={`${toCapitlize(mode)} Note `}
      open={showModal}
      okText={"Save"}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            onSubmit(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={onCancel}
      destroyOnClose
      maskClosable={false}
    >
      <NoteForm form={form} note={note ? note : undefined} mode={mode} />
    </Modal>
  );
};

export default NoteModal;

import React, { useState, useEffect } from "react";
import { Button, Row, Col } from "antd";
import { db } from "../firebaseConfig";
import { ref, set, push, child } from "firebase/database";
import NoteModal from "./NoteModal";
import { STATUS_UNPINNED } from "../constants";
import { PlusCircleOutlined } from "@ant-design/icons";

// const CreateNoteModal = ({ showModal, onSubmit, onCancel }) => {
//   const [form] = Form.useForm();
//   return (
//     <Modal
//       title="Create New Note"
//       open={showModal}
//       okText="Submit"
//       onOk={() => {
//         form
//           .validateFields()
//           .then((values) => {
//             onSubmit(values);
//           })
//           .catch((info) => {
//             console.log("Validate Failed:", info);
//           });
//       }}
//       onCancel={onCancel}
//       destroyOnClose
//     >
//       <NoteForm form={form} />
//     </Modal>
//   );
// };

const AddNewNote = () => {
  const [showModal, setShowModal] = useState(false);
  const onSubmit = (values) => {
    console.log(values);
    // Get a key for a new Post.
    const newNoteKey = push(child(ref(db), "notes")).key;
    set(ref(db, "notes/" + newNoteKey), {
      id: newNoteKey,
      ...values,
      pinned: STATUS_UNPINNED,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    })
      .then(() => {
        // Data saved successfully!
        setShowModal(false);
      })
      .catch((error) => {
        // The write failed...
      });
  };

  const onCancel = () => {
    setShowModal(false);
  };
  return (
    <>
      <Row className="addnotebtn">
        <Col flex="auto"></Col>
        <Col flex="100px">
          <Button onClick={() => setShowModal(true)}>
            Add New Note <PlusCircleOutlined />
          </Button>
        </Col>
      </Row>
      <NoteModal
        showModal={showModal}
        onSubmit={onSubmit}
        onCancel={onCancel}
        mode={"create"}
      />
    </>
  );
};

export default AddNewNote;

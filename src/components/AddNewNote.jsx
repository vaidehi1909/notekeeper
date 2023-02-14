import React, { useState } from "react";
import { Button, Row, Col } from "antd";
import { db } from "../firebaseConfig";
import { ref, set, push, child } from "firebase/database";
import NoteModal from "./NoteModal";
import { STATUS_UNPINNED } from "../constants";
import { PlusCircleOutlined } from "@ant-design/icons";

const AddNewNote = () => {
  const [showModal, setShowModal] = useState(false);
  const onSubmit = (values) => {
    const newNoteKey = push(child(ref(db), "notes")).key;
    set(ref(db, "notes/" + newNoteKey), {
      ...values,
      id: newNoteKey,
      pinned: STATUS_UNPINNED,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
    })
      .then(() => {
        setShowModal(false);
        message.success("Note added successfully");
      })
      .catch(() => {
        message.error("Unable to add");
      });
  };

  const onCancel = () => {
    setShowModal(false);
  };
  return (
    <>
      <Row className="addnotebtn">
        <Col flex="auto"></Col>
        <Col flex="220px">
          <Button type="primary" onClick={() => setShowModal(true)}>
            Add New Note <PlusCircleOutlined />
          </Button>
        </Col>
      </Row>
      <NoteModal
        showModal={showModal}
        onSubmit={onSubmit}
        onCancel={onCancel}
        mode={"add"}
      />
    </>
  );
};

export default AddNewNote;

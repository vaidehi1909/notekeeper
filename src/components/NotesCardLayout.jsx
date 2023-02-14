import React, { useState } from "react";
import CardActions from "./CardActions";
import NoteModal from "./NoteModal";
import { db } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import { Card, Typography, Tag, message } from "antd";
import { LIGHT_PURPLE_COLOR } from "../constants";

const { Paragraph } = Typography;

const NotesCardLayout = ({ note }) => {
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (values) => {
    set(ref(db, "notes/" + note.id), {
      ...note,
      ...values,
      updated_at: new Date().toLocaleString(),
    })
      .then(() => {
        message.success("Note updated successfully");
        setShowModal(false);
      })
      .catch(() => {
        message.error("Unable to update");
      });
  };

  const onCancel = () => {
    setShowModal(false);
  };

  const last_updated_at = new Date(note.updated_at).toLocaleString("en-IN", {
    timeStyle: "short",
    dateStyle: "short",
  });

  return (
    <>
      <Card
        title={note.title}
        extra={<CardActions note={note} />}
        style={{
          width: 370,
          height: 220,
          borderColor: "gainsboro",
        }}
        hoverable
      >
        <div
          onClick={() => {
            setShowModal(true);
          }}
        >
          <div style={{ minHeight: "100px" }}>
            <Tag color={LIGHT_PURPLE_COLOR} style={{ marginBottom: "10px" }}>
              {note.tagline}
            </Tag>
            <Paragraph
              ellipsis={{
                rows: 2,
              }}
            >
              {note.content}
            </Paragraph>
          </div>
          <Paragraph type="secondary" style={{ textAlign: "left" }}>
            {last_updated_at}
          </Paragraph>
        </div>
      </Card>
      <NoteModal
        showModal={showModal}
        onSubmit={onSubmit}
        onCancel={onCancel}
        mode={"edit"}
        note={note}
      />
    </>
  );
};
export default NotesCardLayout;

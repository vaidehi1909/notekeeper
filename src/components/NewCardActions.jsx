import React, { useState } from "react";
import { Modal, Form, Dropdown, Popconfirm, message } from "antd";
import {
  EllipsisOutlined,
  DeleteOutlined,
  EditOutlined,
  InfoCircleOutlined,
  PushpinOutlined,
  DisconnectOutlined,
} from "@ant-design/icons";
import { db } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import NoteForm from "./NoteForm";
import { LIGHT_PURPLE_COLOR } from "../constants";

const toCapitlize = (word) => {
  if (!word) return word;
  return word.charAt(0).toUpperCase() + word.slice(1);
};

const NoteModal = ({ showModal, onSubmit, onCancel, mode, note }) => {
  const [form] = Form.useForm();
  const modalProps = {};
  if (mode === "view") {
    modalProps["footer"] = null;
  }
  return (
    <Modal
      {...modalProps}
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
    >
      <NoteForm form={form} note={note} mode={mode} />
    </Modal>
  );
};

const CardActions = ({ note }) => {
  const [showModal, setShowModal] = useState({ edit: false, view: false });
  const [mode, setMode] = useState(null);

  const onDelete = () => {
    set(ref(db, "notes/" + note.id), null)
      .then(() => {
        message.success("Note deleted successfully");
      })
      .catch(() => {
        message.error("Unable to delete");
      });
  };

  const onPinUnpinAction = (action) => {
    set(ref(db, "notes/" + note.id), { ...note, pinned: action === "pin" })
      .then(() => {
        message.success(`Note ${action}ned successfully`);
      })
      .catch(() => {
        message.error(`Unable to ${action}`);
      });
  };
  const getItem = (label, key, icon, children, type) => {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  };
  const pinUnpinAction = note.pinned
    ? getItem("Unpin", "unpin", <DisconnectOutlined />)
    : getItem("Pin", "pin", <PushpinOutlined />);
  const items = [
    getItem("Edit", "edit", <EditOutlined />),
    getItem(
      <Popconfirm
        title="Delete"
        description="Are you sure to delete this note?"
        okText="Yes"
        cancelText="No"
        onConfirm={onDelete}
      >
        Delete
      </Popconfirm>,
      "delete",
      <DeleteOutlined />
    ),
    pinUnpinAction,
    getItem("View", "view", <InfoCircleOutlined />),
  ];

  const onClick = (e) => {
    console.log(e);
    switch (e.key) {
      case "edit":
      case "view":
        setMode(e.key);
        setShowModal({ [e.key]: true });
        break;
      case "pin":
      case "unpin":
        onPinUnpinAction(e.key);
        break;
      default:
        return;
    }
  };

  const onSubmit = (values) => {
    set(ref(db, "notes/" + note.id), {
      ...note,
      ...values,
      updated_at: new Date().toLocaleString(),
    })
      .then(() => {
        message.success("Note updated successfully");
        setShowModal(false);
        setMode(null);
      })
      .catch(() => {
        message.error("Unable to update");
      });
  };

  const onCancel = () => {
    setShowModal(false);
    setMode(null);
  };

  return (
    <>
      <Dropdown
        menu={{
          items,
          onClick,
        }}
      >
        <EllipsisOutlined
          key="ellipsis"
          style={{ color: LIGHT_PURPLE_COLOR, fontSize: "20px" }}
        />
      </Dropdown>
      <NoteModal
        showModal={showModal[mode]}
        onSubmit={onSubmit}
        onCancel={onCancel}
        mode={mode}
        note={note}
      />
    </>
  );
};

export default CardActions;

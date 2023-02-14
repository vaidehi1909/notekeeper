import React from "react";
import {
  EditOutlined,
  InfoCircleOutlined,
  PushpinOutlined,
  PushpinFilled,
  DeleteOutlined,
} from "@ant-design/icons";
import { Divider, message, Popconfirm, Tooltip } from "antd";
import { db } from "../firebaseConfig";
import { ref, set } from "firebase/database";
import {
  LIGHT_PURPLE_COLOR,
  STATUS_PINNED,
  STATUS_UNPINNED,
} from "../constants";

const CardActions = ({ note }) => {
  const onPinUnpinAction = (action) => {
    set(ref(db, "notes/" + note.id), {
      ...note,
      pinned: action === "pin" ? STATUS_PINNED : STATUS_UNPINNED,
    })
      .then(() => {
        message.success(`Note ${action}ned successfully`);
      })
      .catch(() => {
        message.error(`Unable to ${action}`);
      });
  };

  const onDelete = () => {
    set(ref(db, "notes/" + note.id), null)
      .then(() => {
        message.success("Note deleted successfully");
      })
      .catch(() => {
        message.error("Unable to delete");
      });
  };

  return (
    <>
      {note.pinned === STATUS_PINNED ? (
        <PushpinFilled
          className="light-purple-color"
          onClick={() => {
            onPinUnpinAction("unpin");
          }}
        />
      ) : (
        <PushpinOutlined
          className="light-purple-color"
          onClick={() => {
            onPinUnpinAction("pin");
          }}
        />
      )}
      <Divider type="vertical" />
      <Popconfirm
        title="Delete"
        description="Are you sure to delete this note?"
        okText="Yes"
        cancelText="No"
        onConfirm={onDelete}
      >
        <DeleteOutlined className="light-purple-color" />
      </Popconfirm>
    </>
  );
};

export default CardActions;

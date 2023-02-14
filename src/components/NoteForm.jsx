import React from "react";
import { Form, Input } from "antd";
const { TextArea } = Input;

const NoteForm = ({ form, note, mode }) => {
  const initialValues = {
    title: note?.title,
    tagline: note?.tagline,
    content: note?.content,
  };
  let style = {};
  if (mode === "view") {
    style = { border: "none", color: "black", backgroundColor: "floralwhite" };
  }
  return (
    <Form
      form={form}
      name="new_form"
      className="margin-left"
      initialValues={initialValues}
      preserve={false}
      labelCol={{ span: 4 }}
      disabled={mode === "view"}
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[
          {
            required: true,
            message: "Please Enter Title",
          },
        ]}
      >
        <Input style={style} />
      </Form.Item>

      <Form.Item
        label="Tagline"
        name="tagline"
        rules={[
          {
            required: true,
            message: "Please Enter TagLine",
          },
        ]}
      >
        <Input style={style} />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
            message: "Please Enter content",
          },
        ]}
      >
        <TextArea rows={4} style={style} />
      </Form.Item>
    </Form>
  );
};
export default NoteForm;

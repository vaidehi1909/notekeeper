import React from "react";
import { Form, Input } from "antd";
const { TextArea } = Input;

const NoteForm = ({ form, note, mode }) => {
  console.log(note);
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
      style={{
        marginLeft: "5px",
      }}
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

      <Form.Item label="Tagline" name="tagline">
        <Input style={style} />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[
          {
            required: true,
            message: "Please Enter Some Content",
          },
        ]}
      >
        <TextArea rows={4} style={style} />
      </Form.Item>
    </Form>
  );
};
export default NoteForm;

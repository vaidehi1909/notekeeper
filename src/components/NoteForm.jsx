import React from "react";
import { Form, Input } from "antd";
const { TextArea } = Input;

const NoteForm = ({ form, note }) => {
  const initialValues = {
    title: note?.title,
    tagline: note?.tagline,
    content: note?.content,
  };

  return (
    <Form
      form={form}
      name="new_form"
      className="margin-left"
      initialValues={initialValues}
      preserve={false}
      labelCol={{ span: 4 }}
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
        <Input />
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
        <Input />
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
        <TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};
export default NoteForm;

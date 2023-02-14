import React, { useEffect, useState } from "react";
import { Col, Row, Pagination, Layout } from "antd";
import AddNewNote from "./AddNewNote";
import NotesCardLayout from "./NotesCardLayout";
import { PAGE_SIZE } from "../constants";

const { Header, Footer, Sider, Content } = Layout;

const NotesGridLayout = ({ notes }) => {
  const [paginatedNotes, setPaganiatedNotes] = useState(
    notes.slice(0, PAGE_SIZE)
  );
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    setPaganiatedNotes(
      notes.slice(
        PAGE_SIZE * (current - 1),
        PAGE_SIZE * (current - 1) + PAGE_SIZE
      )
    );
  }, [notes]);

  const onChange = (page) => {
    setCurrent(page);
    setPaganiatedNotes(
      notes.slice(PAGE_SIZE * (page - 1), PAGE_SIZE * (page - 1) + PAGE_SIZE)
    );
  };

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
          backgroundColor: "white",
        }}
      >
        <Row>
          <Col span={5} offset={16}>
            <AddNewNote />
          </Col>
        </Row>
      </Header>
      <Content style={{ backgroundColor: "white" }}>
        <Row
          style={{
            justifyContent: "center",
            padding: 2,
            minHeight: 500,
          }}
        >
          {paginatedNotes.map((note) => {
            return (
              <Col key={note.id} style={{ margin: "5px" }}>
                <NotesCardLayout note={note} />
              </Col>
            );
          })}
        </Row>
      </Content>

      <Footer
        style={{ position: "sticky", bottom: "0", backgroundColor: "white" }}
      >
        <Row className="addnotebtn">
          <Col flex="auto"></Col>
          <Col flex="60%">
            <Pagination
              current={current}
              pageSize={PAGE_SIZE}
              onChange={onChange}
              total={notes.length}
            />
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default NotesGridLayout;

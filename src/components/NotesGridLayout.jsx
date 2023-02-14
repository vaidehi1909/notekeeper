import React, { useEffect, useState } from "react";
import { Col, Row, Pagination, Layout } from "antd";
import AddNewNote from "./AddNewNote";
import NotesCardLayout from "./NotesCardLayout";
import { PAGE_SIZE } from "../constants";

const { Header, Footer, Sider, Content } = Layout;

const EmptyDataView = () => {
  return <h1 className="empty-data-view">No Notes Added</h1>;
};

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
      <Header className="action-header">
        <Row>
          <Col flex="auto"></Col>
          <Col flex="220px">
            <AddNewNote />
          </Col>
        </Row>
      </Header>
      <Content className="white-bg">
        <Row className="card-justify">
          {paginatedNotes.length > 0 ? (
            paginatedNotes.map((note) => {
              return (
                <Col key={note.id} className="margin-5px">
                  <NotesCardLayout note={note} />
                </Col>
              );
            })
          ) : (
            <EmptyDataView />
          )}
        </Row>
      </Content>

      <Footer className="action-footer">
        <Row className="addnotebtn">
          <Col flex="auto"></Col>
          <Col flex="60%">
            {notes.length > 0 && (
              <Pagination
                current={current}
                pageSize={PAGE_SIZE}
                onChange={onChange}
                total={notes.length}
              />
            )}
          </Col>
        </Row>
      </Footer>
    </Layout>
  );
};

export default NotesGridLayout;

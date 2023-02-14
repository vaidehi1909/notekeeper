import React from "react";
import { Skeleton, Card, Row, Col } from "antd";
import { PAGE_SIZE } from "../constants";

const Loader = () => {
  return (
    <>
      <Row className="addnotebtn">
        <Col flex="auto"></Col>
        <Col flex="100px">
          <Skeleton.Button />
        </Col>
      </Row>
      <Row>
        {Array.from({
          length: PAGE_SIZE,
        }).map((_, i) => {
          return (
            <Col key={i} style={{ margin: "5px" }}>
              <Card
                style={{
                  width: 370,
                  height: 220,
                  borderColor: "gainsboro",
                }}
                hoverable
              >
                <div style={{ minHeight: "100px" }}>
                  <Skeleton />
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Loader;

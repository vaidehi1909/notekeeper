import React from "react";
import { Skeleton, Card, Row, Col } from "antd";
import { PAGE_SIZE } from "../constants";

const Loader = () => {
  return (
    <>
      <Row className="addnotebtn">
        <Col flex="auto"></Col>
        <Col flex="220px">
          <Skeleton.Button />
        </Col>
      </Row>
      <Row className="card-justify">
        {Array.from({
          length: PAGE_SIZE,
        }).map((_, i) => {
          return (
            <Col key={i} className="margin-5px">
              <Card>
                <div className="min-hight ">
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

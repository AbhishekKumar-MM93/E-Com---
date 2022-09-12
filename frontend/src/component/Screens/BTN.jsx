import { useState } from "react";
import React from "react";
import { Row, Col, Button } from "react-bootstrap";

const BTN = () => {
  const [choose, setChoose] = useState("black");
  return (
    <div>
      <h1 style={{ color: choose }}>Abhishek Kumar</h1>
      <Row>
        <Col>
          <Button style={{ color: "red" }} onClick={(e) => setChoose("red")}>
            <i class="fa-sharp fa-solid fa-circle"></i>
          </Button>
        </Col>
        <Col>
          <Button
            style={{ color: "green" }}
            onClick={(e) => setChoose("green")}
          >
            <i class="fa-sharp fa-solid fa-circle"></i>
          </Button>
        </Col>
        <Col>
          <Button
            style={{ color: "yellow" }}
            onClick={(e) => setChoose("yellow")}
          >
            <i class="fa-sharp fa-solid fa-circle"></i>
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BTN;

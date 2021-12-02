import { Row, Col } from 'antd';

function MainFooter() {
  return (
    <div class="mainFooter">
      <Row >
        <Col span={6}>
          All rights reserved
        </Col> 
        <Col span={18} style='float: right'>
          Copyright
        </Col>
      </Row>
    </div>
  );
}

export default MainFooter;

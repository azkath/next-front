import { Col, Row, Spin } from "antd"

export const Loading = () => {
  return(
    <Row align="middle" style={{ height: '100vh', textAlign: 'center' }}>
      <Col sm={24} md={24}>
        <Spin size="large" />
      </Col>
    </Row>
  )
}
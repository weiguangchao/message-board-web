import React from 'react';
import { Col, Row } from 'antd';

interface AdminInfoProps {
  address: string;
}

function AdminInfo(props: AdminInfoProps) {
  return (
    <>
      <Row>
        <Col span={24}>用户：{props.address}</Col>
      </Row>
    </>
  );
}

export default React.memo(AdminInfo);

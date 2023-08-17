import { Col, Row } from 'antd';
import React from 'react';
import { walletService } from '../../services';

interface ConnectWalletProps {
  setAccount: Function;
}

function ConnectWallet({setAccount}: ConnectWalletProps) {
  const onConnectWalletBtn = async () => {
    await walletService.switchNetWork();
    const account = await walletService.getAccount();
    setAccount(account);
  };

  return (
    <>
      <Row>
        <Col span={24}><a onClick={onConnectWalletBtn}>连接钱包！！！</a></Col>
      </Row>
    </>
  );
}

export default React.memo(ConnectWallet);

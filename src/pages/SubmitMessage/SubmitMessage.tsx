import { Alert, Button, Col, Input, Row } from 'antd';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';

import AdminInfo from '../../components/AdminInfo/AdminInfo';
import ConnectWallet from '../../containers/ConnectWallet/ConnectWallet';

import { walletService, messageService } from '../../services';

function SubmitMessage() {
  const [msg, setMsg] = useState('');
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState('');
  const [alertMsg, setAlertMsg] = useState('');
  const [balance, setBalance] = useState(0n);


  useEffect(() => {
    const connected = walletService.isConnected();
    setConnected(connected);

    walletService.getBalance(process.env.REACT_APP_MESSAGE_BOARD_CONSTRACT as any)
      .then(balance => setBalance(balance));
  }, [account]);

  const onGenerateMessageClick = async () => {
    const key = await messageService.generateMessageKey(msg);
    setAlertMsg(`请妥善保管下面这段文本，持有该文本就证明你是该消息的主人\n${key}`);
    await messageService.submitMessage(key, msg);
  };

  const onWithdrawClick = async () => {
    await messageService.withdraw();
    setBalance(0n);
  };

  return (
    <div style={{width: '500px', margin: 'auto'}}>
      {connected && account ? <AdminInfo address={account}/> : <ConnectWallet setAccount={setAccount}/>}
      {alertMsg ? <Alert message={alertMsg} type="success" closable/> : ''}
      <Row>
        <Col span={16}>
          <Input placeholder="请输入你要提交的Message！"
                 value={msg}
                 onChange={(e) => {
                   setMsg(e.target.value);
                 }}
                 disabled={!connected || !account}
          /></Col>
        <Col span={8}>
          <Button type="primary"
                  onClick={onGenerateMessageClick}
                  disabled={!msg}>
            提交Message
          </Button>
        </Col>
      </Row>
      <Button type="primary"
              onClick={onWithdrawClick}
              disabled={balance <= 0n}>
        {ethers.formatEther(balance)} 提钱，跑路
      </Button>
    </div>
  );
}

export default React.memo(SubmitMessage);

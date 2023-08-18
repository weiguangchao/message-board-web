import { Alert, Button, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';

import { messageService, walletService } from '../../services';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.06)',
};

const donateAmount = '0.002';

function MessageList() {
  const [messageList, setMessageList] = useState([]);
  const [alertMsg, setAlertMsg] = useState('');

  useEffect(() => {
    messageService.listLatestMessage().then((messageList: any) => {
      setMessageList(messageList);
    });

  }, []);

  const renderMessageList = () => {
    const list = [];
    for (let i = 0; i < messageList.length; i++) {
      const {message, txHash} = messageList[i] as any;
      list.push(
        <div key={i}>
          <h3 style={contentStyle}>
            <Button type="link"
                    target="_blank"
                    href={`${process.env.REACT_APP_BLOCKCHAIN_EXPLORE}/tx/${txHash}`}
            >
              {message}
            </Button>
          </h3>
        </div>
      );
    }
    return list;
  };

  const onDonateClick = async () => {
    const txHash = await walletService.transfer(process.env.REACT_APP_MESSAGE_BOARD_CONSTRACT as any, donateAmount);
    setAlertMsg(`感谢老铁的支持！\n${process.env.REACT_APP_BLOCKCHAIN_EXPLORE}/tx/${txHash}`);
  };

  return (
    <div style={{width: '500px', margin: 'auto'}}>
      <Carousel autoplay dotPosition="left">
        {renderMessageList()}
      </Carousel>
      <Button onClick={onDonateClick}>
        交个朋友，v我 {donateAmount}
      </Button>
      {alertMsg ? <Alert message={alertMsg} type="success" closable/> : ''}
    </div>
  );
}

export default React.memo(MessageList);

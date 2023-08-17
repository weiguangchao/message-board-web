import { Button, Carousel } from 'antd';
import React, { useEffect, useState } from 'react';

import { messageService } from '../../services';

const contentStyle: React.CSSProperties = {
  height: '160px',
  color: '#fff',
  lineHeight: '160px',
  textAlign: 'center',
  background: 'rgba(0, 0, 0, 0.06)',
};

function MessageList() {
  const [messageList, setMessageList] = useState([]);

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
            {/*<a target="_blank"*/}
            {/*   href={`${process.env.REACT_APP_BLOCKCHAIN_EXPLORE}/tx/0x3d21de9d8661a5eefd091457bf2fc4aa5450a6ed63fb623f9616ab492c4e5a57`}>*/}
            {/*  {message}*/}
            {/*</a>*/}
          </h3>
        </div>
      );
    }
    return list;
  };

  return (
    <div style={{width: '500px', margin: 'auto'}}>
      <Carousel autoplay dotPosition="left">
        {renderMessageList()}
      </Carousel>
    </div>
  );
}

export default React.memo(MessageList);

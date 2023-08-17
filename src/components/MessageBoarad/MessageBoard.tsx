import { Button } from 'antd';
import React, { useEffect, useState } from 'react';

function MessageBoard() {
  const [msgList, setMessageList] = useState([]);

  useEffect(() => {

  });

  const onGenerateMessageKey = () => {

  };

  return (
    <div className="App">
      <Button type="primary" onClick={onGenerateMessageKey}>生成Message Key</Button>
    </div>
  );
}

export default React.memo(MessageBoard);

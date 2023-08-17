import { ethers } from "ethers";
import * as randomString from 'randomstring';

import json from "../abi/MessageBoard.json";

import { walletService } from './';

export class MessageService {
  async getMessageBoard() {
    const provider = walletService.getProvider();
    const signer = await provider.getSigner();
    const messageBoard = new ethers.Contract(
      process.env.REACT_APP_MESSAGE_BOARD_CONSTRACT as any,
      json.abi,
      signer
    );

    return messageBoard;
  }

  async generateMessageKey(msg: string) {
    const rand = randomString.generate({
      length: 10,
      charset: 'alphanumeric',
    });
    const temp = ethers.concat([ethers.toUtf8Bytes(msg), ethers.toUtf8Bytes(rand)]);
    const key = ethers.keccak256(temp);
    return key;
  }

  async submitMessage(key: string, msg: string) {
    const messageBoard = await this.getMessageBoard();
    const content = ethers.toUtf8Bytes(msg);
    await messageBoard.submitMessage(key, content);
  }

  async listLatestMessage() {
    const messageBoard = await this.getMessageBoard();
    const filter = messageBoard.filters.OnBoard();
    const events = await messageBoard.queryFilter(filter);
    if (!events || events.length < 1) {
      return [];
    }

    const messageList = events.filter((e: any) => e.args[0]).map((e: any) => {
      const data = e.args[0];
      const message = ethers.toUtf8String(data);
      const txHash = e.transactionHash;

      return {
        message,
        txHash,
      };
    });
    return messageList;
  }
}

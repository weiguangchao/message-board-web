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
    const events = await this.listLatestEvent();
    if (!events || events.length < 1) {
      return [];
    }

    const messageList = events.filter((e: any) => e.args[0])
      .map((e: any) => {
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

  private async listLatestEvent() {
    const messageBoard = await this.getMessageBoard();
    const filter = messageBoard.filters.OnBoard();
    let events = [];

    // query 1 week
    let toBlock = await this.getCurrentBlockHeight();
    let fromBlock = toBlock;
    const onWeek = 60 * 60 * 24 * 7 * 4;

    do {
      const start = toBlock - onWeek;
      fromBlock = start > 0 ? start : 0;

      // query
      events = await messageBoard.queryFilter(
        filter,
        fromBlock,
        toBlock
      );

      toBlock = toBlock - onWeek;
    } while (events.length < 1 && fromBlock > 0);

    return events;
  }

  async withdraw() {
    const messageBoard = await this.getMessageBoard();
    await messageBoard.withdraw();
  }

  private async getCurrentBlockHeight() {
    const provider = walletService.getProvider();
    const blockNumber = await provider.getBlockNumber();
    return blockNumber;
  }
}

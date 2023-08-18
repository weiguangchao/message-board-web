import { ethers } from 'ethers';

export interface WalletService {
  getProvider(): ethers.BrowserProvider;

  switchNetWork(): Promise<void>;

  haveBrowserWallet(): boolean;

  isConnected(): boolean;

  getAccount(): Promise<string>;

  transfer(to: string, value: string): Promise<string>;

  getBalance(who: string): Promise<bigint>;
}
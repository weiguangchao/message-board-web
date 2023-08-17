import { ethers } from 'ethers';

export interface WalletService {
  getProvider(): ethers.BrowserProvider;

  switchNetWork(): Promise<void>;

  haveBrowserWallet(): boolean;

  isConnected(): boolean;

  getAccount(): Promise<string>;
}
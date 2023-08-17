import { ethers } from 'ethers';

import { WalletService } from '../WalletService';

export class MetaMaskServiceImpl implements WalletService {
  // MetaMask
  private ethereum;
  private chainId;

  constructor() {
    const {ethereum} = (window as any);
    if (!ethereum) {
      // throw new Error('请安装MetaMask钱包！');
      return;
    }
    this.ethereum = ethereum.providers
      ? ethereum.providers.find((x: any) => x.isMetaMask)
      : ethereum;

    this.chainId = ethers.toQuantity(Number(process.env.REACT_APP_CHAIN_ID as any));
  }

  async switchNetWork() {
    const chainId = await this.ethereum.request({
      method: 'eth_chainId',
      params: [],
    });

    if (chainId !== this.chainId) {
      try {
        await this.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{chainId: this.chainId}],
        });
      } catch (e: any) {
        if (e.code === 4902) {
          await this.addNetwork();
        }
      }
    }
  }

  private async addNetwork() {
    await this.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          "chainId": this.chainId,
          "chainName": "Arbitrum Goerli",
          "rpcUrls": [
            "https://goerli-rollup.arbitrum.io/rpc"
          ],
          // "iconUrls": [
          // ],
          "nativeCurrency": {
            // "name": "xDAI",
            "symbol": "AETH",
            "decimals": 18
          },
          "blockExplorerUrls": [
            "https://goerli.arbiscan.io"
          ]
        }
      ],
    });
  }

  getProvider() {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.BrowserProvider(
      this.ethereum,
      Number(process.env.REACT_APP_CHAIN_ID as any)
    );
    return provider;
  }

  haveBrowserWallet(): boolean {
    return !!this.ethereum;
  }

  isConnected(): boolean {
    return this.ethereum.isConnected();
  }

  async getAccount(): Promise<string> {
    try {
      const accounts = await this.ethereum.request({
        method: "eth_requestAccounts",
        params: []
      });
      return accounts[0];
    } catch (e: any) {
      if (e.code === 4001) {
        // EIP-1193 userRejectedRequest error
        // If this happens, the user rejected the connection request.
        // console.log('Please connect to MetaMask.');
        throw new Error('请安装MetaMask钱包！');
      }
    }

    return '';
  }
}